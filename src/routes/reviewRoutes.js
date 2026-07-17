const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authControllers');
const {
  getReviews,
  createReview
} = require('../controllers/reviewControllers');

router.route('/').get(getReviews);
router.route('/newReview').post(protect, restrictTo('user'), createReview);

module.exports = router;
