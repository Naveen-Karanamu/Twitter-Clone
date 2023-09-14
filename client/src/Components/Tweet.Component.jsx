import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

import {
  getUserTweets,
  updateTweet,
} from "../Redux/Reducer/Tweet/tweet.action";

const TweetComponent = ({
  tweetId,
  username,
  content,
  onEdit,
  onDelete,
  onUpdate,
  fullname,
  isProfilePage = false,
  createdAt,
  onUpdateTweet,
  onDeleteTweet,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user._id);
  const [isEditing, setIsEditing] = useState(false);
  const [tweets, setTweets] = useState(null);

  const [editedContent, setEditedContent] = useState(content);
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDiffInMilliseconds = currentDate - createdDate;

    if (timeDiffInMilliseconds < 60 * 60 * 1000) {
      const minutes = Math.floor(timeDiffInMilliseconds / (60 * 1000));
      const formattedTimeAgo = `${minutes} minutes ago`;
      setTimeAgo(formattedTimeAgo);
    } else if (timeDiffInMilliseconds < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(timeDiffInMilliseconds / (60 * 60 * 1000));
      const formattedTimeAgo = `${hours} hours ago`;
      setTimeAgo(formattedTimeAgo);
    } else {
      const hours = Math.floor(timeDiffInMilliseconds / (60 * 60 * 1000));
      setTimeAgo(`${hours} Hours`);
    }
    setIsEditing(false);
  }, [createdAt]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleUpdateClick = () => {
    console.log(editedContent);
    // onUpdate(editedContent);
    onUpdateTweet(tweetId, editedContent);
    dispatch(updateTweet(tweetId, editedContent))
      .then(() => {
        setIsEditing(false);
        setEditedContent("");
        dispatch(getUserTweets(user))
          .then((response) => setTweets(response.payload || []))
          .catch((error) => console.error("Error fetching tweets:", error));
      })
      .catch((error) => console.error("Error updating tweet:", error));
  };

  const handleDeleteClick = () => {
    onDeleteTweet(tweetId);
    onDelete();
  };

  return (
    <>
      <div className="w-96 py-2 border-y-2">
        <div className="flex justify-between flex-row-reverse items-center">
          <div>
            <p className="text-xs font-semibold">{timeAgo}</p>
          </div>
          <div className="flex gap-2 justify-start items-center">
            <FaUserCircle className="w-8 h-8 text-blueT-100" />
            <p className="text-lg">{fullname}</p> <p>@{username}</p>
          </div>
        </div>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border"
          />
        ) : (
          <p>{content}</p>
        )}
        <div className="flex justify-between items-center py-3">
          <FaRegComment />
          <AiOutlineRetweet />
          <AiOutlineHeart />
          <BiPoll />
          {isProfilePage ? (
            isEditing ? (
              <>
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handleUpdateClick}>Update</button>
              </>
            ) : (
              <>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delete</button>
              </>
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TweetComponent;
