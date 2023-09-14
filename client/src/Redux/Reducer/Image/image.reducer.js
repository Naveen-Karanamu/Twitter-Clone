import { UPLOAD_IMAGE_SUCCESS, UPDATE_TWEET_WITH_IMAGE } from "./image.type";

const initialState = {
  images: [],
  tweets: [], 
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    case UPDATE_TWEET_WITH_IMAGE:
      
      const updatedTweets = state.tweets.map((tweet) => {
        if (tweet._id === action.payload.tweetId) {
          return {
            ...tweet,
            imageURL: action.payload.imageURL,
          };
        }
        return tweet;
      });

      return {
        ...state,
        tweets: updatedTweets,
      };
    default:
      return state;
  }
};

export default imageReducer;
