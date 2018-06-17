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
        res.send({ error:'invalid id' });
      }
      const newPost = req.body;
      const newId = store.posts.length;
      if(newPost.name.trim().length == 0 || newPost.url.trim().length == 0){
        res.send({error : 'invalid name or url'});
      }
      store.posts[newId] = newPost;
      res.status(200).send(store.posts);
    },
    removePost : function(req, res, store){
      const id = req.params.postId;
      if(id < 0 || id > store.posts.length){
        console.log("invalid id");
        res.send({error:'invalid id'});
      }
      store.posts.splice(id,0);
      console.log('deleted post');
      res.status(200).send(store.posts);
    }
}
