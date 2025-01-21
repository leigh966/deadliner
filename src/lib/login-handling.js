const { validateEmail } = require("./email-validation");

export function handleEmailChange(e, resgistering, setEmailWarning) {
  if (!resgistering) {
    return;
  }
  if (!validateEmail(e.target.value)) {
    setEmailWarning("Not a valid email address");
  } else {
    setEmailWarning(null);
  }
}
