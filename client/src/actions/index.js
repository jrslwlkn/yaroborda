import {
    BOARD_LOADING,
    THREAD_LOADING,
    NEW_POST_LOADING,
    NEW_THREAD_LOADING,
    GET_BOARD,
    GET_THREAD,
    UPDATE_NEW_POST,
    UPDATE_NEW_THREAD,
    ADD_POST,
    ADD_THREAD
} from './types';

import Api from '../BordaApi';

const api = new Api();


const setLoading = (what) => {
    switch (what) {
    case 'board':
        return { type: BOARD_LOADING };
    case 'thread':
        return { type: THREAD_LOADING };
    case 'newThread':
        return { type: NEW_THREAD_LOADING };
    case 'newPost':
        return { type: NEW_POST_LOADING };
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

export const addThread = (obj) => dispatch => {
    const errors = [];
    if (obj.text.trim().length < 3) errors.push('Post cannot be so empty.');
    if (obj.title.trim().length === 0) errors.push('New threads (op post) must have a title.');
    if (!obj.imgFile) errors.push('New threads (op post) must contain an image.');

    if (errors.length === 0) {
        dispatch(setLoading('newThread'));

        api.uploadImg(obj.imgFile)
            .then(res => {
                if (res.status === 200) {
                    return {
                        img: res.data.secure_url,
                        img_height: res.data.height,
                        img_width: res.data.width,
                        img_byte_size: res.data.bytes
                    };
                }
            })
            .then(res => {
                const thread = {
                    ...res,
                    title: obj.title,
                    text: obj.text,
                };
                api.addThread(obj.board, thread)
                    .then(_ => {
                        dispatch({ type: ADD_THREAD });
                        window.location.reload();
                    });
            })
            .catch(console.log);
    } else {
        dispatch({
            type: UPDATE_NEW_THREAD,
            payload: { ...obj, errors }
        });
    }
};

export const updateNewThread = (obj) => dispatch => {
    dispatch({
        type: UPDATE_NEW_THREAD,
        payload: { ...obj }
    });
};


export const addPost = (data) => dispatch => {
    console.log('obj in addPost', data);
    const errors = [];
    if (data.text.trim().length < 3) errors.push('Post cannot be so empty.');

    if (errors.length === 0) {
        dispatch(setLoading('newPost'));

        const { imgFile, ...obj } = data;

        if (imgFile !== null) {
            api.uploadImg(imgFile)
                .then(res => {
                    console.log('pic res', res);
                    if (res.status === 200) {
                        return {
                            img: res.data.secure_url,
                            img_height: res.data.height,
                            img_width: res.data.width,
                            img_byte_size: res.data.bytes
                        };
                    }
                })
                .then(res => {
                    console.log('before add', { ...res, ...obj });
                    api.addPost(obj.board, obj.thread, { ...res, ...obj })
                        .then(_ => {
                            dispatch({ type: ADD_POST });
                        });
                })
                .catch(console.log);
        } else {
            api.addPost(obj.board, obj.thread, obj)
                .then(_ => {
                    dispatch({ type: ADD_POST });
                })
                .catch(console.log);
        }
    } else {
        dispatch({
            type: UPDATE_NEW_POST,
            payload: { ...data, errors }
        });
    }
};

export const updateNewPost = (obj) => dispatch => dispatch({
    type: UPDATE_NEW_POST,
    payload: obj
});
