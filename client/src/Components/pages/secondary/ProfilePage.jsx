import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetComponent from "../../Tweet.Component";
import {
  getAllTweets,
  updateTweet,
  deleteTweet,
  getUserTweets,
} from "../../../Redux/Reducer/Tweet/tweet.action";
import { getUserInfo } from "../../../Redux/Reducer/User/user.action";
import { GET_USER_TWEETS_REQUEST } from "../../../Redux/Reducer/Tweet/tweet.type";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user._id);
  const loading = useSelector((state) => state.authReducer.loading); 
  const [tweets, setTweets] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        dispatch({ type: GET_USER_TWEETS_REQUEST });

        const tweetsData = await dispatch(getUserTweets(user));
        setTweets(tweetsData || []);

        if (tweetsData[0]?.user) {
          const userId = tweetsData[0].user;
          const userInfoResponse = await dispatch(getUserInfo(user));
          setUserInfo(userInfoResponse);
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
        console.error("Error response:", error.response);
      }
    };

    if (user) {
      fetchTweets();
    }
  }, [dispatch, user]);

  // useEffect(() => {
  //   console.log("editedContent:", editedContent);
  // }, [editedContent]);

  const handleEditClick = (tweetId, content) => {
    console.log("editedContent inside handleEditClick:", content);
    setEditMode(true);
    setEditedContent(content);
  };

  const handleUpdateClick = (tweetId, updatedContent) => {
    dispatch(updateTweet(tweetId, updatedContent))
      .then(() => {
        setEditMode(false);
        setEditedContent("");
        setTweets((prevTweets) => {
          const updatedTweets = prevTweets.map((tweet) =>
            tweet._id === tweetId ? { ...tweet, content: updatedContent } : tweet
          );
          return updatedTweets;
        });
      })
      .catch((error) => console.error("Error updating tweet:", error));
  };

  const handleDeleteClick = (tweetId) => {
    dispatch(deleteTweet(tweetId))
      .then(() => {
        // Remove the deleted tweet from the state
        setTweets((prevTweets) => prevTweets.filter((tweet) => tweet._id !== tweetId));
      })
      .catch((error) => console.error("Error deleting tweet:", error));
  };

  const handleUpdateTweet = (tweetId, updatedContent) => {
    dispatch(updateTweet(tweetId, updatedContent))
      .then(() => {
        fetchUpdatedTweets();
      })
      .catch((error) => console.error("Error updating tweet:", error));
  };

  const handleDeleteTweet = (tweetId) => {
    dispatch(deleteTweet(tweetId))
      .then(() => {
        fetchUpdatedTweets();
      })
      .catch((error) => console.error("Error deleting tweet:", error));
  };

  const fetchUpdatedTweets = () => {
    dispatch(getUserTweets(user))
      .then((response) => setTweets(response.payload || []))
      .catch((error) => console.error("Error fetching tweets:", error));
  };

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {userInfo && (
              <>
                <p className="text-4xl font-bold my-2">
                  Hello {userInfo.fullname}
                </p>
                <p>Username: {userInfo.username}</p>
              </>
            )}
            <div className="my-4">
              <p className="text-bold text-xl">Posts</p>
            </div>
            {tweets !== null &&
        tweets.map((tweet) => (
          <TweetComponent
            key={tweet._id}
            tweetId={tweet._id}
            username={userInfo ? userInfo.username : ""}
            fullname={userInfo ? userInfo.fullname : ""}
            content={editMode ? editedContent : tweet.content}
            onEdit={() => handleEditClick(tweet._id, tweet.content)} 
            onDelete={() => handleDeleteClick(tweet._id)} 
            onUpdateTweet={handleUpdateClick}
            onDeleteTweet={handleDeleteClick}
            isProfilePage={true}
            createdAt={tweet.createdAt}
          >
          </TweetComponent>
        ))}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
