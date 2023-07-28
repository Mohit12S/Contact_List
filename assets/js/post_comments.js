{
    // Method to submit the form data for a new Comment using Ajax
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : newCommentForm.serialize(),
                success : function(data){
                    let newComment = newCommentDom(data.data.comment);
                    $('#comments-list>ul').prepend(newComment);
                },error : function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // Method to create Comment in DOM

    let newCommentDom = function(comment){
        return $(`<li id="comment-${comment._id}>
        <p>
            <small>
                <a href="/comments/destroy/${comment._id}">X</a>
            </small>

            ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
        </p>
    </li>`)
    }



    createComment();
    
}