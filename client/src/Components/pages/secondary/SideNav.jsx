import React, { useState } from "react";
import { Link } from "react-router-dom";
import {ImHome3} from "react-icons/im"
import {FaUserAlt} from "react-icons/fa"

import tx_image from "../../../assets/images/tx.png";

const SideNav=()=>{
     // State to track the selected page
  const [selectedPage, setSelectedPage] = useState("home");

  // Function to handle the click on the Home link
  const handleHomeClick = () => {
    setSelectedPage("home");
  };

  // Function to handle the click on the Profile link
  const handleProfileClick = () => {
    setSelectedPage("profile");
  };

    return (
        <>
        <div className="flex flex-col w-1/6 gap-1 justify-start items-start mx-40 mt-4 border-r-2 h-screen">
            <div className="w-14 h-14">
            <img src={tx_image} alt="logo" />
            </div>
            <Link
        to="/home"
        onClick={handleHomeClick}
        className={`flex gap-4 justify-center items-center rounded-3xl px-2 py-1 ${
          selectedPage === "home" ? "text-black-400 font-bold" : "hover:bg-gray-300 text-gray-600"
        }`}
      >
            <div className="flex gap-4 justify-center items-center hover:bg-gray-300 rounded-3xl px-6 py-3">
                <ImHome3 className="w-6 h-6"/>
                <p className="font-semibold text-xl ">Home</p>
            </div>
            </Link>
            <Link
        to="/profile"
        onClick={handleProfileClick}
        className={`flex gap-4 justify-center items-center rounded-3xl px-2 py-1 ${
          selectedPage === "profile" ? "text-black-400 font-bold" : "hover:bg-gray-300 text-gray-600"
        }`}
      >
            <div className="flex gap-4 justify-center items-center hover:bg-gray-300 rounded-3xl px-6 py-3">
                <FaUserAlt className="w-6 h-6"/>
                <p className="font-semibold text-xl ">Profile</p>
            </div>
            </Link>
            <div>
                <button className="bg-blueT-100 hover:bg-blue-700 px-20 py-2 rounded-3xl mt-4 text-white font-bold text-lg">Post</button>
            </div>
        </div>
        </>
    )
}

export default SideNav;

