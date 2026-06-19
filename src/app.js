const express = require('express');
const morgan = require('morgan');

const app = express();

const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

// json parser middleware
app.use(express.json());

// morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

// all eq all http method & '*' eq all not declared route
app.all('*', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} at this server`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
