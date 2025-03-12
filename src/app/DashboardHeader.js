"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "./LoginForm";
import styles from "./DashboardHeader.module.css";

export default function DashboardHeader({ loggedIn }) {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <div className={styles.header}>
        {loggedIn && (
          <button
            onClick={() => {
              fetch("/api/auth/user/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then(() => {
                router.refresh();
              });
            }}
          >
            Log Out
          </button>
        )}
        {!loggedIn && (
          <button onClick={() => setShowLogin(!showLogin)}>Register</button>
        )}
      </div>
      {showLogin && (
        <LoginForm
          startRegister={true}
          extraStyles={styles}
          showContinueAsGuest={false}
        />
      )}
    </>
  );
}
