import { neon } from '@neondatabase/serverless';

type SqlClient = (
  query: string,
  params?: any[]
) => Promise<Record<string, any>[]>;

/**
 * Returns a Neon serverless SQL client (HTTP mode — Cloudflare Workers compatible).
 * Wraps the neon client so queries can be invoked as `sql(query, params)`.
 */
export function getDbClient(): SqlClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  const client = neon(connectionString);
  return (query: string, params: any[] = []) => client.query(query, params);
}

/**
 * Helper to safely query Postgres with neon client.
 */
export async function queryDb<T = any>(
  sqlQuery: string,
  params: any[] = []
): Promise<T[]> {
  const client = getDbClient();
  if (!client) {
    console.warn('[db] DATABASE_URL missing. Operating in fallback mode.');
    return [] as T[];
  }
  try {
    const result = await client(sqlQuery, params);
    return (result as T[]) || [];
  } catch (err) {
    console.error('[db] SQL Query failed:', err);
    throw err;
  }
}
