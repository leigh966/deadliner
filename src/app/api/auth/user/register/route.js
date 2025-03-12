import nodemailer from "nodemailer";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { runQuery } from "@/app/api/query";
import { validateEmail } from "@/lib/email-validation";
import { validatePassword } from "@/lib/password-validation";

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

async function userAlreadyExists(username) {
  const response = await runQuery("SELECT * FROM users WHERE name=$1", [
    username,
  ]);
  return response.rowCount > 0;
}

export async function POST(req) {
  const userJson = await req.json();

  if (!validateEmail(userJson.username)) {
    return new Response(JSON.stringify({ message: "Bad Email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const passwordValidation = validatePassword(userJson.password);
  if (!passwordValidation.valid) {
    return new Response(
      JSON.stringify({ message: passwordValidation.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (await userAlreadyExists(userJson.username)) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = await createUser(
    userJson.username,
    await hashPassword(userJson.password)
  );

  sendEmail(userId, userJson.username);

  return new Response(JSON.stringify({ message: "sending" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
