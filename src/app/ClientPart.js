"use client";

import CreateDeadlineForm from "./CreateDeadlineForm";
import { useState } from "react";
import styles from "./ClientPart.module.css";

export default function ClientPart() {
  const [show, setShow] = useState(false);
  return (
    <div id={styles.clientPart}>
      {show ? <CreateDeadlineForm setVisible={setShow} /> : null}
      <button
        onClick={() => {
          setShow(true);
        }}
        id={styles.addButton}
      >
        +
      </button>
    </div>
  );
}
