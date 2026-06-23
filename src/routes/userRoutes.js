const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/userController');
const { signup, login ,protect} = require('../controllers/authControllers');

router.route('/').get(getAllUsers);

router.route('/signup').post(signup);
router.route('/login').post(login);

//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
