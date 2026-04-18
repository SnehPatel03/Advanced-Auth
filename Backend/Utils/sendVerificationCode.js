import { generateVerificationCodeEmailTemplate } from "./reg.Template.js";
import { sendMail } from "./sendMail.js";

export async function sendVerificationCode(email, verificationCode) {
  const message = generateVerificationCodeEmailTemplate(verificationCode);
  await sendMail({
    email,
    subject: "Verification code by Patel.Auth.Co",
    message,
  });
}
