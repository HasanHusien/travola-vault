const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Email = require('./email.js');

console.log('host', process.env.EMAIL_HOST, 'port', process.env.EMAIL_PORT);

(async () => {
  const mail = new Email(
    { name: 'Hassan Test', email: 'test@example.com' },
    'http://127.0.0.1:8000/me'
  );

  try {
    await mail.newTransport().verify();
    console.log('SMTP_VERIFY_OK');
  } catch (e) {
    console.log('SMTP_VERIFY_FAIL', e.code || '', e.message);
    process.exit(1);
  }

  try {
    await mail.sendWelcome();
    console.log('SEND_OK');
  } catch (e) {
    console.log('SEND_FAIL', e.code || '', e.message);
    process.exit(1);
  }
})();
