const AppError = require('./utils/appError');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

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
const bookingRouter = require('./routes/bookingRoutes');

const globalErrorHandler = require('./controllers/errorController');

// uploaded + static images live in server/public
app.use(express.static(path.join(__dirname, '..', 'public')));

// access all origin (*)
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.options('*', cors());

// setting HTTP Headers
app.use(helmet());

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

// compress all response
app.use(compression());

// json parser middleware && setting limit for req.body data
app.use(express.json({ limit: '10kb' }));

// parse data coming from req or Form
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// data sanitization against NOSQL query injection attacks
app.use(mongoSanitize());

// data sanitization against XSS attacks
app.use(xss());

// rate limiting algorithm (middleware) for protect from attacks
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 120, // 120 try
  message: 'Too many requests from this IP, Please try again in an hour!'
});
// to see rate limit look at Headers
// app.use('/api', limiter);

app.use('/', (req, res, next) => {
  console.log((req.requestTime = new Date().toISOString()));
  next();
});

// ROUTES
app.use('/api', viewRouter);
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/booking', bookingRouter);

// all eq all http method & '*' eq all not declared route
app.all('*', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} at this server`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
