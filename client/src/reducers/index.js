import { combineReducers } from 'redux';

import board from './boardReducer';
import thread from './threadReducer';
import newPost from './newPostReducer';
import newThread from './newThreadReducer';

export default combineReducers({
    board,
    thread,
    newPost,
    newThread
});
