import React, { useState } from "react";
import SideNav from "./pages/secondary/SideNav";
import HomePage from "./pages/secondary/HomePage";
import ProfilePage from "./pages/secondary/ProfilePage";

const Helper = () => {
    const [currentPage, setCurrentPage] = useState("home");
  return (
    <>
      <div className="flex">
        <SideNav setCurrentPage={setCurrentPage} />
        <div className="">
          {currentPage === "home" && <HomePage />}
          {currentPage === "profile" && <ProfilePage />}
        </div>
      </div>
    </>
  );
};

export default Helper;