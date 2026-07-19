const express = require('express');
// for accept more then her params %% set in Router margParams : true
const router = express.Router({mergeParams:true});

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
