import pool from "../../../lib/db"; // Import the database connection

export async function POST(req) {
  try {
    const dlJson = await req.json();
    console.log(dlJson);
    const { title, deadline } = dlJson;

    // Log received data
    console.log("Received post data:", { title, deadline });

    if (!title || !deadline) {
      return new Response(
        JSON.stringify({ message: "Title and deadline are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Connect to the database and insert the new post
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO deadlines (title, deadline) VALUES ($1, $2) RETURNING *",
      [title, deadline]
    );
    client.release();

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error inserting post into the database:", error);
    return new Response(
      JSON.stringify({ message: "Error inserting post into the database." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
