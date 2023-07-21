// module.exports.profile = function(req,res){
//     res.end('<h1>Users Profile</h1>');
// };

module.exports.likes = function(req,res){
    res.end('<h1>10 Likes</h1>');
}

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : "Home"
    });
}

