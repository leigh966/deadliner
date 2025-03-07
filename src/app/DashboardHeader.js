"use client";
import { useRouter } from "next/navigation";
export default function DashboardHeader() {
  const router = useRouter();
  return (
    <div>
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
    </div>
  );
}
