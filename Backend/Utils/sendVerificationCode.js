import { generateVerificationCodeEmailTemplate } from "./reg.Template.js";
import { sendMail } from "./sendMail.js";

export async function sendVerificationCode(email, verificationCode) {
  try {
    const message = generateVerificationCodeEmailTemplate(verificationCode);
    await sendMail({
      email,
      subject: "Verification code by Patel.Auth.Co",
      message,
    });

    // ✅ No res here — just return true
    return true;
  } catch (error) {
    console.error("error in sending verification code:", error);
    // ❌ no res.status here
    return false;
  }
}
