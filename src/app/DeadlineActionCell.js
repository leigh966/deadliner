"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import EditDeadlineForm from "./EditDeadlineForm";

export default function DeadlineActionCell({ record, className }) {
  const router = useRouter();

  async function handleDelete() {
    const data = { id: record.id };
    const bodyData = JSON.stringify(data);
    console.log(bodyData);
    try {
      const response = await fetch("/api/deadlines", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });
      console.log(response.status);
      if (response.status == 204) {
        router.refresh();
        console.log("refreshing");
      } else {
        prompt("Error deleting deadline.");
      }
    } catch (error) {
      prompt("Error deleting deadline.");
    }
  }

  const [showForm, setShowForm] = useState(false);

  return (
    <td className={className}>
      <button onClick={() => setShowForm(true)}>Edit</button>
      <button onClick={() => handleDelete()}>Delete</button>
      {showForm ? (
        <EditDeadlineForm setVisible={setShowForm} record={record} />
      ) : null}
    </td>
  );
}
