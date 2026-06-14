const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const { urlIssue } = require('./middleware/UrlIssue');

// json parser middleware
app.use(express.json());

// morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// all eq all http method & '*' eq all not declared route
app.all('*', urlIssue);

module.exports = app;
