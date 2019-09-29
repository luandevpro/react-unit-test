import { GET_USER } from '../constants/ActionTypes';

const initialState = null;

const useUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default useUser;
