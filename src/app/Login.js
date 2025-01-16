"use client";

import Link from "next/link";
import alinkstyle from "../reusable-components/ALink.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  async function continueAsGuest(e) {
    //send request for cookie
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (response.status == 201) {
      router.reload;
    }
  }
  return (
    <form>
      <h2>Login</h2>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="submit" />
      <Link onClick={continueAsGuest} href="/" className={alinkstyle.aLink}>
        Continue as guest
      </Link>
    </form>
  );
}
