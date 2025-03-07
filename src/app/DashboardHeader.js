"use client";
import { useRouter } from "next/navigation";
export default function DashboardHeader({ loggedIn }) {
  const router = useRouter();
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
    </div>
  );
}
