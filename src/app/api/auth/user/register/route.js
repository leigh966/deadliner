import nodemailer from "nodemailer";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { runQuery } from "@/app/api/query";

async function createUser(name, passwordHash) {
  const id = v4();
  await runQuery(
    "INSERT INTO users (id, name, password_hash, temp, confirmed) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [id, name, passwordHash, 0, 0]
  );
  return id;
}

function sendEmail(userId, emailAddress) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env["EMAIL_ADDRESS"],
      pass: process.env["EMAIL_PASSWORD"],
    },
  });

  var mailOptions = {
    from: process.env["EMAIL_ADDRESS"],
    to: emailAddress,
    subject: "Deadliner Email Confirmation",
    html: `Click <a href=${process.env.URL}/confirm/${userId}>here</a> to confirm your email address`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function POST(req) {
  const userJson = await req.json();

  const userId = await createUser(
    userJson.username,
    hashPassword(userJson.password)
  );

  sendEmail(userId, userJson.username);

  return new Response(JSON.stringify({ message: "sending" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
