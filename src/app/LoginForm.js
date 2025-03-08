"use client";
import { handleEmailChange } from "@/lib/login-handling";
import Link from "next/link";
import alinkstyle from "../reusable-components/ALink.module.css";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { useState } from "react";

export default function LoginForm({
  startRegister = false,
  extraStyles = { dashboarLogin: "" },
}) {
  const [register, setRegister] = useState(startRegister);
  const [emailSentMessage, setEmailSentMessage] = useState(null);
  const [emailWarning, setEmailWarning] = useState("Please enter a value");
  const [submitErrorMessage, setSubmitErrorMessage] = useState(null);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

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
    } else if (response.status == 401) {
      setSubmitErrorMessage("Incorrect Email/Password");
    } else {
      setSubmitErrorMessage("Error");
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
          account. If you can&apos;t find it, make sure to check your spam/junk
          folder.
        </p>
      </div>
    );
  }

  return (
    <div id={styles.loginPage} className={extraStyles.dashboardLogin}>
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
          onChange={(e) => {
            console.log(emailWarning);
            handleEmailChange(e, register, setEmailWarning);
          }}
          type="text"
          placeholder="Email"
          required={true}
          name="email"
        />
        {emailWarning && register ? (
          <span className={styles.warningMessage}>{emailWarning}</span>
        ) : null}
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
        {submitErrorMessage ? (
          <span className={styles.warningMessage}>{submitErrorMessage}</span>
        ) : null}
        {register && (
          <div id={styles.privacyPolicyWrapper}>
            <label>
              I have read and agree to the{" "}
              <Link
                className={alinkstyle.aLink + " " + styles.noPadOrMargin}
                target="_blank"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </label>
            <input
              type="checkbox"
              onChange={(e) => setPrivacyPolicy(e.target.checked)}
              checked={privacyPolicy}
            />
          </div>
        )}
        <input
          type="submit"
          disabled={(emailWarning || !privacyPolicy) && register}
        />
        <Link onClick={continueAsGuest} href="/" className={alinkstyle.aLink}>
          Continue as guest
        </Link>
      </form>
    </div>
  );
}
