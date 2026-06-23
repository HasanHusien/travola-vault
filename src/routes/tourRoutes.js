const express = require('express');
const router = express.Router();

const { aliasTopTours } = require('../middleware/aliasTopTours');
const { protect } = require('../controllers/authControllers');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan
} = require('../controllers/tourController');

// CRUD routers
router
  .route('/')
  .get(protect, getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// topTours router & add alias top tours middleware
router.route('/top-5-cheep').get(aliasTopTours, getAllTours);

// sats router
router.route('/tour-stats').get(getTourStats);

// monthly plan router
router.route('/monthly-plan/:year').get(getMonthlyPlan);
module.exports = router;
