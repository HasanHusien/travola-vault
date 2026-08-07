// very simple schema fpr build && read (reviews schema).
const mongoose = require('mongoose');
const TourModel = require('./tourModel');

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'this fields is required']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },

    // ref to tour
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.']
    },

    // ref to user
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  {
    // make virtual properties appear in my data
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// reviewSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'tour',
//     select: 'name'
//   });

//   next();
// });

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  // console.log(stats);

  if (stats.length > 0) {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].nRating
    });
  } else {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post('save', function(next) {
  // this points to current review

  this.constructor.calcAverageRatings(this.tour);
  next();
});

//findByIdAndUpdate
//findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();

  // console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function(next) {
  await this.r.constructor.calcAverageRatings(this.r.tour);
  next();
});

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
