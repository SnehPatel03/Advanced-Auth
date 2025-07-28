import bcrypt from "bcrypt";
import { User } from "../model/userModel.js";
import { sendVerificationCode } from "../Utils/sendVerificationCode.js";
import { sendToken } from "../Utils/sendToken.js";
import { generateResetPasswordEmailTemplate } from "../Utils/reg.Template.js";
import { sendMail } from "../Utils/sendMail.js";
import { json } from "express";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    console.log("BODY_RECEIVED", req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({ message: "Enter all Cardensials" });
    }

    const isRegistered = await User.findOne({ email, accountVerified: true });

    if (isRegistered) {
      return res.status(404).json({ message: "User Already Exist" });
    }

    const verificationAttempts = await User.find({
      email,
      accountVerified: false,
    });

    if (verificationAttempts.length >= 5) {
      return res.status(404).json({
        message:
          "You have exceeded the number of registration attempts. Please contact support.",
      });
    }

    if (password.length < 8 || password.length > 16) {
      return res.status(404).json({
        message: "Your Password length must be between 8 to 16 characters ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    const verificationCode = user.generateVerificationCode();
    if (!verificationCode) {
      res.status(404).json({ message: "verificationCode not Found" });
    }
    await user.save();
    const codeSent = await sendVerificationCode(email, verificationCode);

    if (!codeSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send verification code. Please try again later.",
      });
    }

    sendToken(
      user,
      200,
      "Registration successful. Verification code sent.",
      res
    );
  } catch (error) {
    console.log("error", error);
  }
};
export const otpVerify = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Email and OTP are required",
    });
  }

  try {
    const userEntries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    if (!userEntries || userEntries.length === 0) {
      return res
        .status(404)
        .json({ message: "No User Exists with this Email" });
    }

    let user = userEntries[0];

    if (userEntries.length > 1) {
      await User.deleteMany({
        email,
        accountVerified: false,
        _id: { $ne: user._id },
      });
    }

    if (user.verificationCode !== Number(otp)) {
      return res.status(400).json({ message: "Your OTP is not valid" });
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();

    if (currentTime > verificationCodeExpire) {
      return res
        .status(400)
        .json({ message: "Your Verification Code is Expired" });
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;

    await user.save({ validateModifiedOnly: true });
    sendToken(user, 200, "Account Verified", res);
  } catch (error) {
    console.error("Error from OTP VERIFICATION", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter Email and Password" });
  }

  const user = await User.findOne({ email, accountVerified: true }).select(
    "+password"
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  sendToken(user, 200, "User Login Successfully", res);
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "LogOut Successful",
    });
};

export const forgetPassword = async (req, res) => {
  const email = req.body;
  if (!email) {
    res.status(404).json({ message: "Email is required" });
  }

  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });

  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }

  const resetToken = user.getResetPasswordCode();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `https://advanced-auth-3v6r.onrender.com/password/reset/${resetToken}`;
  const message = generateResetPasswordEmailTemplate(resetPasswordUrl);

  try {
    await sendMail({
      email: user.email,
      subject: "Auth Co. Password Reset Code",
      message,
    });

    return res.status(200).json({
      success: true,
      message: `Password reset link sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save({ validateBeforeSave: false });

    console.error("Error in sending reset email:", error.message);
    return res.status(500).json({ message: "Failed to send reset email" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now() },
  });
  console.log("user", user);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid Token for Reset Password or Token Expired " });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password & Confirm Password is not matched" });
  }
  if (
    req.body.password.length < 8 ||
    req.body.password.length > 16 ||
    req.body.confirmPassword.length < 8 ||
    req.body.confirmPassword.length > 16
  ) {
    return res
      .status(400)
      .json({ message: "Password must be between 8 and 16 characters" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;

  await user.save();
  sendToken(user, 200, "Password Reset Successfully", res); // res is important mannn
};
export const updatePassword = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Enter all credentials" });
  }

  const isMatched = await bcrypt.compare(currentPassword, user.password);
  if (!isMatched) {
    return res.status(400).json({ message: "Current Password is not valid" });
  }

  if (
    currentPassword.length < 8 ||
    currentPassword.length > 16 ||
    newPassword.length < 8 ||
    newPassword.length > 16
  ) {
    return res
      .status(400)
      .json({ message: "Password must be between 8 to 16 characters" });
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "New Password and Confirm Password must be same" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated",
  });
};
