import React from "react";
import { isAuthenticated } from "../Auth/Index";
import { Link } from "react-router-dom";
import DropDown from "../shared/DropdownMenu";
import NotificationMenu from "../shared/NotificationMenu";
import LandImage from "../Theme/images/LandImage.png";
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
          <span className="navbar-toggler-awesome fas fa-times" />
        </button>
        {/* end of mobile menu toggle button */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarsExampleDefault"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link ">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ProjectList">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <a href="#dan" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#request">
                Service
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#request">
                Contact Us
              </a>
            </li>
          </ul>
          {!isAuthenticated() ? (
            <>
              <span className="nav-item" style={{ marginLeft: "30px" }}>
                <Link className="btn-outline-sm" to="/SignUp">
                  SIGN UP
                </Link>
              </span>
              <span className="nav-item" style={{ marginLeft: "1rem" }}>
                <Link className="btn-outline-sm" to="/Login">
                  LOG IN
                </Link>
              </span>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="row userHeader">
          <div className="notify">
            {!isAuthenticated() ? "" : <NotificationMenu data={data} />}
          </div>
          <div className="drop ml-2">
            {!isAuthenticated() ? "" : <DropDown />}
          </div>
        </div>
      </nav>{" "}
      <div className="header-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <img
                src={LandImage}
                style={{ width: "100%" }}
                alt="Landing Images"
              />
            </div>
            <div className="col-lg-7">
              <div className="text-container">
                <h2 className="h2-image-bottom">
                  <span className="turquoise">Vous avez un project ?</span>{" "}
                </h2>
                <h2>
                  <span className="turquoise">
                    Trouvez donc vos collaborateurs !
                  </span>{" "}
                </h2>
                <p className="p-large">
                  Plateforme vous permettant de trouver vos collaborateurs selon
                  les competences necesseries, et ce pour chaque etape de votre
                  project
                </p>
                <a className="btn-solid-lg " href="#services">
                  En savoir plus{" "}
                </a>
              </div>{" "}
              {/* end of text-container */}
            </div>{" "}
            {/* end of col */}
          </div>{" "}
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
      </div>{" "}
      {/* end of header-content */}
    </header>
  );
}
