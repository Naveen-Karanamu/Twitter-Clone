import React, { useState } from "react";
import SideNav from "./pages/secondary/SideNav";
import HomePage from "./pages/secondary/HomePage";
import ProfilePage from "./pages/secondary/ProfilePage";
import People from "./pages/secondary/People";

const Helper = () => {
    const [currentPage, setCurrentPage] = useState("home");
  return (
    <>
      <div className="flex">
        <SideNav setCurrentPage={setCurrentPage} />
        <div className="">
          {currentPage === "home" && <HomePage />}
          {currentPage === "profile" && <ProfilePage />}
          {currentPage === "people" && <People />}
        </div>
      </div>
    </>
  );
};

export default Helper;