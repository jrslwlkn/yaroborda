import {
    GET_ERRORS,
    BOARD_LOADING,
    THREAD_LOADING,
    GET_BOARD,
    GET_THREAD,
    CHANGE_THREADS_SLICE,
    LINK_NOT_FOUND,
    ADD_THREAD,
    ADD_POST,
    SET_THREAD_PIC,
    SET_POST_PIC,
    CLEAR_NEW_POST,
    CLEAR_NEW_THREAD,
    SET_THREAD_SLICE,
    CLEAR_THREAD_SLICE,
    GET_BOARD_OPS
} from './types';

import Api from '../BordaApi';

const api = new Api();


const setLoading = (what) => {
    switch (what) {
    case 'board':
        return { type: BOARD_LOADING };
    case 'thread':
        return { type: THREAD_LOADING };
    default:
        return {};
    }
};


export const getBoard = (board) => dispatch => {
    dispatch(setLoading('board'));
    api.getBoard(board).then(OPs => {
        if (!OPs) return [];
        return OPs.map(op => api.getLastPost(board, op.id)
            .then(lastPost => {
                if (!lastPost) return { op, lastPost: {} };
                return { op, lastPost };
            }));
    })
        .then(threads => Promise.all(threads))
        .then(threads => dispatch({
            type: GET_BOARD,
            payload: {
                url: board,
                threads
            }
        }));
};

export const getThread = (board, thread, opPost) => dispatch => {
    dispatch(setLoading('thread'));
    api.getAllPosts(board, thread)
        .then(posts => {
            if (!posts || posts.length < 0) return [];
            return posts;
        })
        .then(posts => Promise.all(posts))
        .then(posts => dispatch({
            type: GET_THREAD,
            payload: {
                opPost,
                url: thread,
                posts
            }
        }));
};
