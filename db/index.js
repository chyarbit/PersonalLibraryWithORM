// index.js contains all of the methods

// require the connection.js file to access the database- so index.js is now considered a model because it handles the database request
const connection = require('./connection');

// create class called DB
class DB { 
  // using a constructor function with the parameter of connection (which references the connection.js file)
  constructor(connection){
    // this constructor function has a connection property because it is referencing the connection.js file
    this.connection = connection;
  }

  // create method called getAllBooks to make a query to the database
  getAllBooks(firstName, lastName, title, coverPhoto, authors, books, id, authorId){
    const queryString = "SELECT ?? FROM ?? INNER JOIN ?? ON ??.?? = ??.??";
    return this.connection.query(queryString, [firstName, lastName, title, coverPhoto.join(",")], authors, books, authors, id, books, authorId)
  
  }
  //return this.connection.query('SELECT firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorId')

  //create method called getOneBook to make a query to the database
  getOneBook(bookTitle){

    return this.connection.query('SELECT books.id, firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorId WHERE books.title=?', [bookTitle])
  }

  // create method called getBookNotes to make a query to the database
  getBookNotes(bookTitle){
 
    return this.connection.query('SELECT notes.id, note FROM notes INNER JOIN books ON books.id = notes.bookId WHERE books.title=?', [bookTitle])
  }

  // create method called addBooks to make a query to the database
  addBook(title, coverPhoto, authorId){
    const queryString = "INSERT INTO books SET ?"
    return this.connection.query('INSERT INTO books SET ?', 
     {
       title,
       authorId,
       coverPhoto
     })
  }

  // create method called addBooks to make a query to the database
  addBookNote(note, bookId){
    return this.connection.query('INSERT INTO notes SET ?', 
     {
       note,
       bookId
     })
  }

  deleteNote(noteId){
   return this.connection.query('DELETE FROM notes WHERE id=?', 
     [noteId])
}
}

// exports this file as a new instance of the DB class with the parameter connection to give us access all the methods inside the class
// module.exports = new DB(connection);