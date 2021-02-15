const express = require('express');
const cors = require('cors');
const formData = require("express-form-data");
const uidGenerator = require('node-unique-id-generator')

let library = [{
  id: "np1",
  title: "Колбок",
  description: "Сказка",
  authors: "Народ",
  favorite: "Любимые",
  fileCover: 'Картон',
  fileName: "'колобок.txt'"
}];

class Book {
  constructor(title = 'none', description = 'none', authors = 'none', favorite = 'none', fileCover = 'none', fileName = 'none', id = uidGenerator.generateUniqueId()) {
      this.id = id,
      this.title = title,
      this.description = description,
      this.authors = authors,
      this.favorite = favorite,
      this.fileCover = fileCover,
      this.fileName = fileName
  
  }
}

const app = express();
app.use(cors());
app.use(formData.parse());

app.get('/api/books', (req, res) => {
  const books = library;
  res.json(books);
})

app.get('/api/books/:id', (req, res) => {
  const {id} = req.params;
  const book = library.find(el => el.id === id);
  console.log(book)

  if (book) {
    res.json(book);
  } else {
    res.status(404);
    res.json("book | not found");
  }
})

app.post('/api/books', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body;
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
  library.push(newBook);
  res.status(201);
  res.json(newBook);
})

app.post('/api/user/login', (req, res) => {
  const {id, mail} = req.body;
  res.status(201);
  res.json({ id: id, mail: mail });
})

app.put('/api/books/:id', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body;
  const {id} = req.params;
  const idx = library.findIndex(el => el.id == id);

  if (idx !== -1) {
    library[idx] = {
          ...library[idx], title, description, authors, favorite, fileCover, fileName
      };
      res.json(library[idx]);
  } else {
      res.status(404);
      res.json("book | not found");
  }
});

app.delete('/api/books/:id', (req, res) => {
  const {id} = req.params;
  const idx = library.findIndex(el => el.id === id);

  if (idx !== -1) {
    library = library.filter(el => el.id !== id);
      res.json('ok');
  } else {
      res.status(404);
      res.json("book | not found");
  }
});

app.listen(3000);
