import axios from "axios";
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

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (userData) => ({
  type: GET_USER_SUCCESS,
  payload: userData,
});

export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const getUserInfo = (objectId) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(
      `http://localhost:3001/user/get/${objectId}`
    );
    const userData = response.data;
    dispatch(getUserSuccess(response.data));
    return userData;
  } catch (error) {
    dispatch(getUserFailure(error));
  }
};

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());

    try {
      const response = await fetch('http://localhost:3001/user/getall');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const users = await response.json();
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

export const followUserRequest = () => ({
  type: FOLLOW_USER_REQUEST,
});

export const followUserSuccess = (userId) => ({
  type: FOLLOW_USER_SUCCESS,
  payload: userId,
});

export const followUserFailure = (error) => ({
  type: FOLLOW_USER_FAILURE,
  payload: error,
});

export const followUser = (userId) => async (dispatch, getState) => {
  const currentUser = getState().authReducer.user;
  const currentUserId = currentUser._id;

  dispatch(followUserRequest());

  try {
    await axios.post(`http://localhost:3001/user/follow/${userId}`, {
      user: currentUser,
    });

    dispatch(followUserSuccess(userId));
  } catch (error) {
    dispatch(followUserFailure(error));
  }
};

export const unfollowUserRequest = () => ({
  type: UNFOLLOW_USER_REQUEST,
});

export const unfollowUserSuccess = (userId) => ({
  type: UNFOLLOW_USER_SUCCESS,
  payload: userId,
});

export const unfollowUserFailure = (error) => ({
  type: UNFOLLOW_USER_FAILURE,
  payload: error,
});

export const unfollowUser = (userId, currentUserId) => async (dispatch) => {
  dispatch(unfollowUserRequest());

  try {
    const response = await axios.post(`http://localhost:3001/user/unfollow/${userId}`, {
      user: currentUserId, 
    });
    const updatedUser = response.data;

    dispatch(unfollowUserSuccess(userId));
  } catch (error) {
    dispatch(unfollowUserFailure(error));
  }
};