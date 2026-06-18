const mongoose = require('mongoose');
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
  password: {
    type: String,
    required: [true, 'please provide a password!'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please provide a password confirm correctly']
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
