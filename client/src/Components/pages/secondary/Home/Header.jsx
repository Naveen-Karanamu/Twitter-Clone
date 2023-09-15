import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="gap-44 flex justify-between mt-10 mb-5" style={{ width: '500px' }}>
      <div className="w-full">
        <Link
          to={`/home/posts`}
          className={`text-2xl font-bold mt-10 mb-6 pb-2 ${
            window.location.pathname.endsWith("/posts")
              ? "text-blueT-100"
              : "hover:text-black font-semibold"
          }`}
        >
          Posts
        </Link>
      </div>
      <div className="w-full">
        <Link
          to={`/home/followtweets`}
          className={`text-2xl font-bold mt-10 mb-6 pb-4 ${
            window.location.pathname.endsWith("/followtweets")
              ? "text-blueT-100"
              : "hover:text-black font-semibold"
          }`}
        >
          Following
        </Link>
      </div>
    </div>
  );
};

export default Header;
