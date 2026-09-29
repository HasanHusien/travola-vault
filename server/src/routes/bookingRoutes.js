const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authControllers');
const { getCheckoutSession } = require('../controllers/bookingController');

router.get('checkout-session/:tourId', protect, getCheckoutSession);

module.exports = router;
