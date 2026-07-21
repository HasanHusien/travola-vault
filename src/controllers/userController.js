const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory'); 
const AppError = require('../utils/appError');


// filter obj for doing update for only name & email
const filterObj = (body, ...allowedFields) => {
  const newObj = {};

  Object.keys(body).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = body[el];
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserModel.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) if user sending password create an error
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'this route not for update password, please use /updatePassword.'
      )
    );
  }

  // 2) filter unwanted fields names there are not allowed to be update
  const filteredBody = filterObj(req.body, 'email', 'name');

  // 3) update user document (not password)
  // note:using findByIdAndUpdate cause we handling not sensitive date
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );

  // 4) send response
  res.status(200).json({
    status: 'success',
    data: {
      user: { updatedUser }
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // note: only can use findByIdAndUpdate with already existing user or logged in users
  await UserModel.findByIdAndUpdate(req.user.id, {
    active: false
  });

  // 204 (deleted)
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = factory.updateOne(UserModel)
exports.deleteUser = factory.deleteOne(UserModel)
