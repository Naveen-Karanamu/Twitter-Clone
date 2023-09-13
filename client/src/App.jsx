import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./Components/pages/primary/SignUp";
import SignIn from "./Components/pages/primary/SignIn";
import HomePage from "./Components/pages/secondary/HomePage";
import SideNav from "./Components/pages/secondary/SideNav";
import ProfilePage from "./Components/pages/secondary/ProfilePage";
import Helper from "./Components/Helper";

function App() {
  return (
    <>
      <Route path="/" exact>
        <Redirect to="/signup" />
      </Route>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <div className="flex">
        <SideNav />
        <Switch>
          <Route path="/home" exact component={HomePage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
