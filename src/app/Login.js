"use client";

import Link from "next/link";
import alinkstyle from "../reusable-components/ALink.module.css";

function continueAsGuest() {
  //send request for cookie
}

export default function Login() {
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
