import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImHome3 } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import TweetCard from "../TweetCard";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import tx_image from "../../../assets/images/tx.png";
import { logout } from "../../../Redux/Reducer/Auth/auth.action";

const SideNav = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [isTweetCardOpen, setIsTweetCardOpen] = useState(false);

  const handleHomeClick = () => {
    setSelectedPage("home");
  };

  const handleProfileClick = () => {
    setSelectedPage("profile");
  };
  const handleUsersClick = () => {
    setSelectedPage("users");
  };

  const openTweetCard = () => {
    setIsTweetCardOpen(true);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/signin"); 
  };

  return (
    <>
      <div className="flex flex-col px-10 gap-1 justify-start items-start mx-6 mt-4 border-r-2 h-screen sticky top-4">
        <div className="w-14 h-14">
          <img src={tx_image} alt="logo" />
        </div>
        <Link
          to="/home"
          onClick={handleHomeClick}
          className={`flex gap-4 justify-center items-center rounded-3xl px-2 py-1 ${
            selectedPage === "home"
              ? "text-black-400 font-bold"
              : "hover:bg-gray-300 text-gray-600"
          }`}
        >
          <div className="flex gap-4 justify-center items-center hover:bg-gray-300 rounded-3xl px-6 py-3">
            <ImHome3 className="w-6 h-6" />
            <p className="font-semibold text-xl">Home</p>
          </div>
        </Link>
        <Link
          to="/profile"
          onClick={handleProfileClick}
          className={`flex gap-4 justify-center items-center rounded-3xl px-2 py-1 ${
            selectedPage === "profile"
              ? "text-black-400 font-bold"
              : "hover:bg-gray-300 text-gray-600"
          }`}
        >
          <div className="flex gap-4 justify-center items-center hover:bg-gray-300 rounded-3xl px-6 py-3">
            <FaUserAlt className="w-6 h-6" />
            <p className="font-semibold text-xl">Profile</p>
          </div>
        </Link>
        <Link
          to="/people"
          onClick={handleUsersClick}
          className={`flex gap-4 justify-center items-center rounded-3xl px-2 py-1 ${
            selectedPage === "users"
              ? "text-black-400 font-bold"
              : "hover:bg-gray-300 text-gray-600"
          }`}
        >
          <div className="flex gap-4 justify-center items-center hover:bg-gray-300 rounded-3xl px-6 py-3">
            <FaUsersLine className="w-6 h-6" />
            <p className="font-semibold text-xl">People</p>
          </div>
        </Link>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-11 py-2 rounded-3xl mt-4 text-white font-bold text-lg"
          >
            Log Out
          </button>
        </div>
        <div>
          <button
            onClick={openTweetCard}
            className="bg-blueT-100 hover:bg-blue-700 px-20 py-2 rounded-3xl mt-4 text-white font-bold text-lg"
          >
            Tweet
          </button>
        </div>
      </div>
      {isTweetCardOpen && (
        <TweetCard isOpen={isTweetCardOpen} setIsOpen={setIsTweetCardOpen} />
      )}
    </>
  );
};

export default SideNav;
