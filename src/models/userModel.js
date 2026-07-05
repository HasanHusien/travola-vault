const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

// Inputs: name, email, photo, password, confirmPassword
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a correct email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'please provide a password!'],
    minlength: 8,
    select: false // make not show in search or find db data
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please provide a password confirm correctly'],

    // checking if password are the same %% runs before save() and create()
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'passwords are not matched' // err msg
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordRestExpires: Date
});
// encrypt password by bcrypt (middleware)
userSchema.pre('save', async function(next) {
  // only execute if password modifying
  if (!this.isModified('password')) return next();

  // crypt the password by bcrypt package
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

//update passwordChangedAt for the user (middleware)
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// compare user password with db password when login (bcrypt)
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//more instance for checking if password has been changed %% return false or true
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(this.passwordChangedAt, JWTTimestamp);

    return JWTTimestamp < changedTimestamp;
  }

  // return false if nothing changed
  return false;
};

userSchema.methods.createPasswordRestToken = function() {
  // build in module for encrypt and security
  const restToken = crypto.randomBytes(32).toString('hex');

  // create hash for token by (sha256) algorithm and convert buffers to string
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(restToken)
    .digest('hex');

  console.log({ restToken }, this.passwordResetToken);

  // 10 minutes
  this.passwordRestExpires = Date.now() + 10 * 60 * 1000;

  return restToken;
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;

// {
//   "name":"hassan hussien",
//   "email":"dev.@test.io",
//   "role":"admin",
//   "password":"pass12345",
//   "passwordConfirm":"pass12345"
// }
