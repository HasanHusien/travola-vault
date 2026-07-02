const crypto = require('crypto');
const AppError = require('../utils/appError');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const sendEmail = require('../utils/email');
const { promisify } = require('util');

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

// authorization %% ...role eq unlimited params
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin, lead-guide]. role = user

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // 1. get user based on posted email
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('please provide an correct email address', 404));
  }

  // 2. generate the random rest token
  const restToken = user.createPasswordRestToken();
  // for saving to DB
  await user.save({ validateBeforeSave: false });

  // 3. send it to users email
  const restUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${restToken}`;

  // very common message pattern
  const message = `Forget your password? Submit a patch request with new password and
   passwordConfirm to: ${restUrl}\nif you didn't forget your password please ignore this message.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'your password rest token (valid 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'token send to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordRestExpires = undefined;
    // to save
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('there was error sending email. please try again later', 500)
    );
  }
});

exports.restPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on the token
  // note: req.params.token cause in route /:token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // check user password and expired time
  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordRestExpires: {
      $gt: Date.now()
    }
  });

  // 1) if token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or token has Expired', 400));
  }

  // rest password and modify restToken and restExpired
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordRestExpires = undefined;

  await user.save();

  // 3)update passwordChangedAt for the user

  // 4)log user in, send token
  const token = jwt.sign(
    {
      id: user._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN
    }
  );

  res.status(200).json({
    status: 'success',
    token
  });
});
