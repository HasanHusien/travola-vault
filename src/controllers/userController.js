const UserModel = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserModel.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users
  });
});

exports.updateMe = (req, res, next) => {
  //1) if user sending password create an error
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'this route not for update password, please use /updatePassword.'
      )
    );
  }


};

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
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
