"use client";

import Link from "next/link";
import alinkstyle from "../reusable-components/ALink.module.css";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { useState } from "react";

export default function Login() {
  const [register, setRegister] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState(null);

  const router = useRouter();
  async function continueAsGuest(e) {
    e.preventDefault();
    //send request for cookie
    const response = await fetch("/api/auth/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (response.status == 201) {
      router.refresh();
    }
  }

  async function postAuth(url, formData) {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("email"),
        password: formData.get("password"),
      }),
    });
  }

  async function handleRegister(e) {
    const formData = new FormData(e.target);
    if (formData.get("password") != formData.get("confirmPassword")) {
      alert("Passwords must match");
      return;
    }
    const response = await postAuth("/api/auth/user/register", formData);
    if (response.status == 200) {
      // show message to check email
      setEmailSentMessage(
        "Confirmation email sent to " + formData.get("email")
      );
    } else if (response.status == 409) {
      alert("A user with this email address already exists");
    } else {
      alert("Error");
    }
  }

  async function handleLogin(e) {
    const formData = new FormData(e.target);
    const response = await postAuth("/api/auth/user", formData);
    if (response.status == 200) {
      // logged in
      router.refresh();
    } else {
      alert("Error");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (register) {
      handleRegister(e);
    } else {
      handleLogin(e);
    }
  }
  if (emailSentMessage) {
    return (
      <div>
        <h2>{emailSentMessage}</h2>
        <p>
          Click the link sent to your email address to finish registering your
          account. If you can't find it, make sure to check your spam/junk
          folder.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button
          onClick={() => setRegister(false)}
          className={
            (!register ? styles.activeTab : styles.inactiveTab) +
            " " +
            styles.tab
          }
        >
          Login
        </button>
        <button
          onClick={() => setRegister(true)}
          className={
            (!register ? styles.inactiveTab : styles.activeTab) +
            " " +
            styles.tab
          }
        >
          Register
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{(register && "Register") || "Login"}</h2>
        <input
          type="text"
          placeholder="Username"
          required={true}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          required={true}
          name="password"
        />
        {register && (
          <input
            type="password"
            placeholder="Confirm Password"
            required={true}
            name="confirmPassword"
          />
        )}
        <input type="submit" />
        <Link onClick={continueAsGuest} href="/" className={alinkstyle.aLink}>
          Continue as guest
        </Link>
      </form>
    </div>
  );
}
