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

      <Text>Welcome to Natours, we're glad to have you 🎉🙏</Text>

      <Text>
        We're all a big family here, so make sure to upload your user photo so
        we get to know you a bit better!
      </Text>

      <Button href={url} style={buttonStyle}>
        Upload user photo
      </Button>

      <Text>
        If you need any help with booking your next tour, please don't hesitate
        to contact me!
      </Text>

      <Text>- Hassan Hussien, CEO</Text>
    </EmailLayout>
  );
}

module.exports = WelcomeEmail;
