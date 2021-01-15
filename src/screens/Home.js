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
import bulbMen from "../Theme/images/bulb-men.png";
import Group2 from "../Theme/images/Group2.png";
import DropDown from "../shared/DropdownMenu";
import NotificationMenu from "../shared/NotificationMenu";
import Header from "../Components/HomeHeader";

export default function Home({ notificationsData }) {
  return (
    <div>
      <Header data={notificationsData} />
      <div id="services" className="cards-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Comment cela fontctionne ?</h2>
              {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
            </div>{" "}
            {/* end of col */}
          </div>{" "}
          {/* end of row */}
          <div className="row " id="section1">
            <div className="col-lg-12">
              <h3 className="h2-heading" style={{ fontWeight: "bold" }}>
                Pour les porteurs de projet
              </h3>
              {/* Card */}
              <div className="card">
                <img className="card-image" src={lightbulb} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Creez votre projet</h4>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img className="card-image" src={deal} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Trouvez vos collaborateurs</h4>
                  {/* <p>Once the market analysis process is completed our staff will search for opportunities that are in reach</p> */}
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img className="card-image" src={rocket} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Realisez votre projet !</h4>
                  {/* <p>With all the information in place you will be presented with an action plan that your company needs to follow</p> */}
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
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
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
                  {/* <p>Once the market analysis process is completed our staff will search for opportunities that are in reach</p> */}
                </div>
              </div>
              {/* end of card */}
              {/* Card */}
              <div className="card">
                <img className="card-image" src={target} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Apportez votre contribution</h4>
                  {/* <p>With all the information in place you will be presented with an action plan that your company needs to follow</p> */}
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
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="row image-container">
                <img
                  className="img-fluid"
                  style={{
                    width: "280px",
                    height: "291px",
                    marginLeft: "6rem",
                    // left: "36%",
                  }}
                  src={Group2}
                  alt="alternative"
                />
                <img
                  className="img-fluid"
                  style={{
                    width: "157px",
                    height: "274px",
                    position: "absolute",
                    left: "36%",
                  }}
                  src={bulbMen}
                  alt="alternative"
                />
              </div>{" "}
              {/* end of image-container */}
            </div>{" "}
            {/* end of col */}
            <div className="col-lg-8">
              <div className="text-container">
                <h2>Lancez-vous maintenant !</h2>
                <Link to="/ProjectList">
                  <p>See the list of projects</p>
                </Link>
                <Link to="/Createproject">
                  <p className="mt-5 ">Create a new project</p>
                </Link>
              </div>{" "}
              {/* end of text-container */}
            </div>{" "}
            {/* end of col */}
          </div>{" "}
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
      </div>{" "}
      {/* Footer */}
      <Footer />
    </div>
  );
}
