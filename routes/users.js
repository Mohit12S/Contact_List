const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controllers');

// Now whenever the url is on user's profile this file will get triggered
router.get('/profile' , usersController.profile);
router.get('/likes' , usersController.likes);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create' , usersController.create);

module.exports = router;