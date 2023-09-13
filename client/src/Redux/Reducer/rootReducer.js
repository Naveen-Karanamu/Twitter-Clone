import { combineReducers } from "redux";

import authReducer from "./Auth/auth.reducer";
import tweetReducer from "./Tweet/tweet.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({ authReducer, tweetReducer, userReducer });

export default rootReducer;
