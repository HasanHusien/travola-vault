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

exports.setTourAndUserIds = (req, res, next) => {
  // allowed nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.use.id;
  next();
};
exports.getReview = factory.getOne(ReviewModel);
exports.createReview = factory.createOne(ReviewModel);
exports.updateReview = factory.updateOne(ReviewModel);
exports.deleteReview = factory.deleteOne(ReviewModel);
