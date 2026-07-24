const express = require('express');
const router = express.Router({ mergeParams: true });
// for accept more then her params %% set in Router margParams : true

const {
  getReview,
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourAndUserIds
} = require('../controllers/reviewControllers');

const {
  protect,
  restrictTo
} = require('../controllers/authControllers');

router.use(protect);

router
  .route('/')
  .get(getReviews)
  .post(restrictTo('user'), setTourAndUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
