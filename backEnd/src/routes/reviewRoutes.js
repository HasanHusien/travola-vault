const express = require("express");

const {} = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authControllers");

const {
  createReview,
  setTourUserIds,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");

const router = express.Router({ mergeParams: true });

// router.use(protect);

router
  .route("/")
  .get(getAllReviews)
  .post(restrictTo("user"), setTourUserIds, createReview);

router
  .route("/:id")
  .get(getReview)
  .patch(restrictTo("user", "admin"), updateReview)
  .delete(restrictTo("user", "admin"), deleteReview);

module.exports = router;
