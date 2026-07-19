const express = require('express');
const router = express.Router();

const reviewRouter = require('../routes/reviewRoutes');
const { aliasTopTours } = require('../middleware/aliasTopTours');
// const { createReview } = require('../controllers/reviewControllers');
const {
  protect,
  restrictTo
} = require('../controllers/authControllers');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan
} = require('../controllers/tourController');

// nested routes
// POST /tour/345fgf/reviews
// GET /tour/5gg5367/reviews
// GET /tour/4567ff3/reviews/5677gg

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

// more organize from prev code 
app.use('/:tourId/reviews', reviewRouter);

// CRUD routers
router
  .route('/')
  .get(protect, getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

// topTours router & add alias top tours middleware
router.route('/top-5-cheep').get(aliasTopTours, getAllTours);

// sats router
router.route('/tour-stats').get(getTourStats);

// monthly plan router
router.route('/monthly-plan/:year').get(getMonthlyPlan);

module.exports = router;
