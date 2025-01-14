import pool from "../../../lib/db"; // Import the database connection

function getStandardResponse(message, status) {
  return new Response(
    JSON.stringify({
      message: message,
    }),
    {
      status: status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function getDataRejectionResponse(message) {
  return getStandardResponse("Constraint violation: " + message, 400);
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

async function runQuery(query, values) {
  const client = await pool.connect();
  const result = await client.query(query, values);
  client.release();
  return result;
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

    const result = await runQuery(
      "INSERT INTO deadlines (title, description, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, start_date, end_date]
    );

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return getStandardResponse("Error inserting into the database.", 500);
  }
}

export async function DELETE(req) {
  try {
    const dlJson = await req.json();

    const deadlineId = dlJson.id;

    const result = await runQuery("DELETE FROM deadlines WHERE id=$1", [
      deadlineId,
    ]);

    return new Response(JSON.stringify(result.rows[0]), {
      status: 204,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return getStandardResponse("Error deleting from the database.", 500);
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

    await runQuery(
      "UPDATE deadlines SET title=$1, description=$2, start_date=$3, end_date=$4 WHERE id=$5",
      [title, description, start_date, end_date, id]
    );

    return new Response("Done", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return getStandardResponse("Error updating the database.", 500);
  }
}
