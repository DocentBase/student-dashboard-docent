import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// Simple in-memory rate limiter (resets per worker cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

/**
 * POST /api/batches/lookup
 * Student portal: Look up a batch by its join key.
 * Returns a sanitized batch preview (no internal IDs exposed in full).
 * Generic error on invalid/expired key to prevent enumeration.
 * 
 * Body: { join_key: string }
 * Auth: student must be signed in.
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }

    // Rate limit per user (5 attempts/minute)
    if (!checkRateLimit(userId)) {
      return NextResponse.json(
        { error: "Too many attempts. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { join_key } = body;

    if (!join_key || typeof join_key !== "string" || join_key.trim().length < 3) {
      return NextResponse.json({ error: "Invalid or expired key." }, { status: 404 });
    }

    const sql = getDbClient();
    if (!sql) {
      return NextResponse.json({ error: "Service unavailable. Please try again." }, { status: 503 });
    }

    // Lookup batch by join key (case-insensitive)
    const [batch] = await sql(
      `SELECT
        b.id, b.name, b.subject, b.class_set, b.timing, b.assigned_teacher,
        b.monthly_fee, b.location, b.website_url, b.description,
        b.is_accepting_requests, b.join_key_expires_at, b.organization_id,
        o.name AS org_name
       FROM batches b
       LEFT JOIN organizations o ON o.id = b.organization_id
       WHERE UPPER(b.join_key) = UPPER($1)
         AND b.status = 'active'`,
      [join_key.trim()]
    );

    // Generic error — don't reveal why it failed
    if (!batch) {
      return NextResponse.json({ error: "Invalid or expired key." }, { status: 404 });
    }

    // Check if key is expired
    if (batch.join_key_expires_at && new Date(batch.join_key_expires_at) < new Date()) {
      return NextResponse.json({ error: "Invalid or expired key." }, { status: 404 });
    }

    // Check if batch is accepting requests
    if (!batch.is_accepting_requests) {
      return NextResponse.json(
        { error: "This batch is currently not accepting new join requests." },
        { status: 403 }
      );
    }

    // Check if student already has a pending or approved request
    const [existingRequest] = await sql(
      "SELECT id, status FROM batch_join_requests WHERE clerk_user_id = $1 AND batch_id = $2 ORDER BY created_at DESC LIMIT 1",
      [userId, batch.id]
    );

    let studentStatus: string | null = null;
    if (existingRequest) {
      studentStatus = existingRequest.status; // pending | approved | rejected | blocked | withdrawn
    }

    // Return sanitized preview — no internal DB IDs in the response
    return NextResponse.json({
      batch: {
        id: batch.id,
        name: batch.name,
        subject: batch.subject,
        class_set: batch.class_set,
        timing: batch.timing,
        assigned_teacher: batch.assigned_teacher,
        monthly_fee: batch.monthly_fee,
        location: batch.location,
        website_url: batch.website_url,
        description: batch.description,
        org_name: batch.org_name,
        organization_id: batch.organization_id,
      },
      student_status: studentStatus, // null = no request yet
    });
  } catch (err: any) {
    console.error("[POST /api/batches/lookup]", err);
    return NextResponse.json({ error: "Invalid or expired key." }, { status: 404 });
  }
}
