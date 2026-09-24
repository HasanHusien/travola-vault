import { Text, Button } from '@react-email/components';

import EmailLayout from './EmailLayout.jsx';

const styles = {
  button: {
    backgroundColor: '#55c57a',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '5px',
    textDecoration: 'none'
  }
};

export default function WelcomeEmail({ firstName, url }) {
  return (
    <EmailLayout>
      <Text>Hi {firstName},</Text>

      <Text>Welcome to Natours, we're glad to have you 🎉🙏</Text>

      <Text>
        We're all a big family here, so make sure to upload your user photo so
        we get to know you a bit better!
      </Text>

      <Button href={url} target="_blank" style={styles.button}>
        Upload user photo
      </Button>

      <Text>
        If you need any help with booking your next tour, please don't hesitate
        to contact me!
      </Text>

      <Text>- Jonas Schmedtmann, CEO.</Text>
    </EmailLayout>
  );
}
