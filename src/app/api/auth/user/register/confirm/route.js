import { runQuery } from "@/app/api/query";
import { stringify } from "uuid";

export async function POST(req) {
  userId = (await req.json()).user_id;

  // check that the user exists and is unconfirmed
  const response = await runQuery(
    "SELECT * FROM users WHERE id=$1 AND temp=$2 AND confirmed=$3",
    [userId, 0, 0]
  );
  if (response.rowCount == 0) {
    return new Response(
      JSON.stringify({
        message: "User does not exist, is temporary or is already confirmed",
      }),
      404
    );
  }

  // update the user
  await runQuery("UPDATE users SET confirmed=1 WHERE id=$1", [userId]);

  return Response(
    JSON.stringify({
      message: "Done",
    }),
    200
  );
}
