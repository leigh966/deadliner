import { v4 } from "uuid";

export function generateSessionId() {
  return v4();
}

export function generateSessionCookie(cookieStore, sessionId) {
  cookieStore.set({
    name: "session",
    value: sessionId,
    maxAge: 864000,
  });
}
