import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchUsers, followUser, unfollowUser, getUserInfo } from "../../../Redux/Reducer/User/user.action"; // Import unfollowUser action
import { FaUserCircle } from "react-icons/fa";
import People from "./People";

const FollowingPage = ({ users, loading, error, currentUser, followUser, unfollowUser, fetchUsers }) => {
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [currUser, setCurrUser] = useState({_id:"", following:[]});
  
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrUser = async () => {
      const userData = await dispatch(getUserInfo(currentUser.userId));
      setCurrUser(userData);
      console.log("user",currUser);
    };
    
    fetchCurrUser();
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
  //   const filteredUsers = users.filter((user) => currentUser.following.includes(user._id));
  //   setUsersToDisplay(filteredUsers);
  // }, [users, currentUser]);
    const filteredUsers = users.filter((user) => currUser?.following.includes(user._id));
    setUsersToDisplay(filteredUsers);
  }, [users, currUser]);

  const handleUnfollow = (userId) => {
    // console.log(currentUser._id);
    // unfollowUser(userId, currentUser._id); 
    unfollowUser(userId, currUser?._id); 
    setUsersToDisplay((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(usersToDisplay)) {
    return <div>No users to display.</div>; 
  }

  return (
    <div className="">
      <div>
        <div>
         <People />
          <div className="flex flex-col gap-4">
            {usersToDisplay.map((user) => (
              <div className="border-2 rounded-lg p-4 flex flex-row-reverse justify-between items-center" key={user._id}>
                <div className="flex gap-4">
                  <button
                    className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md text-white font-semibold"
                    onClick={() => handleUnfollow(user._id)}
                  >
                    Unfollow
                  </button>
                </div>
                <div className="flex gap-4 justify-start items-center">
                  <div className="text-blueT-100">
                    <FaUserCircle className="w-8 h-8" />
                  </div>
                  <div className="text-xl font-semibold">
                    {user.username}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
  loading: state.userReducer.loading,
  error: state.userReducer.error,
  // currentUser: state.authReducer.user,
  currentUser: JSON.parse(localStorage.getItem('userObj')) ,
});

const mapDispatchToProps = {
  fetchUsers,
  followUser,
  unfollowUser, 
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingPage);
