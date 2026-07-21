const TourModel = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAllTours = catchAsync(async (req, res, next) => {
  // execute the query, filter w query i wrote
  const features = new APIFeatures(TourModel.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await TourModel.findById(req.params.id).populate(
    'reviews'
  );
  if (!tour) {
    return next(new AppError('this tour not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await TourModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
});

// not update password
exports.updateTour = factory.updateOne(TourModel);

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) {
//     return next(new AppError('this tour not found', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });
exports.deleteTour = factory.deleteOne(TourModel);

// aggregation pipeline: syntax {{}} wired!
// match => group => sort => result
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await TourModel.aggregate([
    // any items
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      // i need items be these
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      // sort items
      $sort: { avgPrice: 1 } // 1 eq aces
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = Number(req.params.year); // 2021
  const plan = await TourModel.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { numToursStarts: -1 }
    },
    { $limit: 12 }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});
