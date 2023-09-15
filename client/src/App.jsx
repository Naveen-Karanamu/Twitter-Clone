import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./Components/pages/primary/SignUp";
import SignIn from "./Components/pages/primary/SignIn";
import SideNav from "./Components/pages/secondary/SideNav";
import ProfilePage from "./Components/pages/secondary/ProfilePage";
import Temp from "./Components/pages/Temp";
import UsersPage from "./Components/pages/secondary/UsersPage";
import FollowingPage from "./Components/pages/secondary/FollowingPage";
import People from "./Components/pages/secondary/People";
import FeedComponent from "./Components/pages/secondary/FeedComponent";
import HomeMain from "./Components/pages/secondary/Home/HomeMain";
import HomePage from "./Components/pages/secondary/Home/HomePage";
import MyHome from "./Components/pages/secondary/Home/MyHome";

function App() {
  return (
    <>
      <Switch>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
        <Route path="/" exact>
          <Redirect to="/signup" />
        </Route>
        <div className="flex mx-16">
          <SideNav />
          <Route path="/home" exact component={HomeMain} />
          <Route path="/home/posts" exact component={HomePage} />
          <Route path="/home/followtweets" exact component={MyHome} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/people" exact component={People} />
          <Route path="/people/users" exact component={UsersPage} />
          <Route path="/people/following" exact component={FollowingPage} />
          <Route path="/feed" exact component={FeedComponent} />
          <Route path="/temp" exact component={Temp} />
        </div>
      </Switch>
    </>
  );
}

export default App;
