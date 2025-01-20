import { runQuery } from "@/app/api/query";
import Link from "next/link";

export async function confirmUser(userId) {
  // check that the user exists and is unconfirmed
  const response = await runQuery(
    "SELECT * FROM users WHERE id=$1 AND temp=$2 AND confirmed=$3",
    [userId, 0, false]
  );
  if (response.rowCount == 0) {
    return false;
  }
  console.log(response.rows);

  // update the user
  await runQuery("UPDATE users SET confirmed=$1 WHERE id=$2", [1, userId]);
  return true;
}

export default async function Page({ params }) {
  const userId = (await params).slug;

  return (
    <div>
      <h2>
        {((await confirmUser(userId)) && "User Confirmed") || "404: Not Found"}
      </h2>
      <Link href="/">Return to login page</Link>
    </div>
  );
}
