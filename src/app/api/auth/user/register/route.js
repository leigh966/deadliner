import nodemailer from "nodemailer";

export async function POST(req) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env["EMAIL_ADDRESS"],
      pass: process.env["EMAIL_PASSWORD"],
    },
  });

  var mailOptions = {
    from: process.env["EMAIL_ADDRESS"],
    to: process.env["EMAIL_TEST_RECIPIENT"],
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
    return new Response(JSON.stringify({ message: "sending" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
}
