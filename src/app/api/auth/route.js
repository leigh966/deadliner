"use server";

import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies();

  cookieStore.set("loggedIn", true);
  return new Response(JSON.stringify({}), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
