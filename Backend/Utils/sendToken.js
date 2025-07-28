export const sendToken = function (user, statusCode, message, res) {
  const token = user.generateToken();

res
  .status(statusCode)
  .cookie("token", token, {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    httpOnly: true,
    sameSite: "None", // ← important for cross-site cookies
    secure: true      // ← required for "SameSite=None"
  })
  .json({
    success: true,
    user,
    message,
    token
  });

};
