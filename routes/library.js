const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const fileMiddleware = require('../middleware/file');
const uidGenerator = require('node-unique-id-generator')

const urlencodedParser = bodyParser.urlencoded({ extended: false });


let library = [{
  id: "np1",
  title: "Колбок",
  description: "Сказка",
  authors: "Народ",
  favorite: "Любимые",
  fileCover: 'Картон',
  fileName: "'колобок.pdf'"
}];

class Book {
  constructor(title = 'none', description = 'none', authors = 'none', favorite = 'none', fileCover = 'none', fileName = 'none',  fileBook = 'none', id = uidGenerator.generateUniqueId()) {
      this.id = id,
      this.title = title,
      this.description = description,
      this.authors = authors,
      this.favorite = favorite,
      this.fileCover = fileCover,
      this.fileName = fileName
      this.fileBook = fileBook
  }
}


router.get('/', (req, res) => {
  const books = library;
  res.json(books);
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const book = library.find(el => el.id === id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json("book | not found");
  }
})

router.post('/', fileMiddleware.single('book-pdf'), (req, res) => {
  const {title, description, authors, favorite, fileCover} = req.body;

  if (req.file) {
    const {filename, path} = req.file;
    const newBook = new Book(title, description, authors, favorite, fileCover, filename, path);
    library.push(newBook);
    console.log(library)

    res.status(201).json(newBook);
  } else {
    res.status(404).json();
  }
})

router.get('/:id/download', (req, res) => {
  const {id} = req.params;
  console.log(id)
  console.log(library)
  const book = library.find(i => i.id === id);
  console.log(book)
  const filePath = path.join(book.fileBook);

  console.log(filePath)

  res.download(filePath, book.filename, err => {
    if (err) {
      res.status.apply(404).json();
    }
  })
})

router.put('/:id', fileMiddleware.single('book-pdf'), (req, res) => {
  const {title, description, authors, favorite, fileCover} = req.body;
  let fileName = '';
  let fileBook = '';
  if (req.file) {
    fileName = req.file.filename;
    fileBook = req.file.path;
  }
 
  const {id} = req.params;
  const idx = library.findIndex(el => el.id == id);
  
  const file = path.join(library[idx].fileBook);
  try {
    fs.unlinkSync(file)
  } catch(err) {
    console.error(err)
  }

  if (idx !== -1) {
    library[idx] = {
          ...library[idx], title, description, authors, favorite, fileCover, fileName, fileBook
      };
      res.json(library[idx]);
  } else {
      res.status(404).json("book | not found");
  }
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const idx = library.findIndex(el => el.id === id);

  if (idx !== -1) {
    const file = path.join(library[idx].fileBook);

    try {
      fs.unlinkSync(file)
      //file removed
    } catch(err) {
      console.error(err)
    }

    library = library.filter(el => el.id !== id);
      res.json('ok');
  } else {
      res.status(404);
      res.json("book | not found");
  }
});

module.exports = router;