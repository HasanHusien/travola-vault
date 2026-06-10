const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = require('./app');
const port = process.env.PORT || 8000;
const DB = process.env.DATABASE;

// DB connections
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successfully!');
  })
  .catch(err => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
