const nodemailer = require('nodemailer');

const dotenv = require("dotenv")
dotenv.config();

const Transport = nodemailer.createTransport({
    pool: true,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_ENCRYPTION, // use TLS
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
});

Transport.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("SMTP ready to send messages");
    }
});

const contactUsTemplate = (param) => {
    return {
      from: process.env.MAIL_FROM_ADDRESS,
      to: process.env.MAIL_TO_ADDRESS_CONTACT_US,
      subject: `[BRM-AGRO] ${param.subject}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>BRM AGRO - Contact Us Form</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f5f0;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                  <td align="center" style="padding: 0;">
                      <table role="presentation" style="width: 600px; border-collapse: collapse; text-align: left; background-color: #ffffff; margin: 20px 0;">
                          <!-- Header -->
                          <tr>
                              <td style="padding: 40px 30px; background-color: #15381B;">
                                 <img style="width: 128px;"
                                    src="https://brm-agro.s3.ap-southeast-1.amazonaws.com/logo-2.png"
                                    alt="" />
                              </td>
                          </tr>
                          <!-- Main Content -->
                          <tr>
                              <td style="padding: 30px; background-color: #ffffff;">
                                  <h2 style="color: #2E7D32; font-size: 24px;">Contact Us Form Data</h2>
                                  <p style="color: #333333; font-size: 16px; line-height: 1.5;">
                                    Email:  ${param.email}
                                  </p>
                                  <p style="color: #333333; font-size: 16px; line-height: 1.5;">
                                    Name:  ${param.name}
                                  </p>
                                  <p style="color: #333333; font-size: 16px; line-height: 1.5;">
                                    Title:  ${param.subject}
                                  </p>
                                  <p style="color: #333333; font-size: 16px; line-height: 1.5;">
                                    Message:
                                  </p>
                                  <p style="color: #333333; font-size: 16px; line-height: 1.5;">
                                    ${param.body}
                                  </p>
                              </td>
                          </tr>
                          <!-- Footer -->
                          <tr>
                              <td style="padding: 30px; background-color: #15381B; color: #ffffff; font-size: 14px; text-align: center;">
                                  <p style="margin: 0;">© 2024 BRM AGRO. All rights reserved.</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>`
    }
}

export {
    Transport,
    contactUsTemplate
}
