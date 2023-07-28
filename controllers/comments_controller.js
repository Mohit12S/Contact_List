const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    // We are sending a hidden post._id that we are recieving in req
    try{
        let post = await Post.findById(req.body.post)

        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            })

            post.comments.push(comment);
            post.save();

            if (req.xhr){
                // // Similar for comments to fetch the user's id!
                // comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success','Comments Created successFully');
            res.redirect('/');
        }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id)
        if(comment.user == req.user.id){
            // We can postId from comment as we have defined it in our Schema 
            let postId = comment.post;
            Comment.deleteOne();

            let post = await Post.findByIdAndUpdate(postId,{$pull : {comments : req.params.id}})

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success','Comment deleted successFully');
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}

