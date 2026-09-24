const React = require('react');

const {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link
} = require('@react-email/components');

function EmailLayout({ children }) {
  return (
    <Html>
      <Head />

      <Body>
        <Container>
          <Section>{children}</Section>

          <Section>
            <Text>Natours Inc, 123 Nowhere Road, San Francisco CA 99999</Text>

            <Text>
              Don't like these emails? <Link href="#">Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

module.exports = EmailLayout;
