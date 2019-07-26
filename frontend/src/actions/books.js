import axios from 'axios';
import { GET_BOOKS, ADD_BOOK, READ_BOOK, FINISH_BOOK, REMOVE_BOOK } from './types';

import { readBooks } from '../util/format';

const url = 'http://localhost:5001/api/books';


export const getBooks = (token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.get(url, config)
        .then((res) => {
            //console.log(res.data.books)
            let formattted = {
                books: readBooks(res.data.books),
                reading: readBooks(res.data.reading)
            };
            dispatch({
                type: GET_BOOKS,
                payload: formattted
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const addBook = (bookData, token, callback) => dispatch => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.post(url, bookData, config)
            .then((res) => {
                dispatch({
                    type: ADD_BOOK,
                    payload: res.data
                });
                callback();
            })
            .catch((err) => {
                console.log(err);
            });
};

export const removeBook = (bookId, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.delete(`${url}/${bookId}`, config)
        .then((res) => {
            dispatch({
                type: REMOVE_BOOK,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const readBook = (bookId, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.get(`${url}/reading/${bookId}`, config)
        .then((res) => {
            dispatch({
                type: READ_BOOK,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const finishBook = (bookId, finishState, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.get(`${url}/reading/${bookId}/${finishState}`, config)
        .then((res) => {
            dispatch({
                type: FINISH_BOOK,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
