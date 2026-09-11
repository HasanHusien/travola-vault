const Tour = require('../models/tourModel');
const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Middleware for uploading files
// How use multer in general
const multer = require('multer');
const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/users');
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    callback(null, `yser-${req.user.id}-${Date.now()}.${extension}`);
  }
});

// for filter or pass only images
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(
      new AppError('Not an image! please upload only images', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

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
  // console.log(tour.reviews);

  if (!tour) {
    return next(new AppError('there was not tour with that name'));
  }

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

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidator: true
    }
  );

  // console.log('data is: ', req.body);

  res.status(200).json({
    title: 'Your account',
    user: updatedUser
  });
});
