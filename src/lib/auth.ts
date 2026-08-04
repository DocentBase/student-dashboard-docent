import { auth } from '@clerk/nextjs/server';
import { getDbClient } from './db';

export async function getCurrentStudent() {
  // The student portal relies ONLY on the Clerk user ID from the JWT.
  // All other data comes from our database — never from org/role claims,
  // because a single user may be an admin in one org and a student in another.
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Fetch student from database based on Clerk userId
  const sql = getDbClient();
  if (!sql) return null;

  try {
    const rows = await sql(
      `SELECT * FROM students
       WHERE clerk_user_id = $1
       ORDER BY enrolled_at DESC
       LIMIT 1`,
      [userId]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (err) {
    console.error('[auth] getCurrentStudent error:', err);
    return null;
  }
}
