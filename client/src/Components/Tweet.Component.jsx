import React from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";

const TweetComponent = () => {
  return (
    <>
      <div className="w-96 py-2 border-y-2">
        <p>Naveen</p>
        <p>Content</p>
        <div className="flex justify-between items-center">
          <FaRegComment />
          <AiOutlineRetweet />
          <AiOutlineHeart />
          <BiPoll />
        </div>
      </div>
    </>
  );
};

export default TweetComponent;
