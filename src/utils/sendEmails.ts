import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  //let testAccount = await nodemailer.createTestAccount();
  // console.log("Account: ", testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "nj43qg22e7i7fass@ethereal.email",
      pass: "ywp9FdDK6puDRWD2Rx",
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
