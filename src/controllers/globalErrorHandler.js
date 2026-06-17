const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err
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
  // console.log(err.stack); see call stack

  err.statusCode = err.statusCode || 500;
  err.status = 'fail' || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // send friendly message to the client
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};
