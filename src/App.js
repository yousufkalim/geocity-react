import React, { useEffect, useState } from "react";
import {
  SignOut,
  isAuthenticated,
  getUser,
  getNotifications,
} from "./Auth/Index";
import Loader from "./shared/Loaders";
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
import HomeRoute from "./Auth/HomeRoute";

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

import axios from "axios";
export default function App() {
  const [data, setdata] = useState([]);
  // console.log(this.state.notify_data, "notify_data");
  // console.log(data, "sort");

  useEffect(() => {
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    console.log(headers, "asnlnkoasnas");
    // if (isAuthenticated()) {
    //   const sort = getUser().notifications.sort(
    //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    //   );
    //   setdata(sort);
    // }
    if (isAuthenticated()) {
      try {
        axios
          .post(
            `https://api.geocity.io/api/v1/profile/view-profile/all-notifications?id=${
              getUser()._id
            }`,
            {},
            headers
          )
          .then((res) => {
            // settempCommentArray([...tempcommentArray, obj]);
            const sort = res.data.notifications.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setdata(sort);

            console.log(res.data, "res notifications data");
          })
          .catch((err) => {
            console.log(" error projects all =>", err.response.data);
          });
      } catch (error) {
        // console.log(error, "error catch");
      }
    }
  }, []);
  // if (data && data.length > 0) {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route
            exact
            path="/reset/:id"
            render={(props) => <ResetPassword {...props} />}
          />
          <PrivateRoute
            path="/profile/:id"
            exact
            component={(props) => (
              <Profile {...props} notificationsData={data} setdata={setdata} />
            )}
          />
          {/* <PrivateRoute path="/profile/:id" component={Profile} exact /> */}
          {/* <Route path="/ProjectList" component={List} exact /> */}
          <Route
            exact
            path="/ProjectList"
            component={(props) => (
              <List {...props} notificationsData={data} setdata={setdata} />
            )}
          />
          <PrivateRoute
            path="/SingleProject/:id"
            exact
            component={(props) => (
              <Project {...props} notificationsData={data} setdata={setdata} />
            )}
          />
          {/* <PrivateRoute path="/SingleProject/:id" component={Project} exact /> */}
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
              <UserDashboard
                {...props}
                notificationsData={data}
                setNotificationsData={setdata}
              />
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

          <HomeRoute
            path="/"
            exact
            component={(props) => (
              <Home {...props} setdata={setdata} data={data} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
  // } else {
  //   return <Loader />;
  // }
}
