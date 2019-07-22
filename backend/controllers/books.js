const Book = require('../models/book');
const User = require('../models/user');

const { getReading } = require('../util/helpers');

exports.getBooks = (req, res) => {
    const userId = req.userData.userId;
    User.findById(userId)
        .populate('books')
        .then((user) => {
            /* let currentlyReading = user.books.filter(b => {
                for (read of b.readings) {
                    if (!read.finished) {
                        return b;
                    }
                }
            }); */
            let currentlyReading = getReading(user.books);
            res.status(200).json({
                books: user.books,
                reading: currentlyReading
            });
        });
}


exports.addBook = (req, res) => {
    const userId = req.userData.userId;
    const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors,
        cover: req.body.cover,
        snippet: req.body.snippet,
        description: req.body.description,
        readings: []
    });

    newBook.save((err, book) => {
        if (err) {
            res.status(500).send(err);
        }
        User.findById(userId, (err, user) => {
            if (err) {
                res.status(500).send(err);
            }
            user.books.push(book._id);
            user.save((err, user) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(book);
            })
        });
    });
}

exports.removeBook = (req, res) => {
    const userId = req.userData.userId;
    User.findById(userId)
        .populate('books')
        .then((user) => {
            let newBooks = user.books.filter(b => {
                return b._id != req.params.bookId;
            });
            user.books = newBooks;
            let newLists = user.lists.filter(l => {
                return l._id != req.param.bookId;
            });
            user.lists = newLists;
            user.save((err, user) => {
                if (err) {
                    res.status(500).send(err);
                }
                let currentlyReading = getReading(user.books);
                res.status(200).json({
                    books: user.books,
                    reading: currentlyReading
                });
            })
            
        });
}

exports.readBook = (req, res) => {
    Book.findById(req.params.bookId)
        .then((book) => {
            let today = Date.now();
            let read = {
                started: today
            };
            book.readings.push(read);
            book.save((err, book) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(book);
            })
        })
}

exports.finishBook = (req, res) => {
    Book.findById(req.params.bookId)
        .then((book) => {
            let today = Date.now();
            book.readings[book.readings.length - 1].finished = today;

            if (req.params.finished == "DNF") {
                book.readings[book.readings.length - 1].DNF = true;
            }
            
            book.save((err, book) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(book);
            })
        })
}