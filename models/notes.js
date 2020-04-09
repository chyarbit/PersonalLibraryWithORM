// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

// declare a class called Book
class Note{
    getBookNotes(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol){
        return orm.selectAll("notes", [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
    }
    getOne(columns,values){
        return orm.create("notes", columns, values)
    }
    remove(columns, condition){
        return orm.delete('cats', columns, condition)
      }
};

module.exports = new Note();