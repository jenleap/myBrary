import { GET_BOOKS, ADD_BOOK, READ_BOOK, FINISH_BOOK, REMOVE_BOOK } from '../actions/types';

const INITIAL_STATE = {
    books: [],
    reading: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_BOOKS:
            //console.log(action.payload);
            return action.payload
        case ADD_BOOK:
            return {
                ...state,
                books: [
                    ...state.books,
                    action.payload
                ]
            }
        case READ_BOOK: 
            return {
                ...state,
                reading: [
                    ...state.reading,
                    action.payload
                ]
            }
        case FINISH_BOOK:
            let currentlyReading = state.reading.filter(b => b._id != action.payload._id);
            return {
                ...state,
                reading: currentlyReading
            }
        case REMOVE_BOOK:
            return action.payload;
        default:
            return state;
    }
};