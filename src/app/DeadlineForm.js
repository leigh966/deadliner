"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./DeadlineForm.module.css";

export default function DeadlineForm({ setVisible }) {
  const [title, setTitle] = useState("");
  const [deadline, setdeadline] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to be sent to the backend API
    const deadlineData = { title, deadline };
    console.log(deadlineData);
    const bodyData = JSON.stringify(deadlineData);
    console.log(bodyData);
    try {
      const response = await fetch("/api/deadlines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("deadline created successfully!");
        setTitle("");
        setdeadline("");
        router.refresh();
      } else {
        setMessage("Error creating deadline.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div id={styles.deadlineForm}>
      <button onClick={() => setVisible(false)}>x</button>
      <h1>Create a New Deadline</h1>
      <form onSubmit={handleSubmit} id={styles.deadlineInnerForm}>
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
          <label htmlFor="deadline">deadline:</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setdeadline(e.target.value)}
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
