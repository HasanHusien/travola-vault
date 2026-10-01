const Tour = require('../models/tourModel');
const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');

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

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await UserModel.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email
//     },
//     {
//       new: true,
//       runValidator: true
//     }
//   );

//   // console.log('data is: ', req.body);

//   res.status(200).json({
//     title: 'Your account',
//     user: updatedUser
//   });
// });

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
