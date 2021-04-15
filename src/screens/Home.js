import React, { useEffect, useState } from "react";
// import "../Theme/css/styles.css";
import Footer from "../Components/footer";
import { SignOut, isAuthenticated, getUser } from "../Auth/Index";
import { Link, withRouter } from "react-router-dom";
import lightbulb from "../Theme/images/Group 13.png";
import deal from "../Theme/images/geocity/deal.png";
import rocket from "../Theme/images/geocity/rocket.png";
import magnifier from "../Theme/images/geocity/magnifier.png";
import paperPlane from "../Theme/images/geocity/paper-plane.png";
import target from "../Theme/images/geocity/target.png";
import bulbMen from "../Theme/images/geocity/light-bulb.png";
import Group2 from "../Theme/images/Group2.png";
import DropDown from "../shared/DropdownMenu";
import NotificationMenu from "../shared/NotificationMenu";
import Header from "../Components/HomeHeader";
import { useToasts } from "react-toast-notifications";
import io from "socket.io-client";
function Home({ setdata, data }) {
  const { addToast } = useToasts();
  useEffect(() => {
    window.socket = io(
      process.env.REACT_APP_SOCKET_URL || "http://160.153.249.64:7002",
      {
        query: `userConnectionId=${getUser()._id}`,
      }
    );
    if (window.socket) {
      window.socket.on(`recieveNotification${getUser()._id}`, (datas) => {
        setdata([...data, datas]);
        console.log(datas, "datas");
        addToast(datas.title, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      });
    }
  }, []);
  return (
    <div>
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
            <Link to="/" className="navbar-brand logo-image">
              GEOCITY
            </Link>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link ">
                  Home <span className="sr-only">(current)</span>
                </Link>
                {/* <a className="nav-link " href="#header">Home <span className="sr-only">(current)</span></a> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ProjectList">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <a href="#services" className="nav-link ">
                  Comment cela fontctionne
                </a>
              </li>
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
            {!isAuthenticated() ? (
              ""
            ) : (
              <NotificationMenu data={data} setdata={setdata} />
            )}
            {!isAuthenticated() ? "" : <DropDown />}
          </div>
        </nav>{" "}
        <div className="header-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="text-container">
                  <h2>
                    <span className="turquoise">Vous avez un project ?</span>{" "}
                  </h2>
                  <h2>
                    <span className="turquoise">
                      Trouvez donc vos collaborateurs !
                    </span>{" "}
                  </h2>
                  <p className="p-large">
                    Plateforme vous permettant de trouver vos collaborateurs
                    selon les competences necesseries, et ce pour chaque etape
                    de votre project
                  </p>
                  <a className="btn-solid-lg " href="#services">
                    En savoir plus{" "}
                  </a>
                </div>{" "}
                {/* end of text-container */}
              </div>{" "}
              {/* end of col */}
              <div className="col-lg-5"></div>
            </div>{" "}
            {/* end of row */}
          </div>{" "}
          {/* end of container */}
        </div>{" "}
        {/* end of header-content */}
      </header>
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
              <h2 className="h2-heading" style={{ fontWeight: "700" }}>
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
            <div className="col-lg-5 text-right col-md-12">
              <div className="row text-right image-container">
                <img className=" bulb-men" src={bulbMen} alt="alternative" />
              </div>{" "}
              {/* end of image-container */}
            </div>{" "}
            {/* end of col */}
            <div className="col-lg-7 col-md-12">
              <div className="box-container">
                <h2 className="project_title text-white">
                  Lancez-vous maintenant !
                </h2>
                <div className="Project_List">
                  <Link to="/ProjectList">
                    <p>See the list of projects</p>
                  </Link>
                </div>
                <div className="Project_List ">
                  <Link to="/Createproject">
                    <p>Create a new project</p>
                  </Link>
                </div>
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
export default withRouter(Home);
