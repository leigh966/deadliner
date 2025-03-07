"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "./LoginForm";
export default function DashboardHeader({ loggedIn }) {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
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
      {showLogin && <LoginForm startRegister={true} />}
    </div>
  );
}
