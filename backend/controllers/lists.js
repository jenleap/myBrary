const List = require('../models/list');
const User = require('../models/user');

exports.getLists = (req, res) => {
    const userId = req.userData.userId;
    User.findById(userId)
        .populate('lists')
        .then((user) => {
            res.status(200).json({
                lists: user.lists
            });
        });
}

exports.getList = (req, res) => {
    List.findById(req.params.listId)
        .populate('books')
        .then((list) => {
            res.status(200).json(list);
        })
}


exports.createList = (req, res) => {
    const userId = req.userData.userId;

    const newList = new List({
        name: req.body.name,
        books: []
    });

    newList.save((err, list) => {
        if (err) {
            res.status(500).send(err);
        }
        User.findById(userId, (err, user) => {
            if (err) {
                res.status(500).send(err);
            }
            user.lists.push(list._id);
            user.save((err, user) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(list);
            })
        });
    });
}

exports.addBooktoList = (req, res) => {
    List.findById(req.params.listId)
        .then((list) => {
            if (list.books.includes(req.body.bookId)) {
                res.status(201).json({
                    message: "Book already exists in list."
                });
            } else {
                list.books.push(req.body.bookId);
                list.save((err, list) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    List.findById(list._id)
                        .populate('books')
                        .then((updatedList) => {
                            res.status(200).json(updatedList);
                        })
                })
            }   
        })
}

exports.removeBookFromList = (req, res) => {
    List.findById(req.params.listId)
        .then((list) => {
                let newList = list.books.filter(b => {
                    return b != req.params.bookId
                });
                list.books = newList;
                list.save((err, list) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    List.findById(list._id)
                        .populate('books')
                        .then((updatedList) => {
                            res.status(200).json(updatedList);
                        })
                })
        })
}

exports.renameList = (req, res) => {
    console.log(req.body);
    List.findById(req.params.listId)
        .then((list) => {
                list.name = req.body.name;
                list.save((err, list) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    List.findById(list._id)
                        .populate('books')
                        .then((updatedList) => {
                            res.status(200).json(updatedList);
                        })
                })
        })
}

exports.deleteList = (req, res) => {
    List.findByIdAndRemove(req.params.listId)
        .then(() => {
            res.status(201).json({
                message: "List deleted."
            });
        })
        .catch((err) => {
            console.log(err);
        })
}