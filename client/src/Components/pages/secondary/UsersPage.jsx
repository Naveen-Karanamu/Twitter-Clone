import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers, followUser } from "../../../Redux/Reducer/User/user.action";
import SideNav from "./SideNav";
import { FaUserCircle } from "react-icons/fa";
import People from "./People";

const UserList = ({ users, loading, error, currentUser, followUser, fetchUsers }) => {
  const [usersToDisplay, setUsersToDisplay] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => !currentUser.following.includes(user._id));
    setUsersToDisplay(filteredUsers);
  }, [users, currentUser]);

  const handleFollow = (userId) => {
    followUser(userId, currentUser._id);
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
                    className="bg-blueT-100 hover.bg-blue-700 px-2 py-1 rounded-md text-white font-semibold"
                    onClick={() => handleFollow(user._id)}
                  >
                    Follow
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
  currentUser: state.authReducer.user,
});

const mapDispatchToProps = {
  fetchUsers,
  followUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);