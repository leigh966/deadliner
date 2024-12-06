import Image from "next/image";
import styles from "./page.module.css";
import DeadlineList from "./DeadlineList";
import DeadlineForm from "./DeadlineForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <DeadlineList />
      <DeadlineForm />
    </div>
  );
}
