import { auth } from '@clerk/nextjs/server';
import { query } from './db';

export async function getCurrentStudent() {
  const { userId, orgId } = await auth();
  
  if (!userId || !orgId) {
    return null;
  }

  // Fetch student from database based on Clerk userId
  const res = await query('SELECT * FROM students WHERE clerk_user_id = $1 AND organization_id = $2', [userId, orgId]);
  
  if (res.rows.length === 0) {
    return null;
  }
  
  return res.rows[0];
}
