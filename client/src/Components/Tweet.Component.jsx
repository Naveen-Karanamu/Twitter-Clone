import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const TweetComponent = ({ username, content, onEdit, onDelete, onUpdate, fullname }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(content); // Reset to original content
  };

  const handleUpdateClick = () => {
    onUpdate(editedContent);
    setIsEditing(false);
  };

  return (
    <>
      <div className="w-96 py-2 border-y-2">
        <div className="flex gap-2 justify-start items-center">
          <FaUserCircle className="w-8 h-8 text-blueT-100" />
          <p>{fullname}</p> <p>@{username}</p>
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
          {isEditing ? (
            <>
              <button onClick={handleCancelClick}>Cancel</button>
              <button onClick={handleUpdateClick}>Update</button>
            </>
          ) : (
            <>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TweetComponent;
