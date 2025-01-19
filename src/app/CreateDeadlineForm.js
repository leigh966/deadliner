import DeadlineForm from "./DeadlineForm";

export default function CreateDeadlineForm(props) {
  const setVisible = props.setVisible;

  // Handle form submission
  const onSubmit = async (e, deadlineData, setMessage, refresh, setVisible) => {
    e.preventDefault();
    const bodyData = JSON.stringify(deadlineData);
    console.log(bodyData);
    try {
      const response = await fetch("/api/deadlines", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("deadline created successfully!");
        refresh();
        setVisible(false);
      } else {
        setMessage("Error creating deadline.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <DeadlineForm
      onSubmit={onSubmit}
      setVisible={setVisible}
      header="Create Deadline"
    />
  );
}
