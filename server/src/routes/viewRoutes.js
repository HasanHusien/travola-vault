const express = require('express');
const router = express.Router();

const {
  getTour,
  getMyTours
} = require('../controllers/viewsController');
const { isLoggedIn, protect } = require('../controllers/authControllers');

router.use(isLoggedIn);
router.get('/tour/:slug', getTour);

router.get('/my-tours', protect, getMyTours);

// router.post('/submit-user-data',updateUserData)
// router.post('/update-user-data', updateUserData);

module.exports = router;
