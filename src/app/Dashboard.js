import DeadlineList from "./DeadlineList";
import ClientPart from "./ClientPart";
import DashboardHeader from "./DashboardHeader";
import { runQuery } from "./api/query";

export default async function Dashboard({ cookie }) {
  const loggedIn =
    (
      await runQuery("SELECT * FROM users WHERE cookie=$1 AND name!=$1", [
        cookie,
      ])
    ).rowCount == 1;
  return (
    <>
      <DashboardHeader loggedIn={loggedIn} />
      <DeadlineList />
      <ClientPart />
    </>
  );
}
