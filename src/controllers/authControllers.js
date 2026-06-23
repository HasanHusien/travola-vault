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

  // const jwtSecret =  process.env.JWT_SECRET,
  // const jwtExpiresIn = process.env.JWT_EXPIRESIN

  // uses: jwt.sign(payload, secretOrPrivateKey, [options, callback])
  // this is the sigature or jtw for the user
  const token = jwt.sign({ name: newUser.name }, process.env.JWT_SECRET, {
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
  const checkCorrect = await user.correctPassword(password, user.password);

  if (!user || !checkCorrect) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3. if everything os ok, send token to client
  const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
  });

  res.status(200).json({
    status: 'success',
    token
  });
});

// protect routes for only logged in users
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
  // 2) verification token

  // 3) check if user still exists

  // 4) check if user changed password after token was issued
  next();
});
