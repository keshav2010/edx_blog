module.exports =
{
    getComments : function(req, res, store){
      res.status(200).send(store.posts[req.params.postId].comments);
    },
    addComment : function(req, res, store){
      var newComment = req.body.text;
      if((newComment.trim()).length == 0 || store.posts.length == 0)
      {
        console.log("failed to add comment, invalid");
        res.status(400).send({error:'failed to add comment'});
        return;
      }
      store.posts[req.params.postId].comments.push(newComment);
      console.log("added comment");
      res.status(200).send(store.posts[req.params.postId]);
    },
    updateComment : function(req, res, store){
      var id = req.params.commentId;
      var newComment = req.body.text;
      if(newComment.trim().length == 0){
        console.log("invalid comment, empty spaces not allowed");
        res.status(400).send({error: 'invalid comment'});
        return;
      }
      store.posts[req.params.postId].comments[id] = newComment;
      console.log("updated comment");
      res.status(200).send(store.posts[req.params.postId].comments);
    },
    removeComment : function(req, res, store){
      console.log(" Total Comment : " + store.posts[req.params.postId].comments.length);
      var id = req.params.commentId;
      if(store.posts.comments.length-1 < id || id < 0){
        console.log("invalid commentId");
        res.status(400).send({error:'invalid commentId'});
        return;
      }
      store.posts.comments.splice(id,1);
      console.log(" Total Comment After: " + store.posts[req.params.postId].comments.length);
      res.status(200).send(store.posts[req.params.postId].comments);
    }
}
