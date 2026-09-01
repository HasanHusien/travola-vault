const path = require('path');
const AppError = require('./utils/appError');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

// security packages
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const globalErrorHandler = require('./controllers/errorController');


// fro pug path
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// for public path
app.use(express.static(path.join(__dirname, 'public')));

// setting HTTP Headers
// app.use(helmet());

// add more secure for sorting (using hpp middleware)
app.use(
  hpp({
    // allowed to duplicate these fields names
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
      'difficulty'
    ]
  })
);

// json parser middleware && setting limit for req.body data
app.use(express.json({ limit: '10kb' }));

// morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// data sanitization against NOSQL query injection attacks
app.use(mongoSanitize());

// data sanitization against XSS attacks
// app.use(xss());

// using express-rate-limit package
// rate limiting algorithm (middleware) for protect from attacks
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 80, // 80 try
  message: 'Too many requests from this IP, Please try again in an hour!'
});
// to see rate limit look at Headers
// app.use('/api', limiter);

app.use(cors());

// rotes
app.use('/api', viewRouter);
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

// all eq all http method & '*' eq all not declared route
app.all('*', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} at this server`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
