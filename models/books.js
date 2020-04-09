// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

// declare a class called Book
class Book{
    getAllBooks(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol){
        return orm.selectAll("books",[...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
    }
    getOneBook(tableInput, colToSearch, valOfCol){
        return orm.create("books", [tableInput, colToSearch, valOfCol])
    }
};

module.exports = new Book();