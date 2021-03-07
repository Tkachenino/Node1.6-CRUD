const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../middleware/file');
const Book = require('../../models/Book');

let library = [];

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

router.get('/:id/download', (req, res) => {
  const {id} = req.params;
  const book = library.find(i => i.id === id);
  const filePath = path.join(book.fileBook);

  res.download(filePath, book.filename, err => {
    if (err) {
      res.status.apply(404).json();
    }
  })
})

router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
  const {title, description, authors, favorite, fileCover} = req.body;

  if (req.file) {
    const {filename, path: pathFile} = req.file;
    const newBook = new Book(title, description, authors, favorite, fileCover, filename, pathFile);
    library.push(newBook);
    
    res.status(201).json(newBook);
  } else {
    res.status(404).json();
  }
})


router.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const {title, description, authors, favorite, fileCover} = req.body;
  
  if (req.file) {
    const {filename, path: pathFile} = req.file;
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
          ...library[idx], title, description, authors, favorite, fileCover, fileName: filename, fileBook: pathFile
      };
      res.json(library[idx]);
  }
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