// module.exports.home = function(req,res){
//     return res.end('<h1>Express is up for Codeial</h1>');
// }

// module.exports.home = function(req,res){
//     console.log(req.cookies);
//     res.cookie('user_id' , 25);
//     return res.render('home',{
//         title : "Home"
//     });
// }
const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(
    )
    .then(function(posts){
        return res.render('home',{
            title : "Codeial | Home",
            posts : posts
        })
    })
    .catch((err) => console.log("Oops we caught an err"));
}

