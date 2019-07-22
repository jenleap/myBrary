const express = require('express');
const checkAuth = require('../middleware/check-auth');
const { getBooks, addBook, readBook, finishBook, removeBook } = require('../controllers/books');

const router = express.Router();

router.get('/', checkAuth, getBooks);
router.post('/', checkAuth, addBook);

router.delete('/:bookId', checkAuth, removeBook);

router.get('/reading/:bookId', checkAuth, readBook);
router.get('/reading/:bookId/:finished', checkAuth, finishBook);

module.exports = router;