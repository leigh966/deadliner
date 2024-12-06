"use client";

import DeadlineForm from "./DeadlineForm";
import { useState } from "react";
import styles from "./ClientPart.module.css";

export default function ClientPart() {
  const [show, setShow] = useState(false);
  return (
    <div id={styles.clientPart}>
      {show ? <DeadlineForm setVisible={setShow} /> : null}
      <button
        onClick={() => {
          setShow(true);
        }}
        id={styles.addButton}
      >
        Add
      </button>
    </div>
  );
}
