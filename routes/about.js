const express = require('express');
const router = express.Router();

const usersController = require('../controllers/about_controller');

// Now whenever the url is on user's profile this file will get triggered
router.get('/profile' , usersController.profile);

module.exports = router;