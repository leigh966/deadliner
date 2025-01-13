import DeadlineForm from "./DeadlineForm";

export default function EditDeadlineForm({ setVisible, record }) {
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
    />
  );
}
