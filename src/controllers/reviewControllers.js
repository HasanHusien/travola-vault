const catchAsync = require('../utils/catchAsync');
const reviewModel = require('../models/reviewModel');

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await reviewModel.find();

  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await reviewModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newReview
    }
  });
});
