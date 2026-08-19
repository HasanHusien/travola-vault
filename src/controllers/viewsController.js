const TourModel = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res) => {
  // 1. get tour data from collection
  const tours = await TourModel.find();

  // 2. build template

  // 3.render that templat using tour data
  res.status(200).render("overview", {
    title: "all tours",
    tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "the forest hiker tour",
  });
};
