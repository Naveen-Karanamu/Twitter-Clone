// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import TweetComponent from "../../Tweet.Component";
// import {
//   getAllTweets,
//   updateTweet,
//   deleteTweet,
// } from "../../../Redux/Reducer/Tweet/tweet.action";
// import { getUserInfo } from "../../../Redux/Reducer/User/user.action";

// const ProfilePage = () => {
//   const dispatch = useDispatch();
//   const tweetsFromState = useSelector((state) => state.tweets);
//   const [tweets, setTweets] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedContent, setEditedContent] = useState("");
//   const [userInfo, setUserInfo] = useState(null);

//   // useEffect(() => {
//   //     const fetchTweets = async () => {
//   //       try {
//   //         const tweetsData = await dispatch(getAllTweets());
//   //         console.log(tweetsData); // Log the response data
//   //         setTweets(tweetsData || []);
//   //       } catch (error) {
//   //         console.error("Error fetching tweets:", error);
//   //         console.error("Error response:", error.response);
//   //       }
//   //     };

//   //     fetchTweets();
//   //   }, [dispatch, tweetsFromState]);
//   useEffect(() => {
//     const fetchTweets = async () => {
//       try {
//         const tweetsData = await dispatch(getAllTweets());
//         setTweets(tweetsData || []);
        
//         // Fetch user information using ObjectId
//         // console.log(tweetsData[0].user); // Log the response data
//         if (tweetsData[0].user) {
//           const userId = tweetsData[0].user; // Assuming _id is the ObjectId
//           const userInfoResponse = await dispatch(getUserInfo(userId));
//           setUserInfo(userInfoResponse);
//         }
//     } catch (error) {
//         console.error("Error fetching tweets:", error);
//         console.error("Error response:", error.response);
//     }
// };


// fetchTweets();
// }, [dispatch, tweetsFromState]);

// const handleEditClick = (tweetId, content) => {
//     setEditMode(true);
//     setEditedContent(content);
// };

// const handleUpdateClick = (tweetId) => {
//     dispatch(updateTweet(tweetId, editedContent))
//       .then(() => {
//           setEditMode(false);
//           setEditedContent("");
//           dispatch(getAllTweets())
//           .then((response) => setTweets(response.payload || []))
//           .catch((error) => console.error("Error fetching tweets:", error));
//         })
//         .catch((error) => console.error("Error updating tweet:", error));
//   };
  
//   const handleDeleteClick = (tweetId) => {
//     dispatch(deleteTweet(tweetId))
//       .then(() => {
//           dispatch(getAllTweets())
//           .then((response) => setTweets(response.payload || []))
//           .catch((error) => console.error("Error fetching tweets:", error));
//         })
//       .catch((error) => console.error("Error deleting tweet:", error));
//   };

//   console.log(userInfo.username)
//   return (
//     <>
//       <div>
//         {userInfo && (
//           <>
//             <p className="text-4xl font-bold my-2">Hello {userInfo.fullname}</p>
//             {/* Access userInfo.username here */}
//             <p>Username: {userInfo.username}</p>
//           </>
//         )}
//         <div className="my-4">
//           <p className="text-bold text-xl">Posts</p>
//         </div>
//         {tweets !== null &&
//           tweets.map((tweet) => (
//             <TweetComponent
//               key={tweet.id}
//               username={userInfo ? userInfo.username : ""} // Use conditional check here
//               fullname={userInfo ? userInfo.fullname : ""}
//               content={editMode ? editedContent : tweet.content}
//               onUpdate={() => handleUpdateClick(tweet.id)}
//             >
//               {editMode ? (
//                 <>
//                   <button onClick={() => handleUpdateClick(tweet.id)}>Update</button>
//                   <button onClick={() => setEditMode(false)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <button onClick={() => handleEditClick(tweet.id, tweet.content)}>Edit</button>
//                   <button onClick={() => handleDeleteClick(tweet.id)}>Delete</button>
//                 </>
//               )}
//             </TweetComponent>
//           ))}
//       </div>
//     </>
//   );
  
// };

// export default ProfilePage;

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
import {GET_USER_TWEETS_REQUEST} from "../../../Redux/Reducer/Tweet/tweet.type";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading); // Get loading state
  const [tweets, setTweets] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        dispatch({ type: GET_USER_TWEETS_REQUEST }); 

        const tweetsData = await dispatch(getUserTweets(user._id));
        setTweets(tweetsData || []);

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

    if (user) {
      fetchTweets();
    }
  }, [dispatch, user]);

  const handleEditClick = (tweetId, content) => {
    setEditMode(true);
    setEditedContent(content);
  };

  const handleUpdateClick = (tweetId) => {
    dispatch(updateTweet(tweetId, editedContent))
      .then(() => {
        setEditMode(false);
        setEditedContent("");
        dispatch(getUserTweets(user._id))
          .then((response) => setTweets(response.payload || []))
          .catch((error) => console.error("Error fetching tweets:", error));
      })
      .catch((error) => console.error("Error updating tweet:", error));
  };

  const handleDeleteClick = (tweetId) => {
    dispatch(deleteTweet(tweetId))
      .then(() => {
        dispatch(getUserTweets(user._id))
          .then((response) => setTweets(response.payload || []))
          .catch((error) => console.error("Error fetching tweets:", error));
      })
      .catch((error) => console.error("Error deleting tweet:", error));
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
                <p className="text-4xl font-bold my-2">Hello {userInfo.fullname}</p>
                <p>Username: {userInfo.username}</p>
              </>
            )}
            <div className="my-4">
              <p className="text-bold text-xl">Posts</p>
            </div>
            {tweets !== null &&
              tweets.map((tweet) => (
                <TweetComponent
                  key={tweet.id}
                  username={userInfo ? userInfo.username : ""}
                  fullname={userInfo ? userInfo.fullname : ""}
                  content={editMode ? editedContent : tweet.content}
                  onUpdate={() => handleUpdateClick(tweet.id)}
                  isProfilePage={true}
                >
                  {editMode ? (
                    <>
                      <button onClick={() => handleUpdateClick(tweet.id)}>Update</button>
                      <button onClick={() => setEditMode(false)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(tweet.id, tweet.content)}>Edit</button>
                      <button onClick={() => handleDeleteClick(tweet.id)}>Delete</button>
                    </>
                  )}
                </TweetComponent>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
