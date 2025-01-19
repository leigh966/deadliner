import React from "react";
import pool from "../lib/db";
import styles from "./DeadlineList.module.css";
import TimeGantt from "@/reusable-components/TimeGantt/TimeGantt";
import DeadlineActionCell from "./DeadlineActionCell";
import { getShortDate } from "@/reusable-components/Dates";

// This is a Server Component in Next.js that queries the PostgreSQL database
async function fetchData() {
  try {
    const client = await pool.connect(); // Get a client from the pool
    const result = await client.query("SELECT * FROM deadlines"); // Query the database
    client.release(); // Release the client back to the pool

    console.log("success");
    return result.rows; // Return the rows (deadlines) from the database
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    return []; // Return an empty array if there's an error
  }
}

export default async function DeadlineList() {
  const deadlines = await fetchData();

  return (
    <>
      {deadlines.length > 0 ? (
        <TimeGantt
          width="80%"
          height="40%"
          data={deadlines.map((dl) => {
            return {
              startDate: dl.start_date,
              endDate: dl.end_date,
              label: dl.title,
            };
          })}
        />
      ) : (
        "Loading Data..."
      )}
      <table>
        <thead>
          <tr>
            <th className={styles.title}>Title</th>
            <th className={styles.description}>Description</th>
            <th className={styles.date}>Start Date</th>
            <th className={styles.date}>End Date</th>
          </tr>
        </thead>
        <tbody>
          {deadlines.length > 0 ? (
            deadlines.map((dl) => (
              <tr key={dl.id}>
                <td className={styles.title}>{dl.title}</td>
                <td className={styles.description}>{dl.description}</td>
                <td className={styles.date}>
                  {getShortDate(new Date(dl.start_date))}
                </td>
                <td className={styles.date}>
                  {getShortDate(new Date(dl.end_date))}
                </td>
                <DeadlineActionCell record={dl} className={styles.actionCell} />
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={styles.errorCell}>
                No deadlines available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
