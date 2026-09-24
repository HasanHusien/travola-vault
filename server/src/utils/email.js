const nodemailer = require('nodemailer');
const React = require('react');
const { render } = require('@react-email/components');
const { convert } = require('html-to-text');

// const WelcomeEmail = require('../views/emails/WelcomeEmail');

// console.log(process.env.EMAIL_FROM);

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;

    this.from = `Hassan Hussien <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendWelcome() {
    // Import JSX component
    const { default: WelcomeEmail } = await import(
      '../views/emails/WelcomeEmail.jsx'
    );

    const html = await render(
      React.createElement(WelcomeEmail, {
        firstName: this.firstName,
        url: this.url
      })
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: 'Welcome to our family',
      html,
      text: convert(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }
};
