const express = require('express');
const checkAuth = require('../middleware/check-auth');
const { getLists, getList, createList, addBooktoList, removeBookFromList, renameList, deleteList } = require('../controllers/lists');

const router = express.Router();

router.get('/', checkAuth, getLists);
router.post('/', checkAuth, createList);

router.get('/:listId', checkAuth, getList);
router.post('/:listId', checkAuth, addBooktoList);
router.put('/:listId', checkAuth, renameList);
router.delete('/:listId', checkAuth, deleteList);

router.delete('/:listId/:bookId', checkAuth, removeBookFromList);

module.exports = router;