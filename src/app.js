const AppError = require('./utils/appError');
const express = require('express');
const morgan = require('morgan');

const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

// setting HTTP Headers
app.use(helmet());

// json parser middleware && setting limit for body data
app.use(express.json({ limit: '10kb' }));

// morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// using express-rate-limit package
// rate limiting algorithm (middleware) for protect from attacks
const limier = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 80, // 80 try
  message: 'Too many requests from this IP, please try again in an hour!'
});
// to see rate limit look at Headers
app.use('/api', limiter);

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
