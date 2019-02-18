import { UPDATE_NEW_THREAD, ADD_THREAD } from '../actions/types';

const initialState = {
    title: '',
    text: '',
    imgFile: null,
    board: '',
    newThreadIsLoading: false,
    errors: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_NEW_THREAD:
        return { ...state, ...action.payload };
    case ADD_THREAD:
        return { ...state, ...initialState };
    default:
        return state;
    }
};
