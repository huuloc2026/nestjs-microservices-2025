export const htmlContent = (URL_VERIFY: string, otp: string, email: string) => {
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        padding-bottom: 10px;
      }
      .verification-code {
        font-size: 1.4em;
        font-weight: bold;
        color: #007BFF;
        text-align: center;
        margin: 20px 0;
      }
      button {
        display: inline-block;
        background-color: #007BFF;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 1em;
        cursor: pointer;
        text-decoration: none;
      }
      button:hover {
        background-color: #0056b3;
      }
      img {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 20px auto;
        border-radius: 8px;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 0.9em;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Welcome to My Website!</h2>
      </div>
      <p>Hello,</p>
      <p>Your verification token is:</p>
      <p class="verification-code">${otp}</p>
      <p>Please use the button below to verify your token:</p>
      <span>${URL_VERIFY}<span>
      <form action="${URL_VERIFY}" method="POST">
        <input type="hidden" name="email" value="${email}" />
        <input type="hidden" name="token" value="${otp}" />
        <div style="text-align: center;">
          <button type="submit">Verify Token</button>
        </div>
      </form>
      <img src="https://i.pinimg.com/474x/49/2c/01/492c01c5e72473a6e3ac97fda12cd6c0.jpg" alt="Verification Graphic" />
      <p class="footer">
        If you did not request this email, please ignore it.
      </p>
      <p class="footer">
        Best regards,<br />
        <strong>The Loc Backend Team</strong>
      </p>
    </div>
  </body>
</html>
`;
};
