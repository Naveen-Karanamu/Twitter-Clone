// userReducer.js
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./user.type";

const initialState = {
  user: null,
  loading: false,
  error: null,
  following: [],
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
    case FOLLOW_USER_REQUEST:
    case UNFOLLOW_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        followedUsers: [...state.followedUsers, action.payload],
      };
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        followedUsers: state.followedUsers.filter(
          (userId) => userId !== action.payload
        ),
      };
    case FOLLOW_USER_FAILURE:
    case UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
