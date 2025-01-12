import pool from "../../../lib/db"; // Import the database connection

export async function POST(req) {
  try {
    const dlJson = await req.json();
    console.log(dlJson);
    const { title, description, start_date, end_date } = dlJson;

    // Log received data
    console.log("Received post data:", {
      title,
      description,
      start_date,
      end_date,
    });

    if (!title || !start_date || !end_date) {
      return new Response(
        JSON.stringify({
          message: "Title and start and end dates are required.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Connect to the database and insert the new post
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO deadlines (title, description, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, start_date, end_date]
    );
    client.release();

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error inserting post into the database." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(req) {
  try {
    const dlJson = await req.json();

    const deadlineId = dlJson.id;

    const client = await pool.connect();
    const result = await client.query("DELETE FROM deadlines WHERE id=$1", [
      deadlineId,
    ]);

    return new Response(JSON.stringify(result.rows[0]), {
      status: 204,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting post from the database:" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
