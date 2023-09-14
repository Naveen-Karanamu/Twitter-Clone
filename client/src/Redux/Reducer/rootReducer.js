import { combineReducers } from "redux";

import authReducer from "./Auth/auth.reducer";
import tweetReducer from "./Tweet/tweet.reducer";
import userReducer from "./User/user.reducer";
import imageReducer from "./Image/image.reducer";

const rootReducer = combineReducers({ authReducer, tweetReducer, userReducer, imageReducer });

export default rootReducer;
