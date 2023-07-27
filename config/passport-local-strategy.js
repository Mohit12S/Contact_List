const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true
    },
    function(req,email,password,done){
        // Find a User and Establish it's identity
        User.findOne({email : email},
        )
        .then(function(user){
            // If user is not present or invalid password then return
            if(!user || user.password != password){
                // console.log('Invalid username/Password');
                req.flash('error','Invalid username/Password');
                return done(null,false);
            }

            // If all is correct then authenticate that user
            return done(null , user);
        })
        .catch(function(err){
            if(err){
                req.flash('error',err);
                return done(err);
            }
        })

    }

));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,
    )
    .then(function(user){
        return done(null,user);
    })
    .catch(function(err){
        if(err){
            if(err){
                console.log('Error in finding user --> passport');
                return done(err);
            }
        }
    })
});

// Check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // If the user is signed in then pass the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // If the user is not signed In
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session and we are just sending this to the 
        // locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;