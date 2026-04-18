import nodemailer from "nodemailer";

export const sendMail = async ({ email, subject, message }) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error(
        "Missing SMTP credentials. Set SMTP_USER and SMTP_PASSWORD in Backend/config/config.env."
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD.replace(/\s+/g, ""),
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
