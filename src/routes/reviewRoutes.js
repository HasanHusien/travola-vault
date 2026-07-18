const express = require('express');
const router = express.Router();

const {
  getReviews,
  createReview
} = require('../controllers/reviewControllers');
const {
  protect,
  restrictTo
} = require('../controllers/authControllers');

router.route('/').get(getReviews);
router
  .route('/newReview')
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
