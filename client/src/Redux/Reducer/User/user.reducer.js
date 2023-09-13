// userReducer.js
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
  } from './user.type';
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_USER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
      case GET_USER_FAILURE:
        return {
          ...state,
          user: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  