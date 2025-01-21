import React from "react";
import pool from "../lib/db";
import styles from "./DeadlineList.module.css";
import TimeGantt from "@/reusable-components/TimeGantt/TimeGantt";
import DeadlineActionCell from "./DeadlineActionCell";
import { getShortDate } from "@/reusable-components/Dates";
import { runQuery, getUserId } from "./api/query";
import { cookies } from "next/headers";

// This is a Server Component in Next.js that queries the PostgreSQL database
async function fetchData(session_id) {
  const user_id = await getUserId(session_id);
  const data = await runQuery("SELECT * FROM deadlines WHERE user_id=$1", [
    user_id,
  ]);
  return data.rows;
}

export default async function DeadlineList() {
  const deadlines = await fetchData((await cookies()).get("session").value);

  return (
    <>
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
        noDataMessage="No Deadlines Yet"
      />
      <table>
        <thead>
          <tr id={styles.deadlinesTableHead}>
            <th className={styles.title}>Title</th>
            <th className={styles.description}>Description</th>
            <th className={styles.date}>Start Date</th>
            <th className={styles.date}>End Date</th>
          </tr>
        </thead>
        <tbody>
          {deadlines.map((dl) => (
            <tr key={dl.id} className={styles.deadlinesTableBodyRow}>
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
          ))}
        </tbody>
      </table>
    </>
  );
}
