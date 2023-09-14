// userReducer.js
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./user.type";

const initialState = {
  user: null,
  loading: false,
  error: null,
  followers: [],
  users: [],
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
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        followers: [...state.followers, action.payload],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        followers: state.followers.filter(
          (followerId) => followerId !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
