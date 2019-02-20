import { UPDATE_NEW_POST, ADD_POST } from '../actions/types';

const initialState = {
    text: '',
    img: '',
    sage: false,
    imgFile: null,
    board: '',
    thread: '',
    errors: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_NEW_POST:
        return { ...state, ...action.payload };
    case ADD_POST:
        return { ...state, ...initialState };
    default:
        return state;
    }
};
