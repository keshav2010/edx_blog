const express = require('express');
const bodyParser = require('body-parser');
const postManager = require('./routes/posts');
const commentManager = require('./routes/comments');
const morgan = require('morgan');
var app = express();
//middlewares
app.use(bodyParser.json());
app.use(morgan("default"));
//In memory storage
var store =
{
  posts:[]
}

//entire posts
app.get('/posts',(req, res)=>{
  postManager.getPosts(req, res, store);
});
app.post('/posts', (req, res)=>{
  postManager.addPost(req, res, store);
});
app.put('/posts/:postId', (req, res)=>{
  postManager.updatePost(req, res, store);
});
app.delete('/posts/:postId', (req, res)=>{
  postManager.removePost(req, res, store);
});

//comments
app.get('/posts/:postId/comments', (req, res)=>{
  commentManager.getComments(req, res, store);
});
app.post('/posts/:postId/comments', (req, res)=>{
  commentManager.addComment(req, res, store);
});
app.put('/posts/:postId/comments/:commentId', (req, res)=>{
  commentManager.updateComment(req, res, store);
});
app.delete('/posts/:postId/comments/:commentId', (req, res)=>{
  commentManager.removeComment(req, res, store);
});

app.listen(3000, ()=>{
  console.log("application started on port : 3000");
})
