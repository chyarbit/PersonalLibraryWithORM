// install dependencies
// need mysql because of the db file
const mysql = require('mysql');
// need util because of the promisify
const util = require('util');

// create connection using mysql's createConnection method
// identify the db to be used
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'schema'
  });

// connect using mysql's connect method
connection.connect();

// we give connection.query access to promises
// i.e. .then() and .catch()
connection.query = util.promisify(connection.query);

// export this file as connection so it can be referenced by other files as a require
module.exports = connection;

// WITHOUT PROMISIFY
// connection.query('SELECT * FROM books', function(err, results){
//   if(err) throw error
//   console.log(results)
// })

// WITH PROMISIFY - provides access to promises and gives us more control
// connection.query('SELECT * FROM books')
//   .then(results => {
//     console.log(results)
//   })
//   .catch(err => console.log(err))