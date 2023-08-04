const express = require('express');

const router = express.Router();
console.log('Router loaded');

const homeController = require('../controllers/home_controller');

router.get('/' , homeController.home);
// If someone goes on users profile below line will get triggered
router.use('/users' , require('./users'));
router.use('/about' , require('./about'));
router.use('/posts' , require('./posts'));
router.use('/comments' , require('./comments'));

// For any furthur routes access from below
// router.use('/xyz' , require('./xyz'));

// Adding Routes for api
router.use('/api' , require('./api'));

module.exports = router;