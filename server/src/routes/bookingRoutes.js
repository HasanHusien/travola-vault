const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const { getCheckoutSession } = require('../controllers/bookingController');

router.get('/checkout-session/:tourId', protect, getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

module.exports = router;
