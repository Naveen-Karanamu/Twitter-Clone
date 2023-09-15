import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetComponent from "../../../Tweet.Component";
import { getAllTweets } from "../../../../Redux/Reducer/Tweet/tweet.action";
import { getUserInfo } from "../../../../Redux/Reducer/User/user.action";
import Header from "./Header";

const MyHome = () => {
  const dispatch = useDispatch();
  const tweetsFromState = useSelector((state) => state.tweets);
  const followingList = useSelector((state) => state.authReducer.user.following);
  console.log(followingList);
  const [tweets, setTweets] = useState([]);
  const [userInfoMap, setUserInfoMap] = useState({});

  useEffect(() => {
    const fetchTweetsAndUserInfo = async () => {
      try {
        const tweetsData = await dispatch(getAllTweets());

        const userInfoObject = {};

        const filteredTweets = tweetsData.filter((tweet) =>
          followingList.includes(tweet.user)
        );

        for (const tweet of filteredTweets) {
          if (tweet.user) {
            const userId = tweet.user;
            const userInfoResponse = await dispatch(getUserInfo(userId));
            userInfoObject[userId] = userInfoResponse;
          }
        }

        setTweets(filteredTweets);
        setUserInfoMap(userInfoObject);
      } catch (error) {
        console.error("Error fetching tweets:", error);
        console.error("Error response:", error.response);
      }
    };

    fetchTweetsAndUserInfo();
  }, [dispatch, tweetsFromState, followingList]);

  return (
    <>
      <div className="w-full">
        <Header />
        {tweets.map((tweet) => (
          <TweetComponent
            key={tweet.id}
            username={userInfoMap[tweet.user]?.username || ""}
            fullname={userInfoMap[tweet.user]?.fullname || ""}
            content={tweet.content}
            createdAt={tweet.createdAt}
            imageURL={tweet.imageURL}
          />
        ))}
      </div>
    </>
  );
};

export default MyHome;
