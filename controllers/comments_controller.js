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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,
    )
    .then(function(comment){
        if(comment.user == req.user.id){
            // We can postId from comment as we have defined it in our Schema 
            let postId = comment.post;
            Comment.deleteOne();

            Post.findByIdAndUpdate(postId,{$pull : {comments : req.params.id}}
            )
            .then((post) =>{return res.redirect('back')})
            .catch((err) => console.log("Oops we found an err while deleting comment from posts arr",err))

        }
        else{
            return res.redirect('back');
        }
    })
    .catch((err) => console.log("Oops we encountered an err while finding comments"))
}

