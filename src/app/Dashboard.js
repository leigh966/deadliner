import DeadlineList from "./DeadlineList";
import ClientPart from "./ClientPart";
import DashboardHeader from "./DashboardHeader";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DeadlineList />
      <ClientPart />
    </>
  );
}
