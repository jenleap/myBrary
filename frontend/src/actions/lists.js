import axios from 'axios';
import { GET_LISTS, GET_LIST, CREATE_LIST, REMOVE_BOOK_FROM_LIST, RENAME_LIST, DELETE_LIST  } from './types';

import { readBooks } from '../util/format';

const url = 'http://jenniferleap.com/mybrary-api/api/lists';


export const getLists = (token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.get(url, config)
        .then((res) => {
            console.log(res.data.lists)
            dispatch({
                type: GET_LISTS,
                payload: res.data.lists
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const getList = (listId, token, callback) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.get(`${url}/${listId}`, config)
        .then((res) => {
           // console.log(res.data)
           let formatted = {
               ...res.data,
               books: readBooks(res.data.books)
           };
            dispatch({
                type: GET_LIST,
                payload: formatted
            });
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const createList = (input, token) => dispatch => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const listData = {
            name: input
        };

        axios.post(url, listData, config)
            .then((res) => {
                //console.log(res.data);
                dispatch({
                    type: CREATE_LIST,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
};

export const addBooktoList = (listId, bookId, token, callback) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const data = {
        bookId: bookId
    };


    axios.post(`${url}/${listId}`, data, config)
        .then((res) => {
            //console.log(res.data);
            dispatch({
                type: GET_LIST,
                payload: res.data
            });
            callback();
        })
        .catch((err) => {
            console.log(err);
        });
}

export const removeBookFromList = (listId, bookId, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.delete(`${url}/${listId}/${bookId}`, config)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: REMOVE_BOOK_FROM_LIST,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const renameList = (listId, name, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const data = {
        name: name
    };

    axios.put(`${url}/${listId}`, data, config)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: RENAME_LIST,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const deleteList = (listId, token, callback) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.delete(`${url}/${listId}`, config)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: DELETE_LIST,
                payload: listId
            });
            callback();
        })
        .catch((err) => {
            console.log(err);
        });
}