import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import MyHome from "./MyHome";
import HomePage from "./HomePage";

function HomeMain() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <div className="gap-44 flex justify-between border-b-2 mt-10 pb-5 mb-5" style={{ width: '500px' }}>
        <div className="w-full">
          <Link
            to={`home/posts`} 
            className={`text-3xl font-bold mt-10 mb-6 pb-2 ${
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
            to={`home/followtweets`}
            className={`text-3xl font-bold mt-10 mb-6 pb-4 ${
              window.location.pathname.endsWith("/followtweets")
                ? "text-blueT-100"
                : "hover:text-black font-semibold"
            }`}
          >
            Following
          </Link>
        </div>
      </div>

      <Switch>
        <Route path={`home/posts`}>
          <HomePage />
        </Route>
        <Route path={`home/followtweets`}>
          <MyHome />
        </Route>
      </Switch>
    </div>
  );
}

export default HomeMain;

