// using nodemailer with mailtrap to send messages to email (not gmail)
const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = catchAsync(async options => {
  // 1) create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) define email options
  const mailOptions = {
    from: 'Hassan Hussien <hakpb7@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };
  // 3) sent the email
  await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;
