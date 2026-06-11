const express = require('express');
const router = express.Router();

const { aliasTopTours } = require('../middleware/aliasTopTours');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats
} = require('../controllers/tourController');

// topTours router & add alias top tours middleware
router.route('/top-5-cheep').get(aliasTopTours, getAllTours);

// sats router
router.route('/tour-stats').get(getTourStats);

// CRUD routers
router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
