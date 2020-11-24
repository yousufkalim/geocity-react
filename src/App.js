import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import CreateProject from "./screens/CreateProject";
import Home from "./screens/Home";
import List from "./screens/ListOfProject";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Project from "./screens/Project";
import SignUp from "./screens/SignUp";
import PrivateRoute from "./Auth/PrivateRoute";
export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <PrivateRoute path="/Profile" component={Profile} />

          <PrivateRoute path="/List" component={List} exact />
          <PrivateRoute path="/Project" component={Project} exact />

          <PrivateRoute path="/Createproject" exact component={CreateProject} />

          <Route path="/SignUp" exact>
            <SignUp />
          </Route>
          <Route path="/Login" exact>
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
