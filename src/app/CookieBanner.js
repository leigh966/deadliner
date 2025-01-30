"use client";
import styles from "./CookieBanner.module.css";
import aLinkStyle from "../reusable-components/ALink.module.css";
import { useState } from "react";

export function CookieBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) {
    return "";
  }

  return (
    <div id={styles.banner}>
      <h4>
        This site uses essential cookies to make sure everything works smoothly.
        By continuing to browse, you&apos;re agreeing to their use. For more
        details, check out my{" "}
        <a className={aLinkStyle.aLink} href="/cookie-policy" target="_blank">
          Cookie Policy
        </a>
      </h4>

      <button onClick={() => setClosed(true)}>x</button>
    </div>
  );
}
