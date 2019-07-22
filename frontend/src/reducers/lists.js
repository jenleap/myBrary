import { GET_LISTS, CREATE_LIST, DELETE_LIST } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case GET_LISTS:
            console.log(action.payload);
            return action.payload
        case CREATE_LIST:
            return [
                ...state, 
                action.payload
            ]
        case DELETE_LIST:
            return state.filter(l => l._id != action.payload);
        default:
            return state;
    }
};