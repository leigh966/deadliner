import styles from "./page.module.css";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default function Home() {
  let pageToReturn = <Dashboard />;
  //let pageToReturn = <Login />;

  return <div className={styles.page}>{pageToReturn}</div>;
}
