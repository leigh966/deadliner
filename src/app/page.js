import styles from "./page.module.css";
import DeadlineList from "./DeadlineList";
import ClientPart from "./ClientPart";

export default function Home() {
  return (
    <div className={styles.page}>
      <DeadlineList />
      <ClientPart />
    </div>
  );
}
