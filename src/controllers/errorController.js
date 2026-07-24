// too important and fun file to write
const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// when create tour with exist
const handleDuplicateNameDB = err => {
  // get the duplicate name from error (regex for get name from quotes)
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. please try another value`;

  return new AppError(message, 400);
};

const handleValidationErrDB = err => {
  const errors = Object.values(err.errors.map(el => el.message));
  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
};

// not the same jwt sent in prod
const handleJWTError = () =>
  new AppError('Invalid token please try again!', 401);

const handleExpiredError = () =>
  new AppError('Yuor token has been expired, please login again');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // isOperational: trust err send message to the client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  //programming or other unknown err, don't leek err details
  else {
    console.error('ERROR', err);
    res.status(err.statusCode).json({
      status: 'error',
      message: 'something went wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack); see all call stack

  err.statusCode = err.statusCode || 500;
  err.status = 'fail' || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // send friendly message to the client
    let error = {
      ...err
    };

    // note: these errors created by mongoose!
    // that property from err object name castError mean not found tout id you search for
    if (error.name === 'CastError') error = handleCastErrorDB(error);

    // that property from err object code 11000 mean you try create name is exist before
    if (error.code === 11000) error = handleDuplicateNameDB(error);

    // for validation errors
    if (error.name === 'ValidationError') error = handleValidationErrDB(error);

    if (err.name === 'JsonWebTokenError') handleJWTError(error);

    if (err.name === 'TokenExpiredError') handleExpiredError();
  }
};
