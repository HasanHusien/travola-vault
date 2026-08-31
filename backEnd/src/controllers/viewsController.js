const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

// exports.getOverview = catchAsync(async (req, res) => {
//   // 1. get tour data from collection
//   const tours = await Tour.find();
//   // 2. build template

//   // 3.render that templat using tour data
//   res.status(200).render('overview', {
//     title: 'all tours',
//     tours
//   });
// });

exports.getTour = catchAsync(async (req, res) => {
  // 1. get data from request
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  // 1. build template
  // console.log(tour.reviews);

  res.status(200).json({
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'log into your account'
  });
});

exports.getDetails = (req, res) => {};
