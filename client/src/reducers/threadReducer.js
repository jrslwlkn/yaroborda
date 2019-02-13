import { GET_THREAD, THREAD_LOADING } from '../actions/types';

const initialState = {
    opPost: {},
    posts: [],
    threadIsLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case THREAD_LOADING:
        return {
            ...state,
            threadIsLoading: true,
        };
    case GET_THREAD:
        return {
            ...state,
            threadIsLoading: false,
            ...action.payload
        };
    default:
        return state;
    }
};
