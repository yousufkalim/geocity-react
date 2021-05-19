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
import ProjectList from "../Components/projectList";
import axios from "axios";
import Loaders from "../shared/Loaders";
import DefaultImage from "../Theme/images/index2.png";
export default function Home({ notificationsData }) {
  const [projectData, setProjectData] = useState("");

  useEffect(() => {
    try {
      axios
        .get("https://api.geocity.io/api/v1/auth/projectList")
        .then((res) => {
          setProjectData(res.data.projects);
        })
        .catch((err) => console.log(" error project =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, []);
  return (
    <div>
      <Header data={notificationsData} />
      <div id="services" className="cards-1">
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-12">
              <h2 className="text-center">Comment cela fontctionne ?</h2>
            </div>
          </div>
          <div className="row section_2">
            <div
              className="div1 col-lg-6 col-md-12 col-sm-12"
              style={{ backgroundColor: "#00bcb6" }}
            >
              <p>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage is
                attributed to an unknown typesetter in the 15th century who is
                thought to have scrambled parts of Cicero's De Finibus Bonorum
                et Malorum for use in a type specimen book.
                <br />
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book it has?
              </p>
            </div>

            <div className="div2 col-lg-6 col-md-12 col-sm-12">
              <div className="imageBlock" style={{ border: "10px solid blue" }}>
                <img
                  src={projectImage}
                  alt="GeoCity Project"
                  className="geocity-image"
                />
              </div>
              <div className="card_block">
                <div className="d-flex align-items-center pt-2">
                  <img src={avatarimage} alt="avatar" className="avatar" />

                  <h5 className="text-bold pl-3">Geocity</h5>
                </div>
                <div className="col-lg-8 col-md-12 ">
                  <p className="pt-1">
                    <b>Description</b>: What is Lorem Ipsum Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book it has?
                  </p>
                </div>
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

            {/* end of col */}
          </div>{" "}
          <div className="section_3 w-100">
            {projectData ? (
              projectData.length > 0 ? (
                <div className="row">
                  {projectData.slice(0, 4).map((data) => (
                    <div className="div2 col-lg-3 col-md-12 col-sm-12">
                      <div className="imageBlock">
                        <img
                          style={{
                            border: `${
                              data.project.category
                                ? data.project.category.color
                                  ? `5px solid ${data.project.category.color}`
                                  : "5px solid #000"
                                : ""
                            }`,
                          }}
                          src={
                            data.project.general_photo
                              ? `https://api.geocity.io/views/uploads/${data.project.general_photo}`
                              : DefaultImage
                          }
                          alt="GeoCity Project"
                          className="geocity-image"
                        />
                      </div>
                      <div className="card_block">
                        <div className="d-flex align-items-center pt-2 ">
                          <img
                            src={
                              data.project.general_photo
                                ? `https://api.geocity.io/views/uploads/${data.project.general_photo}`
                                : DefaultImage
                            }
                            alt="avatar"
                            className="avatar"
                          />

                          <h5 className="text-bold pl-3">
                            {data.project.title}
                          </h5>
                        </div>
                        <div className="col-lg-8 col-md-12 ">
                          <p className="pt-1">
                            <b>Description</b>:{" "}
                            {data.project.general_description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <center className="p-3">
                  <h5>No project found</h5>
                </center>
              )
            ) : (
              <Loaders />
            )}
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="row section_4">
                <div className="btn_1  col-lg-6 col-sm-4 col-md-6">
                  <Link className="btn-outline-bm" to="/ProjectList">
                    Voir tous les projets
                  </Link>
                </div>
                <div className=" btn_2  col-lg-6 col-sm-4 col-md-6">
                  <Link className="btn-outline-bj" to="/Createproject">
                    Creer un nouveau projet
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
