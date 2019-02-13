import { GET_BOARD, BOARD_LOADING } from '../actions/types';

const initialState = {
    threads: [],
    boardIsLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case BOARD_LOADING:
        return {
            ...state,
            boardIsLoading: true,
        };
    case GET_BOARD:
        return {
            ...state,
            boardIsLoading: false,
            ...action.payload
        };
    default:
        return state;
    }
};
