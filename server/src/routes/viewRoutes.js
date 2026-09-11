const express = require('express');
const router = express.Router();

// middleware for uploading files
const multer = require('multer');
const upload = multer({ dest: 'public/img/users' });

const {
  getTour,
  getLoginForm,
  updateUserData
} = require('../controllers/viewsController');
const { isLoggedIn } = require('../controllers/authControllers');

router.use(isLoggedIn);

router.get('/login', getLoginForm);
router.get('/tour/:slug', getTour);

// router.post('/submit-user-data',updateUserData)
router.post('/update-user-data', upload.single('photo'), updateUserData);

module.exports = router;
