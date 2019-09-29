import { combineReducers } from 'redux';
import usePost from './usePost';
import useUser from './useUser';
import useComment from './useComment';

const reducers = combineReducers({
  posts: usePost,
  currentUser: useUser,
  comments: useComment,
});

export default reducers;
