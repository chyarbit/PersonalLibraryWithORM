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

  // Helper function for SQL syntax.
  // Let's say we want to pass 3 values into the mySQL query.
  // In order to write the query, we need 3 question marks.
  // This helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
  // ["?", "?", "?"].join(', ') => "?, ?, ?";
  printQuestionMarks(numberOfValues){
    const questionMarks = [];

    for (var i = 0; i < numberOfValues; i++) {
      questionMarks.push("?");
    }

    return questionMarks.join(', ');
  }

  // declare a method called selectAll that takes in a parameter called table (table will eventually be books or notes)
  selectAll(table){
    const queryString = "SELECT * FROM ??";
    return this.connection.query(queryString, [table])
  }

  // create method called getAllBooks to make a query to the database

  getAllBooks(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol) {
    // 'SELECT firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorsId'
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length)} FROM ?? INNER JOIN ?? ON ??.?? = ??.??`;
    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
  }

  //create method called getOneBook to make a query to the database
  getOneBook(tableInput, colToSearch, valOfCol){
    const queryString = "SELECT * FROM ?? WHERE ?? = ?"
    return this.connection.query(queryString, [tableInput, colToSearch, valOfCol])
  }

  // create method called getBookNotes to make a query to the database
  getBookNotes(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol){
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length)} FROM ?? INNER JOIN ?? ON ??.?? = ??.??`;
    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
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

  delete(table, columns, value){
    const queryString = 'DELETE FROM ?? WHERE ??=?';
    // 'DELETE FROM cats WHERE id=1'
    console.log(queryString);

    return this.connection.query(queryString, [table, columns, value])
  }
}

module.exports = new ORM(connection);

const test = new ORM(connection);
test.innerJoin(['firstName', 'lastName', 'title', 'coverPhoto'], 'authors', 'books', 'id', 'authorId')
.then(results => console.log(results))
.catch(err => console.log(err))
