import { GET_POST, GET_USER, GET_COMMENT } from '../constants/ActionTypes';

export const getPost = data => {
  return {
    type: GET_POST,
    payload: data,
  };
};

export const getUser = data => {
  return {
    type: GET_USER,
    payload: data,
  };
};

export const getComment = data => {
  return {
    type: GET_COMMENT,
    payload: data,
  };
};
