const React = require('react');
const { Text, Button } = require('@react-email/components');
const EmailLayout = require('./EmailLayout.jsx');

const buttonStyle = {
  backgroundColor: '#55c57a',
  borderRadius: '5px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '12px 25px',
  textDecoration: 'none',
  textTransform: 'capitalize'
};

function WelcomeEmail({ firstName, url }) {
  return (
    <EmailLayout preview="Welcome to Natours, we're glad to have you!">
      <Text>Hi {firstName},</Text>

      <Text>
        Forget your password? Submit a patch request with new password and
        passwordConfirm to: {url};
      </Text>

      <Text>Website for this action not yet implemented</Text>

      <Button href={url} style={buttonStyle}>
        Upload user photo
      </Button>

      <Text>
        if you didn't forget your password please ignore this message.
      </Text>
    </EmailLayout>
  );
}

module.exports = WelcomeEmail;
