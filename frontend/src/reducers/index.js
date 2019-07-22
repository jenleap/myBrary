import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import books from './books';
import lists from './lists';
import currentList from './currentList';

export default combineReducers({
    auth,
    books,
    lists,
    currentList,
    form: formReducer
});