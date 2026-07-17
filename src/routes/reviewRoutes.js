const express = require('express');
const router = express.Router();

const {getReviews, createReview} =require('../controllers/reviewControllers')

router.route('/').get(getReviews);
router.route('/newReview').post(createReview);

module.exports = router;
