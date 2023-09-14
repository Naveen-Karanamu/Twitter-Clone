import axios from "axios";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  FOLLOW_USER,
  UNFOLLOW_USER,
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

export const followUser = (userId) => ({
  type: FOLLOW_USER,
  payload: userId,
});

export const unfollowUser = (userId) => ({
  type: UNFOLLOW_USER,
  payload: userId,
});
