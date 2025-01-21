// pages/privacy-policy.js
import styles from "./privacypolicy.module.css"; // Corrected import path

const PrivacyPolicy = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Privacy Policy</h1>

        {/* Static "Last Updated" Date */}
        <p className={styles.date}>Last Updated: January 21, 2025</p>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>1. Introduction</h2>
          <p className={styles.text}>
            This Privacy Policy outlines how I collect, use, and protect your
            personal data when you use my website, Deadliner. I am committed to
            protecting your privacy and ensuring that your personal data is
            handled in a safe and responsible manner in compliance with the UK
            General Data Protection Regulation (GDPR).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>2. Data Controller</h2>
          <p className={styles.text}>
            I am the data controller responsible for the collection and use of
            your personal data:
            <br />
            <strong className={styles.bold}>Leigh Hurley</strong>
            <br />
            Email:{" "}
            <span className={styles.link}>support@itsthenikolai.com</span>
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>3. Information I Collect</h2>
          <p className={styles.text}>
            I collect the following personal data when you use my website:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Email address (for account registration and communication
              purposes)
            </li>
            <li className={styles.listItem}>
              Password (encrypted and stored for account access)
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>
            4. Purpose of Processing Your Data
          </h2>
          <p className={styles.text}>
            I use your personal data for the following purposes:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              To provide and manage your user account.
            </li>
            <li className={styles.listItem}>
              To communicate with you regarding account-related matters (e.g.,
              account verification, password reset, etc.).
            </li>
            <li className={styles.listItem}>
              To ensure the security of my website and prevent unauthorized
              access.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>5. Legal Basis for Processing</h2>
          <p className={styles.text}>
            The legal bases for processing your personal data are as follows:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong className={styles.bold}>Contractual Necessity</strong>:
              Processing your personal data is necessary to fulfill the contract
              between us (i.e., providing your account).
            </li>
            <li className={styles.listItem}>
              <strong className={styles.bold}>Legitimate Interest</strong>: I
              have a legitimate interest in ensuring the security of my website
              and preventing bot activity during account registration.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>6. Data Retention</h2>
          <p className={styles.text}>
            I retain your personal data for as long as you maintain an active
            account with me. If you choose to delete your account, I will retain
            your data only as long as necessary to fulfill legal obligations
            (e.g., fraud prevention, legal disputes).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>7. Your Rights Under the GDPR</h2>
          <p className={styles.text}>
            Under the GDPR, you have the following rights regarding your
            personal data:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong className={styles.bold}>Right to Access</strong>: You have
              the right to request access to the personal data I hold about you.
            </li>
            <li className={styles.listItem}>
              <strong className={styles.bold}>Right to Rectification</strong>:
              You can request corrections to inaccurate data.
            </li>
            <li className={styles.listItem}>
              <strong className={styles.bold}>Right to Erasure</strong>: You
              have the right to request the deletion of your personal data.
            </li>
            <li className={styles.listItem}>
              <strong className={styles.bold}>
                Right to Restrict Processing
              </strong>
              : You can request restrictions on how your data is processed.
            </li>
            <li className={styles.listItem}>
              <strong className={styles.bold}>Right to Object</strong>: You can
              object to the processing of your data under certain circumstances.
            </li>
            <li className={styles.listItem}>
              <strong className={styles.bold}>Right to Data Portability</strong>
              : You have the right to request a copy of your personal data in a
              machine-readable format.
            </li>
          </ul>
          <p className={styles.text}>
            To exercise these rights, please contact me at{" "}
            <span className={styles.link}>support@itsthenikolai.com</span>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>8. Data Sharing</h2>
          <p className={styles.text}>
            I do not share your personal data with third parties.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>9. Data Security</h2>
          <p className={styles.text}>
            I take the security of your personal data seriously and implement
            industry-standard security measures such as encryption and secure
            server infrastructure to protect your data from unauthorized access,
            alteration, and destruction.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>
            10. International Data Transfers
          </h2>
          <p className={styles.text}>
            I do not transfer your personal data outside of the United Kingdom
            or European Economic Area (EEA).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>
            11. Changes to This Privacy Policy
          </h2>
          <p className={styles.text}>
            I may update this Privacy Policy from time to time. Any changes will
            be posted on this page, with the "Last Updated" date revised
            accordingly. I recommend reviewing this policy periodically to stay
            informed about how I am protecting your personal data.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>12. Contact Information</h2>
          <p className={styles.text}>
            If you have any questions or concerns about this Privacy Policy or
            my data practices, please contact me at:
            <br />
            <strong className={styles.bold}>Email:</strong>{" "}
            <span className={styles.link}>support@itsthenikolai.com</span>
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
