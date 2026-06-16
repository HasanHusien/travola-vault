module.exports = (err, req, res, next) => {
  // console.log(err.stack); see call stack

  err.statusCode = err.statusCode || 500;
  err.status = 'fail' || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
  next(err);
};
