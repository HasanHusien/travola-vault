exports.urlIssue = (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `cannot find ${req.originalUrl} at this server`
  });
  next();
};
