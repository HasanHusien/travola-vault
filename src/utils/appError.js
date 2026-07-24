// of the most smart class for handle error message 
// this was soo helpful, please read good
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // call parent

    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
