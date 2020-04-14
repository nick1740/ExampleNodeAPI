const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
if (process.env.ENV === 'Test') {
  console.log('This is a Test');
  const db = mongoose.connect('mongodb://localhost:27017/booksAPI_Test');
} else {
  console.log('This is not a Test');
  const db = mongoose.connect('mongodb://localhost:27017/booksAPI-prod');
}

// const db = mongoose.connect('mongodb://localhost:27017/booksAPI');
const port = process.env.PORT || 3000;
const Book = require('./models/bookModels');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API');
});

app.server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

module.exports = app;
