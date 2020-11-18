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

export default function App() {
  return (
    <Router>
      <div>
    
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
         
          <Route path="/Profile" exact>
            <Profile/>
          </Route>
          <Route path="/List" exact>
            <List/>
          </Route>
          <Route path="/Project" exact>
            <Project/>
          </Route>
          <Route path="/Createproject" exact>
            <CreateProject/>
          </Route>
          <Route path="/SignUp" exact>
            <SignUp/>
          </Route>
          <Route path="/Login" exact>
            <Login/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}