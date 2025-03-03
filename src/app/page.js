import styles from "./page.module.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { cookies } from "next/headers";
import { runQuery } from "./api/query";

export default async function Home(props) {
  const cookieStore = await cookies();
  // return cookieStore.getAll().map((cookie) => (
  //   <div key={cookie.name}>
  //     <p>Name: {cookie.name}</p>
  //     <p>Value: {cookie.value}</p>
  //   </div>
  // ));

  let pageToReturn = <Login />;
  if (
    cookieStore.get("session") &&
    (
      await runQuery("SELECT * FROM users WHERE cookie=$1", [
        cookieStore.get("session").value,
      ])
    ).rowCount == 1
  ) {
    pageToReturn = <Dashboard />;
  } else {
  }

  return <div className={styles.page}>{pageToReturn}</div>;
}
