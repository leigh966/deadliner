import { useRouter } from "next/navigation";
import DeadlineForm from "./DeadlineForm";

export default function EditDeadlineForm({ setVisible, record }) {
  const router = useRouter();
  // Handle form submission
  const onSubmit = async (e, deadlineData, setMessage, refresh, setVisible) => {
    e.preventDefault();
    const bodyData = JSON.stringify(deadlineData);

    console.log(bodyData);
    try {
      const response = await fetch("/api/deadlines", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });

      if (response.ok) {
        setMessage("Deadline updated successfully!");
        refresh();
        setVisible(false);
      } else {
        setMessage(`Error updating deadline (${response.status})`);
        console.error(await response.text());
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <DeadlineForm
      onSubmit={onSubmit}
      setVisible={setVisible}
      header="Edit Deadline"
      record={record}
      onDelete={async () => {
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
            setVisible(false);
            console.log("refreshing");
          } else {
            prompt("Error deleting deadline.");
          }
        } catch (error) {
          prompt("Error deleting deadline.");
        }
      }}
    />
  );
}
