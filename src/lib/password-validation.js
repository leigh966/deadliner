function containsCharInRange(string, min, max) {
  for (let i = 0; i < string.length; i++) {
    const unicode = string.charCodeAt(i);
    if (unicode >= min && unicode <= max) {
      return true;
    }
  }
  return false;
}

// Ensure password meets the minimum complexity
export function validatePassword(password) {
  const badResponse = (message) => {
    return { valid: false, message: message };
  };
  if (password.length < 8) {
    return badResponse("Must be more than 8 character long");
  }
  const a = 97;
  const z = 122;
  if (!containsCharInRange(password, a, z)) {
    return badResponse("Must contain at least 1 lowercase letter");
  }

  const A = 65;
  const Z = 90;
  if (!containsCharInRange(password, A, Z)) {
    return badResponse("Must contain at least 1 uppercase letter");
  }

  const one = 49;
  const nine = 57;
  if (!containsCharInRange(password, one, nine)) {
    return badResponse("Must contain at least 1 number");
  }

  return { valid: true, message: "All good" };
}
