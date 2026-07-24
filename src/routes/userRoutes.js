const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  updateMe,
  deleteMe,
  getMe,
  getUser,
  createUser
} = require('../controllers/userController');
const {
  signup,
  login,
  protect,
  forgetPassword,
  restPassword,
  updatePassword
} = require('../controllers/authControllers');

// instead of adding protect middleware for all routes
router.use(protect);

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/forgetPassword').post(forgetPassword);
router.route('/restPassword/:token').patch(restPassword);

router.route('/me').get(protect, getMe, getUser);

// updating user data for logged in users
router.route('/updateMe').patch(updateMe);
router.route('/deleteMe').delete(deleteMe);

// updating password for logged in users
router.route('/updatePassword').patch(updatePassword);

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
