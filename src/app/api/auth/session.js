import { v4 } from "uuid";

export function generateSessionId() {
  return v4();
}
