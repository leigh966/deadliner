import React from "react";
import pool from "../lib/db";
import styles from "./DeadlineList.module.css";
import DeadlineGantt from "./DeadlineGantt";
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
      <DeadlineGantt deadlines={deadlines} />
    </>
  );
}
