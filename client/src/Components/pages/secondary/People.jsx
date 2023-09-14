import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import UserList from "./UsersPage";
import FollowingList from "./FollowingPage";

function People() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <div className="gap-44 flex justify-between border-b-2 mt-10 pb-5 mb-5">
        <div className="w-full">
          <Link
            to={`/people/users`}
            className={`text-4xl font-bold mt-10 mb-6 pb-4 ${
              window.location.pathname.endsWith("/users")
                ? "text-blueT-100"
                : "hover:text-black font-semibold"
            }`}
          >
            User List
          </Link>
        </div>
        <div className="w-full">
          <Link
            to={`/people/following`}
            className={`text-4xl font-bold mt-10 mb-6 pb-4 ${
              window.location.pathname.endsWith("/following")
              ? "text-blueT-100"
              : "hover:text-black font-semibold"
            }`}
          >
            Following
          </Link>
        </div>
      </div>

      <Switch>
        <Route path={`${path}/users`}>
          <UserList />
        </Route>
        <Route path={`${path}/following`}>
          <FollowingList />
        </Route>
      </Switch>
    </div>
  );
}

export default People;
