DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;

-- tells mysql that we are going to start interacting with library_db
USE library_db;

-- create table named authors--
-- 3 columns: id, firstName, lastName --
CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL
);

-- create table named books--
-- 3 columns: id, title, coverPhoto, authorId--
-- foreign key will be the authorId- means you can't change the data in this column--
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  coverPhoto VARCHAR(255),
  authorId INT NOT NULL,
  FOREIGN KEY (authorId) REFERENCES authors(id) ON DELETE CASCADE
);

-- create table named notes--
-- 3 columns: id, note, bookId--
-- foreign key will be the bookId- means you can't change the data in this column--
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note VARCHAR(255) NOT NULL,
  bookId INT NOT NULL,
  FOREIGN KEY (bookId) REFERENCES books(id)
);

-- the inserted data can actually go in its own file called seeds.sql--
-- insert the values into the firstName and lastName columns in the authors table--
INSERT INTO authors (firstName, lastName) VALUES ('J. K.', 'Rowling');
INSERT INTO authors (firstName, lastName) VALUES ('Mark', 'Twain');

-- insert the values into the title,authorId, and coverPhoto columns in the books table--
INSERT INTO books (title, authorId, coverPhoto) VALUES ("Harry Potter and the Sorcerer\'s Stone", 1, 'https://m.media-amazon.com/images/I/41lnLrvBnML.jpg');
INSERT INTO books (title, authorId, coverPhoto) VALUES ('Harry Potter and the Chamber of Secrets', 1, 'https://m.media-amazon.com/images/I/51OZerWcGCL.jpg');

-- select the columns firstName, lastName, and title--
-- using authors table and books table--
-- join data based on authors.id and books.authorId columns--
SELECT firstName, lastName, title 
FROM authors
INNER JOIN books
ON authors.id = books.authorId
