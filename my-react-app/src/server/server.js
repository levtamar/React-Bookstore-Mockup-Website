const express = require('express');
const { books } = require('./Books');

const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get('/api/books', (req, res) => {
  res.send(books);
  console.log("serverrr")
  console.log(books)
});
app.post('/api/books', (req, res) => {
  if (!req.body || !req.body.title) {
    return res.status(400).json({ error: 'Book must have a title' });
  }
  books.push(req.body);
  res.status(201).json(req.body);
});

app.delete('/api/books/:title', (req, res) => {
  const titleToDelete = req.params.title;
  const index = books.findIndex(book => book.title === titleToDelete);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books.splice(index, 1);
  res.status(200).json({ message: 'Book deleted' });
});

// app.delete('/api/books/:title', (req, res) => {
//   console.log("הגעתי למחיקה");
//   const originalLength = books.length;
//   // סינון כל הספרים חוץ מהספר למחיקה
//   if (books.length < originalLength) {
//     res.status(200).json({ message: 'Book deleted' });
//   } else {
//     res.status(404).json({ error: 'Book not found' });
//   }
// });


app.put('/api/books/:title', (req, res) => {
  books[books.findIndex(book => book.title === req.params.title)] = req.body;
  res.status(200).json({ message: 'Book updated successfully', book:  req.body });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
