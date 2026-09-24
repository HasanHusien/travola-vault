const React = require('react');
const { Text, Button } = require('@react-email/components');
const EmailLayout = require('./EmailLayout.jsx');

function WelcomeEmail({ firstName, url }) {
  return (
    <EmailLayout>
      <Text>Hi {firstName},</Text>

      <Text>Welcome to Natours, we're glad to have you 🎉🙏</Text>

      <Text>
        We're all a big familiy here, so make sure to upload your user photo so
        we get to know you a bit better!
      </Text>

      <Button href={url}>Upload user photo</Button>

      <Text>
        If you need any help with booking your next tour, please don't hesitate
        to contact me!
      </Text>

      <Text>- Jonas Schmedtmann, CEO.</Text>
    </EmailLayout>
  );
}

module.exports = WelcomeEmail;
