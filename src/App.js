import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import CreateProject from "./screens/CreateProject";
import Home from "./screens/Home";
import ForgotPassword from "./screens/ForgotPassword";

import List from "./screens/ListOfProject";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Project from "./screens/Project";
import SignUp from "./screens/SignUp";
import PrivateRoute from "./Auth/PrivateRoute";
import AdminRoute from "./Auth/AdminRoute";

import UserDashboard from "./screens/userDashboard";
import AdminDashbaord from "./screens/AdminDashbaord";
import ResetPassword from "./screens/ResetPassword";

import "./Theme/css/bootstrap.css";
import "./Theme/css/styles.css";
import "./Theme/css/list.css";
// import "./Theme/css/main.css";
import "./Theme/css/project.css";
import "./Theme/css/profile.css";

import "./Theme/css/fontawesomeAll.css";
import "./Theme/css/swiper.css";
import "./Theme/css/magnific-popup.css";

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route
            path="/reset/:id"
            render={(props) => <ResetPassword {...props} />}
          />
          <PrivateRoute path="/profile/:id" component={Profile} exact />
          <Route path="/ProjectList" component={List} exact />
          <PrivateRoute path="/SingleProject/:id" component={Project} exact />
          <PrivateRoute path="/Createproject" exact component={CreateProject} />
          <PrivateRoute
            path="/userdashboard/:id"
            exact
            component={UserDashboard}
          />{" "}
          <AdminRoute
            path="/Admindashboard/:id"
            exact
            component={AdminDashbaord}
          />
          <Route path="/SignUp" exact>
            <SignUp />
          </Route>
          <Route path="/Login" exact>
            <Login />
          </Route>
          <Route path="/ForgotPassword" exact>
            <ForgotPassword />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
