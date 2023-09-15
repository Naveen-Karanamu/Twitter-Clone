import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const feedData = [
  {
    category: "NFL",
    time: "5 hours ago",
    title: "#Vinings at Eagles",
  },
  {
    category: "Enterntainment",
    time: "Trending",
    title: "#MarkAntony",
    trendingWith: "#Vishal, #SJsurya",
  },
  {
    category: "Trending in India",
    time: "Trending",
    title: "#PawanKalyan",
    trendingWith: "#CNB, #NBK",
  },
  {
    category: "Indian Premier League",
    time: "Trending",
    title: "Dhoni",
    postCount: "16.8K posts",
  },
  {
    category: "Enterntainment",
    time: "Trending",
    title: "#MrunalThakur",
    postCount: "4,901 posts",
  },
  {
    category: "Cricket",
    time: "Trending",
    title: "INDIA",
    postCount: "100K posts",
  },
];

const FeedComponent = () => {
  return (
    <>
      <div className="mx-10 border-l-2 my-6 px-10 w-  sticky top-4 h-screen">
        <div className="flex items-center justify-center gap-4 border-2 rounded-full p-2 w-72">
          <HiOutlineSearch />
          <input
            placeholder="Search (Not functional)"
            className=" focus:outline-none"
          />
        </div>
        <div className="bg-gray-100 p-4 w-96 rounded-xl my-10">
          <p className="font-bold text-xl text-gray-800">What's happening</p>
          {feedData.map((item, index) => (
            <div key={index} className="my-5">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">{item.category} . {item.time}</p>
                <p className="font-bold text-lg">...</p>
              </div>
              <p className="font-bold text-md">{item.title}</p>
              {item.trendingWith && (
                <p className="text-xs text-gray-500">Trending with {item.trendingWith}</p>
              )}
              {item.postCount && (
                <p className="text-xs text-gray-500">{item.postCount}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedComponent;
