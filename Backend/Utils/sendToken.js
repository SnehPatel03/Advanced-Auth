export const sendToken = function (user, statusCode, message, res) {
  const token = user.generateToken();
  const isProduction = process.env.NODE_ENV === "production";

res
  .status(statusCode)
  .cookie("token", token, {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
  })
  .json({
    success: true,
    user,
    message,
    token
  });

};
