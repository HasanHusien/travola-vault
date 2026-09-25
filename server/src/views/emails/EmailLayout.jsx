// require('./design.css');
const React = require('react');
const {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link
} = require('@react-email/components');

// fast css
const colors = {
  bg: '#f6f6f6',
  white: '#ffffff',
  text: '#000000',
  muted: '#999999',
  brand: '#55c57a'
};

const styles = {
  body: {
    backgroundColor: colors.bg,
    fontFamily: 'sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    margin: 0,
    padding: 0
  },
  container: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '580px',
    padding: '10px',
    width: '580px'
  },
  main: {
    backgroundColor: colors.white,
    borderRadius: '3px',
    width: '100%',
    padding: '20px'
  },
  footer: {
    clear: 'both',
    marginTop: '10px',
    textAlign: 'center',
    width: '100%'
  },
  footerText: {
    color: colors.muted,
    fontSize: '12px',
    textAlign: 'center'
  },
  link: {
    color: colors.brand,
    textDecoration: 'underline'
  }
};

function EmailLayout({ preview, children }) {
  return (
    <Html>
      <Head />
      {preview ? <Preview>{preview}</Preview> : null}

      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.main}>{children}</Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Natours Inc, 123 Nowhere Road, San Francisco CA 99999
            </Text>
            <Text style={styles.footerText}>
              Don't like these emails?{' '}
              <Link href="#" style={styles.link}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

module.exports = EmailLayout;
