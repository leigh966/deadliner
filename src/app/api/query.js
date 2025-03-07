import pool from "../../lib/db"; // Import the database connection
export async function runQuery(query, values) {
  const client = await pool.connect();
  const result = await client.query(query, values);
  client.release();
  return result;
}

export async function getUserId(session) {
  let result = await runQuery(
    "SELECT id FROM users WHERE cookie=$1 AND cookie!='' AND cookie IS NOT NULL",
    [session]
  );
  console.log("id fetched");
  console.log(result.rows);
  return result.rows[0].id;
}
