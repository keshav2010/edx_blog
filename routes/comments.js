module.exports =
{
    getComments : function(req, res, store){
      res.status(200).send(store.posts[req.params.postId].comments);
    },
    addComment : function(req, res, store){
      var newComment = req.body.text;
      //if postID is invalid
      if(req.params.postId < 0 || req.params.postId+1 > store.posts.length ){
        res.status(400).send({error:'no post exist, failed to update comment'});
        return;
      }
      if((newComment.trim()).length == 0 || store.posts.length == 0)
      {
        console.log("failed to add comment, invalid comment");
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
      //if posts count is 0 or postID is invalid
      if(store.posts.length == 0 || (req.params.postId < 0 || req.params.postId+1 > store.posts.length) ){
        res.status(400).send({error:'no post exist, failed to update comment'});
        return;
      }
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
      var id = req.params.commentId;
      //if posts count is 0
      if(store.posts.length == 0){
        res.status(400).send({error:'no post exist'});
        return;
      }
      //if post exist, but no comment
      if(store.posts[req.params.postId].comments.length == 0){
        res.status(400).send({error:'no comment to remove'});
        return;
      }
      //if id is invalid
      if(store.posts[req.params.postId].comments.length-1 < id || id < 0){
        console.log("invalid commentId");
        res.status(400).send({error:'invalid commentId'});
        return;
      }
      store.posts[req.params.postId].comments.splice(id,1);
      res.status(200).send(store.posts[req.params.postId]);
    }
}
