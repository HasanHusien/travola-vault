const express = require('express');
const router = express.Router();

const { getTour, getLoginForm } = require('../controllers/viewsController');
const { isLoggedIn } = require('../controllers/authControllers');

router.use(isLoggedIn);

router.get('/login', getLoginForm);
router.get('/tour/:slug', getTour);

module.exports = router;
