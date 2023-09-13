import { Route, Redirect } from "react-router-dom";
import SignUp from "./Components/pages/SignUp";
import SignIn from "./Components/pages/SignIn";
import HomePage from "./Components/pages/HomePage";

function App() {
  return (
    <>
    <Route path="/" exact>
        <Redirect to="/signup" />
      </Route>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/home" exact component={HomePage} />
    </>
  );
}

export default App;
