import { SIGN_IN, SIGN_UP } from "./auth.type";

const INITIAL_STATE = {
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case SIGN_IN:
    //     return { ...state,  };
    // case SIGN_UP:
    //     return { ...state,  };
    case SIGN_UP:
    case SIGN_IN:
      console.log(action.payload.userId);
      return { ...state, user: action.payload, isLoggedIn: true };
      
    default:
      return { ...state };
  }
};

export default authReducer;
