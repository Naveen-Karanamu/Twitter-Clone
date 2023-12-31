import axios from "axios";

import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_REQUEST,
  SIGN_UP_REQUEST,
  LOGOUT 
} from "./auth.type";

export const signIn = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_REQUEST });
    const User = await axios({
      method: "POST",
      url: `http://localhost:3001/auth/signin`,
      // url: `https://twitter-clone-be.vercel.app/auth/signin`,
      data: { credentials: userData },
    });
    // console.log(User.data.userId);

    localStorage.setItem("user", JSON.stringify({ token: User.data.token }));

    return dispatch({
      type: SIGN_IN,
      payload: User.data,
      status: "registered",
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error, status: "ERROR" });
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_UP_REQUEST });
    const User = await axios({
      method: "POST",
      url: `http://localhost:3001/auth/signup`,
      // url: `https://twitter-clone-be.vercel.app/auth/signin`,
      data: { credentials: userData },
    });

    localStorage.setItem("user", JSON.stringify({ token: User.data.token }));

    return dispatch({
      type: SIGN_UP,
      payload: User.data,
      status: "registered",
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error, status: "ERROR" });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  dispatch({ type: LOGOUT });
};
