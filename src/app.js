const AppError = require('./utils/appError');
const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');

// json parser middleware
app.use(express.json());

// morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// using express-rate-limit package
// rate limiting algorithm (middleware) for protect from attacks
const limit = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 80, // 80 try
  message: 'Too many requests from this IP, please try again in an hour!'
});
// to see rate limit look at Headers
app.use('/api', limit);

// rotes
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

// all eq all http method & '*' eq all not declared route
app.all('*', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} at this server`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
