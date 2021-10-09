import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  //let testAccount = await nodemailer.createTestAccount();
  // console.log("Account: ", testAccount);

  let transporter = nodemailer.createTransport({
    host: "debugmail.io",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "noahe7157@gmail.com",
      pass: "a03b5f20-fc79-11eb-a14a-3fd27d124331",
    },
  });

  let info = await transporter.sendMail({
    from: '"Google Support" <support@google.com>',
    to: to,
    subject: "Change Password ✔",
    html,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
