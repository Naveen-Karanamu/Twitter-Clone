import { SIGN_IN, SIGN_UP } from "./auth.type";

const INITIAL_STATE = {
  user: "650155b70a5ad9b9d13658dd",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case SIGN_IN:
    //     return { ...state,  };
    // case SIGN_UP:
    //     return { ...state,  };
    case SIGN_UP:
      return { ...state, user: action.payload, isLoggedIn: true };
    case SIGN_IN:
      console.log(action.payload);
      return { ...state, user: 2, isLoggedIn: true };
      
    default:
      return { ...state };
  }
};

export default authReducer;
