const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  passwordChangedAt: DAte
});

// encrypt password by bcrypt
userSchema.pre('save', async function(next) {
  // only execute if password modifying
  if (!this.isModified('password')) return next();

  // crypt the password by bcrypt package
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
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

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
