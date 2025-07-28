  import nodemailer from "nodemailer";

  export const sendMail = async ({ email, subject, message }) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE, 
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD, 
        },
      });

      const mailOptions = {
        from: process.env.USER,
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
