"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./DeadlineForm.module.css";

function formatDate(date) {
  const out = new Date(date).toISOString().split("T")[0];
  console.log(out);
  return out;
}

export default function DeadlineForm({
  setVisible,
  header,
  onSubmit,
  record,
  onDelete = null,
}) {
  const [title, setTitle] = useState(record ? record.title : "");
  const [description, setDescription] = useState(
    record ? record.description : ""
  );
  const [startDate, setStartDate] = useState(
    record ? formatDate(record.start_date) : ""
  );
  const [endDate, setEndDate] = useState(
    record ? formatDate(record.end_date) : ""
  );
  const [message, setMessage] = useState("");
  const router = useRouter();

  const refresh = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    router.refresh();
  };

  let deadlineData = {
    title,
    description,
    start_date: startDate,
    end_date: endDate,
  };
  if (record) {
    deadlineData.id = record.id;
  }

  return (
    <div id={styles.deadlineForm}>
      <button id={styles.btnExit} onClick={() => setVisible(false)}>
        x
      </button>
      <h1>{header}</h1>
      {onDelete && <button onClick={onDelete}>🗑️</button>}
      <form
        onSubmit={(e) =>
          onSubmit(e, deadlineData, setMessage, refresh, setVisible)
        }
        id={styles.deadlineInnerForm}
      >
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="30"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" id={styles.submitButton}>
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
