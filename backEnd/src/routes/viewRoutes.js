const express = require('express');
const router = express.Router();

const {
  getTour,
  getLoginForm,
  updateUserData
} = require('../controllers/viewsController');
const { isLoggedIn } = require('../controllers/authControllers');

router.use(isLoggedIn);

router.get('/login', getLoginForm);
router.get('/tour/:slug', getTour);

router.post('/submit-user-data',updateUserData)
module.exports = router;
