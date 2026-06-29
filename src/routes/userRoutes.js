const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/userController');
const {
  signup,
  login,
  protect,
  forgetPassword,
  restPassword
} = require('../controllers/authControllers');

router.route('/').get(getAllUsers);

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/restPassword').post(forgetPassword);
router.route('/forgetPassword').post(restPassword);

//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
