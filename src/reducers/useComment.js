import { GET_COMMENT } from '../constants/ActionTypes';

const initialState = null;

const useComment = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT:
      return [...action.payload];
    default:
      return state;
  }
};

export default useComment;
