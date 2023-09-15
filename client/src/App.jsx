import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./Components/pages/primary/SignUp";
import SignIn from "./Components/pages/primary/SignIn";
import HomePage from "./Components/pages/secondary/HomePage";
import SideNav from "./Components/pages/secondary/SideNav";
import ProfilePage from "./Components/pages/secondary/ProfilePage";
import Temp from "./Components/pages/Temp";
import UsersPage from "./Components/pages/secondary/UsersPage";
import FollowingPage from "./Components/pages/secondary/FollowingPage";
import People from "./Components/pages/secondary/People";
import FeedComponent from "./Components/pages/secondary/FeedComponent";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signup" />
        </Route>
        <Route path="/people" exact>
          <Redirect to="/people/users" />
        </Route>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/temp" exact component={Temp} />
        <div className="flex mx-16">
          <SideNav />
          <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/people" exact component={People} />
          </Switch>
            <Route path="/people/users" exact component={UsersPage} />
            <Route path="/people/following" exact component={FollowingPage} />
            <FeedComponent />
        </div>
      </Switch>
    </>
  );
}

export default App;
