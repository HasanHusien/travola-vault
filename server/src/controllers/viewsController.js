const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getTour = catchAsync(async (req, res, next) => {
  // 1. get data from request
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  // 1. build template
  if (!tour) {
    return next(new AppError('there was not tour with that name'));
  }

  res.status(200).json({
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1. Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2. find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  // 3. send res
  res.status(200).json({
    title: 'My tours',
    tours
  });
});
