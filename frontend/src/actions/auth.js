import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formData, callback) => dispatch => {
        axios.post('http://localhost:5000/api/auth/register', formData)
            .then((res) => {
                dispatch({
                    type: AUTH_USER,
                    payload: res.data.token
                });
                localStorage.setItem('token', res.data.token);
                callback();
            })
            .catch((err) => {
                dispatch({
                    type: AUTH_ERROR,
                    payload: err.response.data.error
                });
            });
};

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_USER,
        payload: ''
    };
};

export const signin = (formData, callback) => dispatch => {
    axios.post('http://localhost:5000/api/auth/login', formData)
        .then((res) => {
            dispatch({
                type: AUTH_USER,
                payload: res.data.token
            });
            localStorage.setItem('token', res.data.token);
            callback();
        })
        .catch((err) => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.error
            });
        });
};