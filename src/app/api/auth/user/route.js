import { cookies } from "next/headers";
import { generateSessionCookie, generateSessionId } from "../session";
import { runQuery } from "../../query";
import { stringify } from "uuid";
import bcrypt from "bcrypt";

export async function POST(req) {
  const reqJson = await req.json();
  const sessionId = generateSessionId();

  // validate credentails
  const result = await runQuery(
    "SELECT password_hash FROM users WHERE name=$1",
    [reqJson.username]
  );

  const passwordHash = result.rows[0].password_hash;

  if (!(await bcrypt.compare(reqJson.password, passwordHash))) {
    return new Response(JSON.stringify({ message: "Bad Credentials!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // complete login
  await runQuery("UPDATE users SET cookie=$1 WHERE name=$2", [
    sessionId,
    reqJson.username,
  ]);
  generateSessionCookie(await cookies(), sessionId);

  return new Response(JSON.stringify({ message: "Success!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
