const express = require('express');
const router = express.Router();

const { aliasTopTours } = require('../middleware/aliasTopTours');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour
} = require('../controllers/tourController');

// add alias top tours middleware
router.route('/top-5-cheep').get(aliasTopTours, getAllTours);

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
