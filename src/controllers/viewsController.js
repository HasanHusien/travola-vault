const ReviewModel = require("../models/reviewModel");
const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res) => {
  // 1. get tour data from collection
  const tours = await Tour.find();

  console.log(tours);
  // 2. build template

  // 3.render that templat using tour data
  res.status(200).render("overview", {
    title: "all tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1. get data from request
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    select: "review rating user",
  });

  const reviews = await ReviewModel.find({
    tour: tour._id,
  });

  console.log(reviews);


  // 1. build template
  console.log(tour);

  res.status(200).render("tour", {
    title: "the forest hiker tour",
    tour,
  });
});
// refactor

exports.getDetails = (req, res) => {};
