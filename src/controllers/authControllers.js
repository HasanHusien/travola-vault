const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// signup
exports.signup = catchAsync(async (req, res, next) => {
  // make it like this for don't add other prop as role
  // more secure then req.body
  const newUser = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  // uses: jwt.sign(payload, secretOrPrivateKey, [options, callback])
  // this is the sigature or jtw for the user
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if email and password exist
  if (!password || !email) {
    return next(new AppError('please provide email and password', 400));
  }

  // 2.check if user exist & and password correct
  // the way to get password
  const user = await UserModel.findOne({ email }).select('+password');
  // const checkCorrect = await user.correctPassword(password, user.password);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3. if everything os ok, send token to client
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
  });

  res.status(200).json({
    status: 'success',
    token
  });
});

// protect routes for only logged in users allow access to data
exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting token and check if it's exist
  let token;

  // very standard way in this process to set in header {authorization : Bearer token...}
  // its call these names in this process and send in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('user not logged in please log in to access', 401)
    );
  }
  // 2) verification token %% promisify: for convert to promise
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) check if user still exists
  const currentUser = await UserModel.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(
        'the user belonging to this token does no longer  exist',
        401
      )
    );

  // 4) check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('password has been changed, please login again', 401)
    );
  }

  // grand access to protected route
  req.user = currentUser;
  next();
});
