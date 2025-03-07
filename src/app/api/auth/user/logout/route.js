import { runQuery } from "@/app/api/query";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  await runQuery("UPDATE users SET cookie='' WHERE cookie=$1", [
    cookieStore.get("session").value,
  ]);
  return new Response(JSON.stringify({ message: "Success!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
