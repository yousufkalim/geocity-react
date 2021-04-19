import React, { useEffect, useState } from "react";
// import "../Theme/css/styles.css";
import Footer from "../Components/footer";
import { SignOut, isAuthenticated, getUser } from "../Auth/Index";
import { Link } from "react-router-dom";
import lightbulb from "../Theme/images/light-bulb.svg";
import deal from "../Theme/images/deal.svg";
import rocket from "../Theme/images/rocket.svg";
import magnifier from "../Theme/images/magnifier.svg";
import paperPlane from "../Theme/images/paper-plane.svg";
import target from "../Theme/images/target.svg";
import Header from "../Components/HomeHeader";
import projectImage from "../Theme/images/projectImage.png";
import avatarimage from "../Theme/images/avatar.png";

export default function Home({ notificationsData }) {
  return (
    <div>
      <Header data={notificationsData} />
      <div id="services" className="cards-1">
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-12">
              <h2 className="text-center">Comment cela fontctionne ?</h2>
            </div>
            <div
              className="col-lg-6"
              style={{ backgroundColor: "#00bcb6" }}
            ></div>
            <div className=" col-lg-6 single-card">
              <div
                className="pl-0 col-lg-12"
                style={{ border: "10px solid blue" }}
              >
                <img
                  src={projectImage}
                  alt="GeoCity Project"
                  className="geocity-image"
                />
              </div>
              <div className="d-flex align-items-center pt-2">
                <img src={avatarimage} alt="avatar" className="avatar" />

                <h5 className="text-bold pl-3">Geocity</h5>
              </div>
              <div className="col text-left mt-2">
                <p className="text-left">
                  Description: Creation d'une plateforme pour touver son
                  collaborateurs
                </p>
              </div>
            </div>
          </div>
          {/* end of row */}
          <div className="row" id="section1" style={{ marginTop: 100 }}>
            <div className="col-lg-12">
              <h3 className="h2-heading" style={{ fontWeight: "bold" }}>
                Pour les porteurs de projet
              </h3>
              {/* Card */}
              <div className="card">
                <img className="card-image" src={lightbulb} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Creez votre projet</h4>
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img className="card-image" src={deal} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Trouvez vos collaborateurs</h4>
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img className="card-image" src={rocket} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Realisez votre projet !</h4>
                </div>
              </div>
              {/* end of card */}
            </div>{" "}
            {/* end of col */}
          </div>

          <div className="row " id="section2">
            <div className="col-lg-12">
              <h2 className="h2-heading">
                Pour les personnes recherchant un projet
              </h2>
              {/* Card */}
              <div className="card">
                <img className="card-image" src={magnifier} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Recherchez un projet</h4>
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img
                  className="card-image"
                  src={paperPlane}
                  alt="alternative"
                />
                <div className="card-body">
                  <h4 className="card-title">Contactez le porteur du projet</h4>
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img className="card-image" src={target} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Apportez votre contribution</h4>
                </div>
              </div>
              {/* end of card */}
            </div>{" "}
            {/* end of col */}
          </div>
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
      </div>{" "}
      {/* end of cards-1 */}
      <div className="basic-2">
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-lg-12 text-center color-white">
              <h2 style={{ color: "#ffff" }}>Derniers Projets</h2>
            </div>
            <div className="cards-container row w-100">
              <div className="single-card col-md-4 col-sm-12">
                <div
                  className="pl-0 col-lg-12"
                  style={{ border: "10px solid blue" }}
                >
                  <img
                    src={projectImage}
                    alt="GeoCity Project"
                    className="geocity-image"
                  />
                </div>
                <div className="d-flex align-items-center pt-2">
                  <img src={avatarimage} alt="avatar" className="avatar" />

                  <h5 className="text-bold pl-3">Geocity</h5>
                </div>
                <div className="col text-left mt-2">
                  <p className="text-left">
                    Description: Creation d'une plateforme pour touver son
                    collaborateurs
                  </p>
                </div>
              </div>
              <div className="single-card col-md-4 col-sm-12">
                <div
                  className="pl-0 col-lg-12 "
                  style={{ border: "10px solid blue" }}
                >
                  <img
                    src={projectImage}
                    alt="GeoCity Project"
                    className="geocity-image"
                  />
                </div>
                <div className="d-flex align-items-center pt-2">
                  <img src={avatarimage} alt="avatar" className="avatar" />

                  <h5 className="text-bold pl-3">Geocity</h5>
                </div>
                <div className="col text-left mt-2">
                  <p className="text-left">
                    Description: Creation d'une plateforme pour touver son
                    collaborateurs
                  </p>
                </div>
              </div>
              <div className="single-card col-md-4 col-sm-12">
                <div
                  className="pl-0 col-lg-12"
                  style={{ border: "10px solid blue" }}
                >
                  <img
                    src={projectImage}
                    alt="GeoCity Project"
                    className="geocity-image"
                  />
                </div>
                <div className="d-flex align-items-center pt-2">
                  <img src={avatarimage} alt="avatar" className="avatar" />

                  <h5 className="text-bold pl-3">Geocity</h5>
                </div>
                <div className="col-12 text-left mt-2">
                  <p className="text-left">
                    Description: Creation d'une plateforme pour touver son
                    collaborateurs
                  </p>
                </div>
              </div>
            </div>
            {/* end of col */}

            <div className="d-flex row justify-content-center w-100">
              <span className="nav-item col-sm-12 mx-auto mb-2">
                <Link className="btn-outline-bm" to="/SignUp">
                  Voir tous les projets
                </Link>
              </span>
              <span
                className="nav-item col-sm12 mx-auto mt-2"
                text-bold
                style={{ marginLeft: "6rem" }}
              >
                <Link className="  btn-outline-bm" to="/Login">
                  Creer un nouveau projet
                </Link>
              </span>
            </div>
          </div>{" "}
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
