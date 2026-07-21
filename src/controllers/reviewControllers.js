const catchAsync = require('../utils/catchAsync');
const ReviewModel = require('../models/reviewModel');
const factory = require('../controllers/handlerFactory');

exports.getReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await ReviewModel.find(filter);

  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // allowed nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.use.id;

  const newReview = await ReviewModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newReview
    }
  });
});

exports.updateReview = factory.updateOne(ReviewModel);
exports.deleteReview = factory.deleteOne(ReviewModel);
