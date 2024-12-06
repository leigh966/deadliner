"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeadlineForm() {
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
    <div>
      <h1>Create a New deadline</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="deadline">deadline:</label>
          <textarea
            id="deadline"
            value={deadline}
            onChange={(e) => setdeadline(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
