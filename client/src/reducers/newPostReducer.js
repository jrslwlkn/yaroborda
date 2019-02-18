import { UPDATE_NEW_POST, ADD_POST } from '../actions/types';

const initialState = {
    text: '',
    img: '',
    sage: false,
    img_height: 0,
    img_width: 0,
    img_byte_size: 0,
    board: '',
    thread: ''
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
