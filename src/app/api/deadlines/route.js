import pool from "../../../lib/db"; // Import the database connection

function getDataRejectionResponse(message) {
  return new Response(
    JSON.stringify({
      message: message,
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function validateAgainstConstraints(title, start_date, end_date) {
  if (!title || !start_date || !end_date) {
    return getDataRejectionResponse(
      "Title and start and end dates are required."
    );
  }
  console.log("title length: " + title.length);
  if (title.length > 30) {
    return getDataRejectionResponse("Title is too long.");
  }
  return null;
}

export async function POST(req) {
  try {
    const dlJson = await req.json();
    console.log(dlJson);
    const { title, description, start_date, end_date } = dlJson;

    const constraintError = validateAgainstConstraints(
      title,
      start_date,
      end_date
    );

    if (constraintError) {
      return constraintError;
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

export async function PUT(req) {
  console.log("update ran");
  try {
    const dlJson = await req.json();
    console.log(dlJson);
    const { title, description, start_date, end_date, id } = dlJson;

    const constraintError = validateAgainstConstraints(
      req,
      title,
      start_date,
      end_date
    );
    if (constraintError) {
      return constraintError;
    }

    // Connect to the database and insert the new post
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE deadlines SET title=$1, description=$2, start_date=$3, end_date=$4 WHERE id=$5",
      [title, description, start_date, end_date, id]
    );
    client.release();

    return new Response("Done", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating the database." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
