const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controllers');

// Now whenever the url is on user's profile this file will get triggered

router.get('/profile/:id' , passport.checkAuthentication , usersController.profile);
router.post('/update/:id' , passport.checkAuthentication , usersController.update);

router.get('/likes' , usersController.likes);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create' , usersController.create);

// Using passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    // If there is some failure in authenticating then again send it to Sign In page
    {failureRedirect : '/users/sign-in'}
),usersController.createSession);

router.get('/sign-out' , usersController.destroySession);

router.get('/auth/google' , passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect : '/users/sign-in'}) , usersController.createSession);

module.exports = router;