const createResetPasswordEmail = (resetLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - InspireGen</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #ffffff;
          margin: 0;
          padding: 0;
          background-color: #1a1a1a;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .email-wrapper {
          background-color: #2c2c2c;
          border-radius: 16px;
          padding: 40px;
          margin: 20px 0;
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          width: 120px;
          height: auto;
        }
        .logo-text {
          font-size: 28px;
          font-weight: 700;
          color: #3b82f6;
          margin-top: 10px;
          letter-spacing: -0.5px;
        }
        .content {
          text-align: center;
          margin-bottom: 30px;
        }
        h1 {
          color: #ffffff;
          font-size: 26px;
          margin-bottom: 20px;
          font-weight: 700;
        }
        p {
          color: #d1d5db;
          font-size: 16px;
          margin-bottom: 25px;
        }
        .button {
          display: inline-block;
          background-color: #3b82f6;
          color: white;
          padding: 16px 36px;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 600;
          margin: 20px 0;
          font-size: 16px;
          transition: transform 0.2s ease, background-color 0.2s;
        }
        .button:hover {
          background-color: #2563eb;
          transform: translateY(-2px);
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #374151;
          color: #9ca3af;
          font-size: 14px;
        }
        .warning {
          background-color: #4b5563;
          border: 1px solid #6b7280;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
          color: #f9fafb;
          font-size: 14px;
        }
        .social-links {
          margin-top: 20px;
        }
        .social-links a {
          color: #3b82f6;
          text-decoration: none;
          margin: 0 10px;
        }
        .social-links a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-wrapper">
          <div class="logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="#3b82f6"/>
              <path d="M24 14C18.477 14 14 18.477 14 24C14 29.523 18.477 34 24 34C29.523 34 34 29.523 34 24C34 18.477 29.523 14 24 14ZM24 32C19.589 32 16 28.411 16 24C16 19.589 19.589 16 24 16C28.411 16 32 19.589 32 24C32 28.411 28.411 32 24 32Z" fill="#ffffff"/>
              <path d="M24 18C21.791 18 20 19.791 20 22C20 24.209 21.791 26 24 26C26.209 26 28 24.209 28 22C28 19.791 26.209 18 24 18ZM24 24C22.895 24 22 23.105 22 22C22 20.895 22.895 20 24 20C25.105 20 26 20.895 26 22C26 23.105 25.105 24 24 24Z" fill="#ffffff"/>
            </svg>
            <div class="logo-text">InspireGen</div>
          </div>
          
          <div class="content">
            <h1>Reset Your Password</h1>
            <p>Hello! We received a request to reset your password for your InspireGen account. Click the button below to create a new password.</p>
            
            <div class="warning">
              This password reset link will expire in 1 hour for security reasons. If you didn't request this, please ignore this email.
            </div>
            
            <a href="${resetLink}" class="button">Reset Password</a>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #3b82f6; font-size: 14px;">${resetLink}</p>
          </div>
          
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <div class="social-links">
              <a href="#">Twitter</a> • 
              <a href="#">Instagram</a> • 
              <a href="#">LinkedIn</a>
            </div>
            <p style="margin-top: 20px;">© ${new Date().getFullYear()} InspireGen. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export {
  createResetPasswordEmail
}
