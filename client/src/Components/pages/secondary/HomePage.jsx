import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetComponent from "../../Tweet.Component";
import { getAllTweets } from "../../../Redux/Reducer/Tweet/tweet.action";
import { getUserInfo } from "../../../Redux/Reducer/User/user.action";

const HomePage = () => {
  const dispatch = useDispatch();
  const tweetsFromState = useSelector((state) => state.tweets);
  const [tweets, setTweets] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // useEffect to fetch tweets and user info
  useEffect(() => {
    const fetchTweetsAndUserInfo = async () => {
      try {
        const tweetsData = await dispatch(getAllTweets());
        setTweets(tweetsData || []);

        // Fetch user information using ObjectId (assuming _id is the ObjectId)
        if (tweetsData[0]?.user) {
          const userId = tweetsData[0].user;
          const userInfoResponse = await dispatch(getUserInfo(userId));
          setUserInfo(userInfoResponse);
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
        console.error("Error response:", error.response);
      }
    };

    fetchTweetsAndUserInfo();
  }, [dispatch, tweetsFromState]);

  return (
    <>
      <div>
        <div className="my-4 flex justify-around">
          <p className="text-bold text-xl">Posts</p>
          <p className="text-bold text-xl">Following</p>
        </div>
        {tweets !== null &&
          tweets.map((tweet) => (
            <TweetComponent
              key={tweet.id}
              username={userInfo ? userInfo.username : ""}
              fullname={userInfo ? userInfo.fullname : ""}
              content={tweet.content}
            />
          ))}
      </div>
    </>
  );
};

export default HomePage;
