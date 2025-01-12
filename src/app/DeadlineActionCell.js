"use client";

import { useRouter } from "next/navigation";

export default function DeadlineActionCell(props) {
  const router = useRouter();
  console.log(props.deadlineId);
  async function handleDelete() {
    const data = { id: props.deadlineId };
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

  return (
    <td>
      <button onClick={() => handleDelete()}>Delete</button>
    </td>
  );
}
