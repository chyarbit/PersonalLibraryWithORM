// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

// declare a class called Book
class Note{
    getBookNotes(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol){
        return orm.getBookNotes("notes", [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
    }
    addBookNote(columns,values){
        return orm.addBookNote("notes", columns,values)
    }
    delete(columns, condition){
        return orm.delete('cats', columns, condition)
      }
};

module.exports = new Note();