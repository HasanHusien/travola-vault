const catchAsync = require('../utils/catchAsync');
const ReviewModel = require('../models/reviewModel');
const factory = require('../controllers/handlerFactory');

// simple middleware for process the nested routes
exports.setTourAndUserIds = (req, res, next) => {
  // allowed nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.use.id;
  next();
};

// this was so good one (learning trip) please return it 2026 / 7 / 23
exports.getReviews = factory.getAll(ReviewModel);
exports.getReview = factory.getOne(ReviewModel);
exports.createReview = factory.createOne(ReviewModel);
exports.updateReview = factory.updateOne(ReviewModel);
exports.deleteReview = factory.deleteOne(ReviewModel);
