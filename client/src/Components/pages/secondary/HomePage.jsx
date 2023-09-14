import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetComponent from "../../Tweet.Component";
import { getAllTweets } from "../../../Redux/Reducer/Tweet/tweet.action";
import { getUserInfo } from "../../../Redux/Reducer/User/user.action";

const HomePage = () => {
  const dispatch = useDispatch();
  const tweetsFromState = useSelector((state) => state.tweets);
  const [tweets, setTweets] = useState([]);
  const [userInfoMap, setUserInfoMap] = useState({});

  // useEffect to fetch tweets and user info
  useEffect(() => {
    const fetchTweetsAndUserInfo = async () => {
      try {
        const tweetsData = await dispatch(getAllTweets());

        // Create an object to store user info based on user IDs
        const userInfoObject = {};

        // Fetch user information for each user in tweetsData
        for (const tweet of tweetsData) {
          if (tweet.user) {
            const userId = tweet.user;
            const userInfoResponse = await dispatch(getUserInfo(userId));
            userInfoObject[userId] = userInfoResponse;
          }
        }

        // Update state with the tweets and user information
        setTweets(tweetsData);
        setUserInfoMap(userInfoObject);
      } catch (error) {
        console.error("Error fetching tweets:", error);
        console.error("Error response:", error.response);
      }
    };

    fetchTweetsAndUserInfo();
  }, [dispatch, tweetsFromState]);
  // console.log(tweets[0].createdAt);

  return (
    <>
      <div>
        <div className="my-4 flex justify-around">
          <p className="text-bold text-xl">Posts</p>
          <p className="text-bold text-xl">Following</p>
        </div>
        {tweets.map((tweet) => (
          <TweetComponent
            key={tweet.id}
            username={userInfoMap[tweet.user]?.username || ""}
            fullname={userInfoMap[tweet.user]?.fullname || ""}
            content={tweet.content}
            createdAt={tweet.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
