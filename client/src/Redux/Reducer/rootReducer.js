import { combineReducers } from "redux";

import authReducer from "./Auth/auth.reducer";

const rootReducer = combineReducers({authReducer});

export default rootReducer;