// Create web server
const express = require('express');
const app = express();

// Create data store
const comments = [];

// Create a comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length,
    text: req.body.text
  };
  comments.push(comment);
  res.status(201).json(comment);
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment
app.get('/comments/:id', (req, res) => {
  const comment = comments[req.params.id];
  if (!comment) {
    res.status(404).send('Comment not found');
    return;
  }
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const comment = comments[req.params.id];
  if (!comment) {
    res.status(404).send('Comment not found');
    return;
  }
  comment.text = req.body.text;
  res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const comment = comments[req.params.id];
  if (!comment) {
    res.status(404).send('Comment not found');
    return;
  }
  comments.splice(req.params.id, 1);
  res.status(204).send();
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});