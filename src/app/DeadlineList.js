import React from "react";
import pool from "../lib/db";

// This is a Server Component in Next.js that queries the PostgreSQL database
async function fetchData() {
  try {
    const client = await pool.connect(); // Get a client from the pool
    const result = await client.query("SELECT * FROM deadlines"); // Query the database
    client.release(); // Release the client back to the pool

    return result.rows; // Return the rows (deadlines) from the database
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    return []; // Return an empty array if there's an error
  }
}

export default async function DeadlineList() {
  const deadlines = await fetchData();

  return (
    <ul>
      {deadlines.length > 0 ? (
        deadlines.map((dl) => (
          <li key={dl.id}>
            <h3>{dl.title}</h3>
            <p>{dl.deadline.toString()}</p>
          </li>
        ))
      ) : (
        <p>No deadlines available.</p>
      )}
    </ul>
  );
}
