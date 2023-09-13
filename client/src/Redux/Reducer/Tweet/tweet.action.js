import axios from "axios";
import {
  GET_TWEETS_FROM_FOLLOWED_USERS_REQUEST,
  GET_TWEETS_FROM_FOLLOWED_USERS_SUCCESS,
  GET_TWEETS_FROM_FOLLOWED_USERS_FAILURE,
  CREATE_TWEET_REQUEST,
  CREATE_TWEET_SUCCESS,
  CREATE_TWEET_FAILURE,
  GET_ALL_TWEETS_REQUEST,
  GET_ALL_TWEETS_SUCCESS,
  GET_ALL_TWEETS_FAILURE,
  GET_TWEET_BY_ID_REQUEST,
  GET_TWEET_BY_ID_SUCCESS,
  GET_TWEET_BY_ID_FAILURE,
  UPDATE_TWEET_REQUEST,
  UPDATE_TWEET_SUCCESS,
  UPDATE_TWEET_FAILURE,
  DELETE_TWEET_REQUEST,
  DELETE_TWEET_SUCCESS,
  DELETE_TWEET_FAILURE,
} from "./tweet.type";

// Get tweets from followed users
export const getTweetsFromFollowedUsers = () => async (dispatch) => {
  dispatch({ type: GET_TWEETS_FROM_FOLLOWED_USERS_REQUEST });
  try {
    const response = await axios.get("/api/tweet/following");
    dispatch({
      type: GET_TWEETS_FROM_FOLLOWED_USERS_SUCCESS,
      payload: response.data.tweets,
    });
  } catch (error) {
    dispatch({ type: GET_TWEETS_FROM_FOLLOWED_USERS_FAILURE, payload: error });
  }
};

// Create a new tweet
export const createTweet = (content, user) => async (dispatch) => {
  dispatch({ type: CREATE_TWEET_REQUEST });
  try {
    const response = await axios.post("/api/tweets/new", { content, user });
    dispatch({ type: CREATE_TWEET_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_TWEET_FAILURE, payload: error });
  }
};

// Get all tweets
export const getAllTweets = () => async (dispatch) => {
  dispatch({ type: GET_ALL_TWEETS_REQUEST });
  try {
    const response = await axios.get("/api/tweets/getall");
    dispatch({ type: GET_ALL_TWEETS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ALL_TWEETS_FAILURE, payload: error });
  }
};

// Get a tweet by ID
export const getTweetById = (tweetId) => async (dispatch) => {
  dispatch({ type: GET_TWEET_BY_ID_REQUEST });
  try {
    const response = await axios.get(`/api/tweets/get/${tweetId}`);
    dispatch({ type: GET_TWEET_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TWEET_BY_ID_FAILURE, payload: error });
  }
};

// Update a tweet by ID
export const updateTweet = (tweetId, content) => async (dispatch) => {
  dispatch({ type: UPDATE_TWEET_REQUEST });
  try {
    const response = await axios.put(`/api/tweets/update/${tweetId}`, {
      content,
    });
    dispatch({ type: UPDATE_TWEET_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_TWEET_FAILURE, payload: error });
  }
};

// Delete a tweet by ID
export const deleteTweet = (tweetId) => async (dispatch) => {
  dispatch({ type: DELETE_TWEET_REQUEST });
  try {
    await axios.delete(`/api/tweets/delete/${tweetId}`);
    dispatch({ type: DELETE_TWEET_SUCCESS, payload: tweetId });
  } catch (error) {
    dispatch({ type: DELETE_TWEET_FAILURE, payload: error });
  }
};
