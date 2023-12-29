/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const Book = require('../models');

module.exports = function (app) {
  app
    .route('/api/books')
    .get(async (req, res) => {
      try {
        const books = await Book.find({});
        if (!books) {
          res.send([])
          return 
        }
        const formData = books.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            comments: book.comments,
            commentsCount: book.comments.length,
          };
        });
        res.send(formData)
        return 
      } catch (error) {
        res.send([]);
      }
    })

    .post(async (req, res) => {
      let title = req.body.title;
      if (!title) {
        return res.send('Missing required field');
      }
      const newBook = new Book({ title, comments: [] });
      try {
        await newBook.save();
        res.json({ title: newBook.title, _id: newBook._id });
      } catch (error) {
        res.json('Error saving book: ' + error.message);
      }
    })

    .delete(async (req, res) => {
      try {
        const deleted = await Book.deleteMany()
        console.log('Deleted book: ' + deleted);
        res.send('Deleted book: ' + deleted);
      } catch (error) {
        res.send('Error deleting book: ' + error.message);
      }
    });

  app
    .route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      try {
        const book = await Book.findById(bookid);
        res.send({
          _id: book._id,
          title: book.title,
          comments: book.comments,
          commentsCount: book.comments.length,
        })
      } catch (error) {
        res.send('no book exists');
      }
    })

    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment){
        return res.send("Missing required field comment")
      }
      try {
        let book = await Book.findById(bookid);
        book.comments.push(comment)
        book = await book.save()
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
          commentsCount: book.comments.length,
        })
      } catch (error) {
        res.send("No book exists")
      }
    })

    .delete(async (req, res) => {
      let bookid = req.params.id;
      try {
        const deleted = await Book.findByIdAndDelete(bookid)
        if(!deleted){
          throw new Error("No book exists")
        }
        res.send("Delete succesfull")
      } catch (error) {
        res.send("No book exists")
      }
    });
};
