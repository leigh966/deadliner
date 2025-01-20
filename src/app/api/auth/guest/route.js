"use server";

import { cookies } from "next/headers";
import { generateSessionCookie, generateSessionId } from "../session";
import { runQuery } from "../../query";

export async function POST(req) {
  const sessionId = generateSessionId();

  // create the user
  try {
    await runQuery(
      "INSERT INTO users (id, name, temp, cookie) VALUES ($1, $2, $3, $4) RETURNING *",
      [sessionId, sessionId, 1, sessionId]
    );

    generateSessionCookie(await cookies(), sessionId);

    return new Response(JSON.stringify({}), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log("\n\n\n" + e.message + "\n\n\n");
    return new Response(JSON.stringify({ message: "Error creating user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
