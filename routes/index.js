const express = require('express');

const router = express.Router();
console.log('Router loaded');

const homeController = require('../controllers/home_controller');

router.get('/' , homeController.home);
// If someone goes on users profile below line will get triggered
router.use('/users' , require('./users'));
router.use('/about' , require('./about'));

// For any furthur routes access from below
// router.use('/xyz' , require('./xyz'));

module.exports = router;