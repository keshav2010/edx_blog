module.exports =
{
    getPosts : function(req, res, store){
      res.status(200).send(store.posts);
    },
    addPost : function(req, res, store){
      var newPost ={
        name : req.body.name,
        url : req.body.url,
        text : req.body.text,
        comments : []
      }
      store.posts.push(newPost);
      res.status(201).send(store.posts);
    },
    updatePost : function(req, res, store){
      const id = req.params.postId;
      if(id < 0 || id > store.posts.length){
        console.log("invalid id");
        res.status(400).send({ error:'invalid id' });
        return;
      }
      var newPost = req.body;
      if(newPost.name.trim().length == 0 || newPost.url.trim().length == 0){
        res.status(400).send({error : 'invalid name or url'});
        return;
      }
      store.posts[id] = newPost;
      res.status(200).send(store.posts);
    },
    removePost : function(req, res, store){
      const id = req.params.postId;
      if(id < 0 || id > store.posts.length){
        console.log("invalid id");
        res.status(400).send({error:'invalid id'});
        return;
      }
      store.posts.splice(id,1);
      console.log('deleted post');
      res.status(200).send(store.posts);
    }
}
