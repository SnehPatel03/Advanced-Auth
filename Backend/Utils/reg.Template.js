export function generateVerificationCodeEmailTemplate(verificationCode) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #0d0d0d;
          color: #e5e5e5;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          line-height: 1.6;
        }
        .container {
          max-width: 480px;
          margin: 60px auto;
          background-color: #1a1a1a;
          border-radius: 14px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
          padding: 32px;
        }
        .header {
          text-align: center;
          margin-bottom: 28px;
        }
        .header h1 {
          font-size: 26px;
          color: #ffffff;
          margin: 0;
        }
        .header p {
          font-size: 14px;
          color: #888;
          margin-top: 8px;
        }
        .message {
          font-size: 15px;
          color: #ccc;
        }
        .code-box {
          background-color: #000000;
          color: #ffffff;
          border: 1px solid #444;
          font-size: 28px;
          font-weight: bold;
          padding: 18px;
          text-align: center;
          border-radius: 10px;
          letter-spacing: 4px;
          margin: 30px 0;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          margin-top: 40px;
          border-top: 1px solid #333;
          padding-top: 16px;
        }
        a {
          color: #888;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Verification</h1>
          <p> Patel.Auth.Co</p>
        </div>
        <div class="message">
          <p>Hello,</p>
          <p>To verify your email address, please use the code below:</p>
          <div class="code-box">${verificationCode}</div>
          <p>If you didn’t request this, you can safely ignore it. This code will expire soon.</p>
          <p>— The Auth Team</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Patel.Auth.Co All rights reserved.<br/>
          <a href="#">Patel.Auth.Co</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateResetPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }

          .container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .button {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          }

          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <a class="button" href="${resetPasswordUrl}" target="_blank">Reset Password</a>
          <p>If you didn’t request this, you can safely ignore this email.</p>
          <div class="footer">
            <p>This link will expire in 15 minutes for your security.</p>
            <p>&copy; ${new Date().getFullYear()} Your App Name</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
