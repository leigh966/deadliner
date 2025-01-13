"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./DeadlineForm.module.css";

export default function DeadlineForm({ setVisible, header, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const refresh = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    router.refresh();
  };

  return (
    <div id={styles.deadlineForm}>
      <button id={styles.btnExit} onClick={() => setVisible(false)}>
        x
      </button>
      <h1>{header}</h1>
      <form
        onSubmit={(e) =>
          onSubmit(
            e,
            {
              title,
              description,
              start_date: startDate,
              end_date: endDate,
            },
            setMessage,
            refresh,
            setVisible
          )
        }
        id={styles.deadlineInnerForm}
      >
        <div className={styles.field}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="end_date">End Date:</label>
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
