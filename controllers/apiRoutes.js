const express = require("express");
const router = express.Router();
const books = require("../models/books.js");

  router.get('/books', (req, res) => {
   books.getAllBooks()
    .then(results => res.json(results))
    .catch(error => res.json(error))
  });

  router.get('/book/:name', (req, res) => {
    const bookName = req.params.name;
    books.getOneBook(bookName)
    .then(results => res.json(results))
    .catch(error => res.json(error))
  })

  router.get('/book/notes/:name', (req, res) => {
    const bookName = req.params.name;

    books.getBookNotes(bookName)
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
  })

  router.post('/book/new', (req, res) => {
    const { title, coverPhoto, authorId } = req.body;

    books.addBook(title, coverPhoto, authorId)
    .then(() => res.status(200).json(true))
    .catch(error => res.status(500).json(error))
  });

  router.post('/book/note', (req, res) => {
    const { note, bookId } = req.body;

    books.addBookNote(note, bookId)
    .then(() => res.status(200).json(true))
    .catch(error => res.status(500).json(error))
  })

  router.delete('/note/:id', (req, res) => {
    books.deleteNote(req.params.id)
    .then(() => res.status(200).json(true))
    .catch(error => res.status(500).json(error))
  })

module.exports = router;