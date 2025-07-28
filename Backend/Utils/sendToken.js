export const sendToken = function (user, statusCode, message, res) {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3), // 3 days
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
