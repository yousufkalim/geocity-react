import React, { useEffect, useState } from "react";
import { SignOut, isAuthenticated, getUser } from "./Auth/Index";

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

import { useToasts } from "react-toast-notifications";

import axios from "axios";
import io from "socket.io-client";
export default function App() {
  const { addToast } = useToasts();

  const [data, setdata] = useState([]);
  // console.log(this.state.notify_data, "notify_data");
  useEffect(() => {
    window.socket = io(
      process.env.REACT_APP_SOCKET_URL || "http://localhost:3000",
      {
        query: `userConnectionId=${getUser()._id}`,
      }
    );
    if (window.socket) {
      window.socket.on(`recieveNotification${getUser()._id}`, (datas) => {
        setdata([...data, datas]);

        addToast(datas.title, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      });
    }
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // console.log(headers, "asnlnkoasnas");

    try {
      axios
        .post(
          `http://160.153.249.64:7002/api/v1/profile/view-profile/all-notifications?id=${
            getUser()._id
          }`,
          {},
          headers
        )
        .then((res) => {
          // settempCommentArray([...tempcommentArray, obj]);
          setdata(res.data.notifications);

          console.log(res.data, "res notifications data");
        })
        .catch((err) => {
          console.log(" error projects all =>", err.response.data);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, []);
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

          <AdminRoute
            path="/Admindashboard/:id"
            exact
            component={(props) => (
              <AdminDashbaord {...props} notificationsData={data} />
            )}
          />
          <PrivateRoute
            path="/userdashboard/:id"
            exact
            component={(props) => (
              <UserDashboard {...props} notificationsData={data} />
            )}
          />
          {/* <UserDashboard notificationsData={data} />
          </PrivateRoute> */}
          <Route path="/SignUp" exact>
            <SignUp />
          </Route>
          <Route path="/Login" exact>
            <Login />
          </Route>
          <Route path="/ForgotPassword" exact>
            <ForgotPassword />
          </Route>
          <Route
            path="/"
            render={(props) => <Home {...props} notificationsData={data} />}
          />
        </Switch>
      </div>
    </Router>
  );
}
