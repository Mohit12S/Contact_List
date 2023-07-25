const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    // We are sending a hidden post._id that we are recieving in req
    Post.findById(req.body.post,
    )
    .then(function(post){
        Comment.create({
            content : req.body.content,
            post : req.body.post,
            user : req.user._id
        },
        )
        .then(function(comment){
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        })
        .catch((err) => console.log("Oops we encountered a error in creating comment"));
    })
    .catch((err) => console.log("Oops we encountered a error in finding post"));
}

