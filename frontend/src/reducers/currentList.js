import { GET_LIST, REMOVE_BOOK_FROM_LIST, RENAME_LIST } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case GET_LIST:
            return action.payload
        case REMOVE_BOOK_FROM_LIST:
            return action.payload
        case RENAME_LIST:
            return action.payload
        default:
            return state;
    }
};