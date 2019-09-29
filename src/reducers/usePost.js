import { GET_POST } from '../constants/ActionTypes';

const initialState = null;

const usePost = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return [...action.payload];
    default:
      return state;
  }
};

export default usePost;
