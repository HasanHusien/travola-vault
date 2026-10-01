const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const {
  getCheckoutSession,
  getBooking,
  updateBooking,
  deleteBooking,
  createBooking,
  getAllBooking
} = require('../controllers/bookingController');

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);
router.use(restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(getAllBooking)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
