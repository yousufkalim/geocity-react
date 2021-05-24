import React from "react";
import { Redirect, Route } from "react-router-dom";
import { SignOut, isAuthenticated, getUser } from "../Auth/Index";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("jwt") && getUser().role == "admin" ? (
          <Redirect
            to={{
              pathname: `/Admindashboard/${getUser()._id}`,
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
