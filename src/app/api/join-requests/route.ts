import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * POST /api/join-requests
 * Student submits a join request for a batch.
 * 
 * Body: {
 *   batch_id: string,
 *   institution: string,
 *   class: string,
 *   section?: string,
 *   shift?: string,
 *   message?: string  (≤250 chars)
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

    const body = await req.json();
    const { batch_id, institution, class: studentClass, section, shift, message } = body;

    if (!batch_id) return NextResponse.json({ error: "batch_id is required." }, { status: 400 });
    if (!institution?.trim()) return NextResponse.json({ error: "Institution is required." }, { status: 400 });
    if (!studentClass?.trim()) return NextResponse.json({ error: "Class is required." }, { status: 400 });

    // Truncate message
    const safeMessage = message ? String(message).slice(0, 250) : null;

    const sql = getDbClient();
    if (!sql) return NextResponse.json({ error: "Service unavailable." }, { status: 503 });

    // Get batch info
    const [batch] = await sql(
      "SELECT id, organization_id, is_accepting_requests, status, join_key_expires_at FROM batches WHERE id = $1",
      [batch_id]
    );
    if (!batch) return NextResponse.json({ error: "Batch not found." }, { status: 404 });
    if (batch.status !== "active") return NextResponse.json({ error: "This batch is no longer active." }, { status: 403 });
    if (!batch.is_accepting_requests) return NextResponse.json({ error: "This batch is not accepting requests." }, { status: 403 });

    // Check if student is blocked
    const [block] = await sql(
      "SELECT id FROM batch_join_blocks WHERE batch_id = $1 AND clerk_user_id = $2",
      [batch_id, userId]
    );
    if (block) return NextResponse.json({ error: "You are not permitted to join this batch." }, { status: 403 });

    // Check for existing active request
    const [existingRequest] = await sql(
      "SELECT id, status FROM batch_join_requests WHERE clerk_user_id = $1 AND batch_id = $2 ORDER BY created_at DESC LIMIT 1",
      [userId, batch_id]
    );
    if (existingRequest) {
      if (existingRequest.status === "pending") {
        return NextResponse.json({ error: "You already have a pending request for this batch." }, { status: 409 });
      }
      if (existingRequest.status === "approved") {
        return NextResponse.json({ error: "You are already enrolled in this batch." }, { status: 409 });
      }
    }

    // Get student info from Clerk
    const clerkUser = await currentUser();
    const studentName = `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim();
    const studentEmail = clerkUser?.primaryEmailAddress?.emailAddress;
    const studentPhoto = clerkUser?.imageUrl;

    // Insert join request
    const [request] = await sql(
      `INSERT INTO batch_join_requests (
        clerk_user_id, organization_id, batch_id,
        student_name, student_photo_url, student_email,
        institution, class, section, shift, message,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending')
      RETURNING id, status, created_at`,
      [
        userId, batch.organization_id, batch_id,
        studentName || null, studentPhoto || null, studentEmail || null,
        institution.trim(), studentClass.trim(), section?.trim() || null,
        shift?.trim() || null, safeMessage,
      ]
    );

    return NextResponse.json({ request, message: "Join request submitted successfully." }, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/join-requests]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

/**
 * GET /api/join-requests
 * Get the signed-in student's own join requests across all batches.
 */
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

    const sql = getDbClient();
    if (!sql) return NextResponse.json({ requests: [] });

    const requests = await sql(
      `SELECT
        bjr.*,
        b.name AS batch_name,
        b.subject AS batch_subject,
        b.class_set AS batch_class_set,
        b.timing AS batch_timing,
        b.assigned_teacher AS batch_teacher,
        b.monthly_fee AS batch_fee,
        o.name AS org_name
       FROM batch_join_requests bjr
       JOIN batches b ON b.id = bjr.batch_id
       LEFT JOIN organizations o ON o.id = bjr.organization_id
       WHERE bjr.clerk_user_id = $1
       ORDER BY bjr.created_at DESC`,
      [userId]
    );

    return NextResponse.json({ requests });
  } catch (err: any) {
    console.error("[GET /api/join-requests]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
