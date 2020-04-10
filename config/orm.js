const connection = require('./connection');

class ORM { 
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

  getAllInnerJoin(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol) {
    // 'SELECT firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorsId'
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length)} FROM ?? INNER JOIN ?? ON ??.?? = ??.??`;
    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
  }

  //create method called getOneBook to make a query to the database
  getOne(tableInput, colToSearch, valOfCol){
    const queryString = "SELECT * FROM ?? WHERE ?? = ?"
    return this.connection.query(queryString, [tableInput, colToSearch, valOfCol])
  }

  // create method called addBooks to make a query to the database
  add(tableInput, colToSearch, valOfCol){
    const queryString = "SELECT * FROM ?? WHERE ?? = ?";
    return this.connection.query(queryString, [tableInput, colToSearch, valOfCol]);
  }

  delete(table, columns, value){
    const queryString = 'DELETE FROM ?? WHERE ??=?';
    // 'DELETE FROM cats WHERE id=1'
    console.log(queryString);

    return this.connection.query(queryString, [table, columns, value])
  }
}

module.exports = new ORM(connection);

// const test = new ORM(connection);
// test.innerJoin(['firstName', 'lastName', 'title', 'coverPhoto'], 'authors', 'books', 'id', 'authorId')
// .then(results => console.log(results))
// .catch(err => console.log(err))
