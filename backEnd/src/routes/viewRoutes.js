const express = require('express');
const router = express.Router();

const { getTour, getLoginForm } = require('../controllers/viewsController');
// const { protect } = require('../controllers/authControllers');

router.get('/tour/:slug', getTour);
router.get('/login', getLoginForm);



module.exports = router;
