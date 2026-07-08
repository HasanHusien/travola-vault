const express = require('express');
const router = express.Router();

const { getAllUsers, updateMe } = require('../controllers/userController');
const {
  signup,
  login,
  protect,
  forgetPassword,
  restPassword,
  updatePassword
} = require('../controllers/authControllers');

router.route('/').get(getAllUsers);

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/forgetPassword').post(forgetPassword);
router.route('/restPassword/:token').patch(restPassword);

// updating password for logged in users
router.route('/updatePassword').patch(protect, updatePassword);

// updating user data for logged in users
router.route('/updateMe').patch(protect, updateMe);

//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
