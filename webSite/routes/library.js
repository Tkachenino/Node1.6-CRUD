const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const fileMiddleware = require('../middleware/file');
const {upCounter, getCount} = require('../middleware/counter');
const { getFileData } = require("../utils");
const Book = require('../models/Book');

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

router.get('/books', async(req, res) => {
  const books = await Book.find();
  res.render('library/index',
  {
    title: 'Личная библиотека',
    books: books
  })
})

router.get('/books/create', (req, res) => {
  res.render('library/create',
  {
    title: 'Личная библиотека',
    book: {}
  })
})

router.get('/books/update/:id', async(req, res) => {
  const {id} = req.params;
  const book = await Book.findById(id);
  res.render('library/update',
  {
    title: 'Личная библиотека',
    book: book
  })
})

router.post('/books/update/:id', fileMiddleware.single('fileBook'), async(req, res) => {
  try {
    const {id} = req.params;
    const {title, description, authors, fileCover} = req.body;
    const {filename, path: pathFile} = req.file;

    const newBook = new Book({
      title: title,
      description: description,
      authors: authors,
      favorite: false,
      fileCover: fileCover,
      fileName: filename,
      fileBook: pathFile
    });

    await Todo.findByIdAndUpdate(id, newBook);
    res.status(201).redirect('/books');
  } catch (e) {
    console.log(e);
    res.status(404).redirect('/404');
  }
});

router.get('/books/view/:id', async(req, res) => {
  const {id} = req.params;
  const book = await Book.findById(id);
  await upCounter(id);
  const count = await getCount(id);
  res.render('library/view',
  {
    title: 'Личная библиотека',
    book: book,
    count: count
  })
})

router.get('/books/download/:id', async(req, res) => {
  const {id} = req.params;
  const book = await Book.findById(id);
  

  try {
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="filename.pdf"'
    });

    res.end(`data:'application/pdf;base64,${book.fileBook.data}`);
  } catch(e) {
    console.log(e);
    res.status.apply(404).redirect('/404');

  }
})

router.post('/books/create', fileMiddleware.single('fileBook'), async(req, res) => {
  try {
    const {title, description, authors, fileCover} = req.body;
    const fileBook = getFileData(req.file);
    const {filename} = req.file;


    const newBook = new Book({
      title: title,
      description: description,
      authors: authors,
      favorite: false,
      fileCover: fileCover,
      fileName: filename,
      fileBook: fileBook
    });

    await newBook.save();
    res.status(201).redirect('/books');

  } catch (e) {
    console.log(e);
    res.status(404).redirect('/404');
  }
})

router.post('/books/delete/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const filter = { _id: id };
    await Book.deleteOne(filter);
    res.status(201).redirect('/books');
  } catch (e) {
    res.status(404).redirect('/404');
  }
});

module.exports = router;