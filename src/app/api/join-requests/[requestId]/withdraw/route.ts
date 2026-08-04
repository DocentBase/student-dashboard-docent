import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

type Params = { params: Promise<{ requestId: string }> };

/**
 * POST /api/join-requests/[requestId]/withdraw
 * Student withdraws their own pending join request.
 */
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

    const { requestId } = await params;

    const sql = getDbClient();
    if (!sql) return NextResponse.json({ error: "Service unavailable." }, { status: 503 });

    // Verify the request belongs to this student and is pending
    const [request] = await sql(
      "SELECT id, status, clerk_user_id FROM batch_join_requests WHERE id = $1",
      [requestId]
    );

    if (!request) return NextResponse.json({ error: "Request not found." }, { status: 404 });
    if (request.clerk_user_id !== userId) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    if (request.status !== "pending") {
      return NextResponse.json({ error: `Cannot withdraw a request that is already ${request.status}.` }, { status: 409 });
    }

    await sql(
      "UPDATE batch_join_requests SET status = 'withdrawn', updated_at = NOW() WHERE id = $1",
      [requestId]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[POST /api/join-requests/withdraw]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
