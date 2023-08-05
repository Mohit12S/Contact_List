const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

const crypto = require('crypto');

// Tell Passport to use a new Strategy
passport.use(new googleStrategy({
        clientID : '1057156967928-me6ra8flc4g57n83s48huv4igtmleie6.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback',
    },

    function(accessToken , refreshToken , profile , done){
        User.findOne({email : profile.emails[0].value},
        )
        .then(function(user){
            console.log(profile);

            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                })
                .then(function(user){
                    return done(null,user);
                })
                .catch(function(err){
                    console.log("we have got an error while signing in a user",err);
                    return;
                    
                })
            }
        })
        .catch(function(err){
            if(err){
                console.log("Error in google Auth",err);
                return;
            }
        })
    }
))




