const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// catch sync code, should be in first of call stack
process.on('uncaughtException', err => {
  console.log('Uncaught Exception shuting down...');
  console.log(err.name, err.message);
  console.log(err);

  process.exit(1);
});

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

const server = app.listen(port, () => {
  console.log(
    `Running on port ${port}`,
    ': 127.0.0.1:8000/api/tours || 127.0.0.1:8000/api/users '
  );
});

// catch async code, uncached promise error
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('unhandled rejection shuting down...');

  server.close(() => {
    process.exit(1);
  });
});
