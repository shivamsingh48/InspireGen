import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "shivamsinghr098@gmail.com",
      pass: "nuuqskcogafynnqz",
    },
  });

  export const sendMail = async (to, subject, text,html) => {
    const info = await transporter.sendMail({
      from: '"Inspire-Gen" <shivamsinghr098@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);
}

