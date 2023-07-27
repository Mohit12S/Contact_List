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

// let's Make the code cleaner using async and await
module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        });
        
        let users = await User.find({});
            
        return res.render('home',{
            title : "Codeial | Home",
            posts : posts,
            all_users : users
        })
    }
    catch(err){
        console.log('Error',err);
        return;
    }
}

