// module.exports.profile = function(req,res){
//     res.end('<h1>Users Profile</h1>');
// };

const multer = require('multer');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.likes = function(req,res){
    res.end('<h1>10 Likes</h1>');
}

module.exports.profile = function(req,res){
    User.findById(req.params.id,
    )
    .then(function(user){
        return res.render('user_profile',{
            title : "Home",
            // We didn't choose name as user as it is already present in locals
            profile_user : user
        });
    })
    .catch((err) => console.log("Oops we encountered an err while creating a profile user"))
}

// Updating Our page
module.exports.update = async function(req,res){
    // Update only when user sending the request and the user who is logged in are the same
    if(req.user.id == req.params.id){
        // This is a inbuilt function given by mongoose
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('***MulterError',err);
                }

                // We separetely wrote user.name and cannot pass req.body in find and update because
                // It is multiPart form that's why
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            })
        }
        catch{
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized')
    }
}

// Render the Sign Up page
module.exports.signUp = function(req,res){
    // If user is already Signed Up then don't again show signUp page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    req.flash('success','Sign Up SuccessFully');
    return res.render('users_sign_up',{
        title : "Codiel | Sign-Up"
    });
};

// Render the Sign In Page
module.exports.signIn = function(req,res){
    // If user is already Signed In then don't again show signIn page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    req.flash('success','Sign In SuccessFully');
    return res.render('users_sign_in',{
        title : "Codiel | Sign-In"
    });
};

// Get the Sign Up Data
module.exports.create = function(req,res){
    

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},
    )
    .then(function(user){
        if(!user){
            User.create(req.body,
            )
            .catch(function(err){
                console.log("Error while finding the user during Sign Up");
                return;
            })

            return res.redirect('/users/sign-in');
        }
        else{
            res.redirect('back');
        }
    })
    .catch(function(err){
        console.log("Error while finding the user during Sign Up");
        return;
    }) 


        
};

// Get the Sign In Data
module.exports.createSession = function(req,res){
    req.flash('success','Logged in SuccessFully');
    // ToDo Later
    // Session is created in passport.js
    // If user is authenticated then send it to home page
    return res.redirect('/');
};

module.exports.destroySession = function(req,res){
    // This function is given by Passport.js req.logout()
    
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    })

    req.flash('success','Logged Out SuccessFully');
    res.redirect('/');
}


