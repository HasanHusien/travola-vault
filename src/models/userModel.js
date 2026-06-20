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
    minlength: 8
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
  }
});

userSchema.pre('save', async function(next) {
  // only execute if password modifying
  if (!this.isModified('password')) return next();

  // crypt the password by bcrypt package
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
