// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

// declare a class called Book
class Book{
    getAllBooks(){
        return orm.selectAll("books")
    }
    getOneBook(colToSearch, valOfCol){
        return orm.getOneBook("books", [title, coverPhoto, authorId], valOfCol)
    }
    addBook(columns,values){
        return orm.addBook("books",columns,values)
    }
};

module.exports = new Book();