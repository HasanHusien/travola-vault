const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

// new Email (user,url).sendWelcome()

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Hassan Hussien <${process.env.EMAIL_FORM}>`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      // later
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,

      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // sending
};

const sendEmail = catchAsync(async options => {
  // 1) create transporter

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
