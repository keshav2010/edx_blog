module.exports =
{
    getComments : function(req, res, store){
      res.status(200).send(store.posts.comments);
    },
    addComment : function(req, res, store){
      const newId = store.posts.comments.length;
      const newComment = req.body;
      if(newComment.trim().length == 0)
      {
        console.log("failed to add comment, invalid");
        res.send({error:'failed to add comment'});
      }
      store.posts.comments[newId] = req.body;
      console.log("added comment");
      res.status(200).send(store.posts.comments);
    },
    updateComment : function(req, res, store){
      const id = req.params.commentId;
      const newComment = req.body;
      if(newComment.trim().length == 0){
        console.log("invalid comment, empty spaces not allowed");
        res.send({error: 'invalid comment'});
      }
      store.posts.comments[id] = newComment;
      console.log("updated comment");
      res.status(200).send(store.posts.comments);
    },
    removeComment : function(req, res, store){
      console.log(" Total Comment : " + store.posts.comments.length);
      const id = req.params.commentId;
      if(store.posts.comments.length-1 < id || id < 0){
        console.log("invalid commentId");
        res.send({error:'invalid commentId'});
      }
      store.posts.comments.splice(id,0);
      console.log(" Total Comment After: " + store.posts.comments.length);
      res.status(200).send(store.posts.comments);
    }
}
