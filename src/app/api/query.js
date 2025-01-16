import pool from "../../lib/db"; // Import the database connection
export async function runQuery(query, values) {
  const client = await pool.connect();
  const result = await client.query(query, values);
  client.release();
  return result;
}
