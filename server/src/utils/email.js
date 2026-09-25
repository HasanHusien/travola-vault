const nodemailer = require('nodemailer');
const React = require('react');
const { render } = require('@react-email/components');
const { convert } = require('html-to-text');

const WelcomeEmail = require('../views/emails/WelcomeEmail.jsx');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 2525,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async ({ to, subject, element }) => {
  const html = await render(element);

  await transporter.sendMail({
    from: `Hassan Hussien <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
    text: convert(html)
  });
};

const sendWelcomeEmail = async (user, url) => {
  const firstName = String(user.name || 'there').split(' ')[0];

  await sendEmail({
    to: user.email,
    subject: 'Welcome to the Natours family!',
    element: React.createElement(WelcomeEmail, {
      firstName,
      url
    })
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail
};
