import { SIGN_IN, SIGN_UP, LOGOUT } from "./auth.type";

const INITIAL_STATE = {
  loading: false,
  error: null,
  status: null,
  user: {
    _id: "6504652299ec91d789879dea",
    username: "naveen",
    fullname: "naveen",
    email: "naveen@gmail.com",
    createdAt: { $date: { $numberLong: "1694586295604" } },
    updatedAt: { $date: { $numberLong: "1694689117816" } },
    following: ["6502fb14922233b9d42e370d"],
    tweets: [],
  },
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case SIGN_IN:
    //     return { ...state,  };
    // case SIGN_UP:
    //     return { ...state,  };
    case SIGN_UP:
      // console.log(action.payload);
      localStorage.setItem('userObj', JSON.stringify(action.payload));
      return { ...state, user: action.payload, isLoggedIn: true };
    case SIGN_IN:
      localStorage.setItem('userObj', JSON.stringify(action.payload));
      return { ...state, user: action.payload, isLoggedIn: true };
    case LOGOUT:
      localStorage.removeItem("userObj")
      return { ...state, user: null, status: null, isLoggedIn: true };

    default:
      return { ...state };
  }
};

export default authReducer;
