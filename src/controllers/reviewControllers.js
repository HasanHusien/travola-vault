const catchAsync = require('../utils/catchAsync');
const ReviewModel = require('../models/reviewModel');
const factory = require('../controllers/handlerFactory');

exports.setTourAndUserIds = (req, res, next) => {
  // allowed nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.use.id;
  next();
};

exports.getReviews = factory.getAll(ReviewModel);
exports.getReview = factory.getOne(ReviewModel);
exports.createReview = factory.createOne(ReviewModel);
exports.updateReview = factory.updateOne(ReviewModel);
exports.deleteReview = factory.deleteOne(ReviewModel);
