const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
  // Parent reference
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a Tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User']
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price!']
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

// all pre middleware should call next()
bookingSchema.pre(/^find/, next => {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
