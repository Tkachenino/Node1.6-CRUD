const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const fileMiddleware = require('../middleware/file');
const Book = require('../models/Book');

let library = [
  {
  id: 'id',
  title: "title",
  description: "description",
  authors: "authors",
  favorite: "favorite",
  fileCover: "",
  fileName: "",
  fileBook: ""
},
{
  id: 'id2',
  title: "title2",
  description: "description2",
  authors: "authors2",
  favorite: "favorite2",
  fileCover: "",
  fileName: "",
  fileBook: ""
},
];

router.get('/', (req, res) => {
  res.render('index',
  {
    title: 'Твоя личная библиотека у тебя всегда под рукой'
  })
})

router.get('/404', (req, res) => {
  res.render('error/404',
  {
    title: 'Склад ошибок',
  })
})

router.get('/books', (req, res) => {
  res.render('library/index',
  {
    title: 'Личная библиотека',
    books: library
  })
})



router.get('/books/create', (req, res) => {
  res.render('library/create',
  {
    title: 'Личная библиотека',
    book: {}
  })
})

router.get('/books/update/:id', (req, res) => {
  const {id} = req.params;
  const book = library.find(el => el.id === id);
  res.render('library/update',
  {
    title: 'Личная библиотека',
    book: book
  })
})

router.post('/books/update/:id', fileMiddleware.single('fileBook'), (req, res) => {
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
      res.status(302).redirect('/books');
    }
 } else {
      res.status(404).redirect('/404');
  }
});

router.get('/books/view/:id', (req, res) => {
  const {id} = req.params;
  const book = library.find(el => el.id === id);
  res.render('library/view',
  {
    title: 'Личная библиотека',
    book: book
  })
})

router.get('/books/download/:id', (req, res) => {
  const {id} = req.params;
  const book = library.find(i => i.id === id);
  const filePath = path.join(book.fileBook);


  res.download(filePath, book.fileName, err => {
    if (err) {
      res.status.apply(404).redirect('/404');
    }
  })
})

router.post('/books/create', fileMiddleware.single('fileBook'), (req, res) => {
  const {title, description, authors, favorite, fileCover} = req.body;

  if (req.file) {
    const {filename, path} = req.file;
    const newBook = new Book(title, description, authors, favorite, fileCover, filename, path);
    library.push(newBook);
    
    res.status(201).redirect('/books');
  } else {
    res.status(404).redirect('/404');
  }
})

router.post('/books/delete/:id', (req, res) => {
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
    res.status(201).redirect('/books');
  } else {
      res.status(404).redirect('/404');
  }
});

module.exports = router;