import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./Components/pages/primary/SignUp";
import SignIn from "./Components/pages/primary/SignIn";
import HomePage from "./Components/pages/secondary/HomePage";
import SideNav from "./Components/pages/secondary/SideNav";
import ProfilePage from "./Components/pages/secondary/ProfilePage";
import Temp from "./Components/pages/Temp";
import UsersPage from "./Components/pages/secondary/UsersPage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signup" />
        </Route>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/temp" exact component={Temp} />
        <Route path="/users" exact component={UsersPage} />
        <div className="flex mx-40">
          <SideNav />
          <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/profile" exact component={ProfilePage} />
          </Switch>
        </div>
      </Switch>
    </>
  );
}

export default App;
