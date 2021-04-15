import React from "react";
import { getUser, SignOut, isAuthenticated } from "../Auth/Index";
import { Link } from "react-router-dom";
import DropDown from "../shared/DropdownMenu";
import NotificationMenu from "../shared/NotificationMenu";
export default function HomeHeader({ data }) {
  return (
    <header id="header" className="header">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom-home ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-awesome fas fa-bars" />
          {/* <span className="navbar-toggler-awesome fas fa-times" /> */}
        </button>

        {/* end of mobile menu toggle button */}
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <Link
            to={`/Admindashboard/${getUser()._id}`}
            className="navbar-brand logo-image"
          >
            GEOCITY
          </Link>
          <ul className="navbar-nav ml-auto">
            {!isAuthenticated() ? (
              <>
                <li className="nav-item">
                  <Link className="btn-outline-sm" to="/SignUp">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn-outline-sm" to="/Login">
                    Log In
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="row ml-1 mr-1 sideheader">
          {!isAuthenticated() ? "" : <NotificationMenu data={data} />}
          {!isAuthenticated() ? "" : <DropDown />}
        </div>
      </nav>{" "}
      {/* end of header-content */}
    </header>
  );
}
