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
  
  const initialState = {
    loading: false,
    tweets: [],
    tweet: null,
    tweetsFromFollowedUsers: [],
    error: null,
  };
  
  const tweetReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_TWEET_REQUEST:
      case GET_ALL_TWEETS_REQUEST:
      case GET_TWEET_BY_ID_REQUEST:
      case UPDATE_TWEET_REQUEST:
      case DELETE_TWEET_REQUEST:
      case GET_TWEETS_FROM_FOLLOWED_USERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case CREATE_TWEET_SUCCESS:
        return {
          ...state,
          loading: false,
          tweet: action.payload,
        };
  
      case GET_ALL_TWEETS_SUCCESS:
        return {
          ...state,
          loading: false,
          tweets: action.payload,
        };
  
      case GET_TWEET_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          tweet: action.payload,
        };
  
      case UPDATE_TWEET_SUCCESS:
        return {
          ...state,
          loading: false,
          tweet: action.payload,
        };
  
      case DELETE_TWEET_SUCCESS:
        return {
          ...state,
          loading: false,
          tweets: state.tweets.filter((tweet) => tweet._id !== action.payload),
        };
  
      case GET_TWEETS_FROM_FOLLOWED_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          tweetsFromFollowedUsers: action.payload,
        };
  
      case CREATE_TWEET_FAILURE:
      case GET_ALL_TWEETS_FAILURE:
      case GET_TWEET_BY_ID_FAILURE:
      case UPDATE_TWEET_FAILURE:
      case DELETE_TWEET_FAILURE:
      case GET_TWEETS_FROM_FOLLOWED_USERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default tweetReducer;
  