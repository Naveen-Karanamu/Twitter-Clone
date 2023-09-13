import { combineReducers } from "redux";

import authReducer from "./Auth/auth.reducer";
import tweetReducer from "./Tweet/tweet.reducer";

const rootReducer = combineReducers({authReducer, tweetReducer});

export default rootReducer;