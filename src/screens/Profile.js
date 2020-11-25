import React, { useEffect, useState } from "react";
import "../Theme/css/profile.css";
import Header from "../Components/header";
import Footer from "../Components/footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
import { useStyles } from "../Theme/styles";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";

export default function Profile() {
  const [data, setData] = useState(" ");
  const [comment, setComment] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [commentArray, setCommentArray] = useState([]);
  console.log(commentArray, "commentArray");
  const onAdd = async () => {
    setCommentArray([...commentArray, comment]);

    // console.log(array, "array");

    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      await Axios.post(
        "http://localhost:3000/api/v1/profile/view-profile/comment",
        comment,
        headers
      )
        .then((res) => {
          setisLoading(false);
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    Axios.get(
      "http://localhost:3000/api/v1/profile/view-profile?id=5fb79fd6af6b9618dc2532e3",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjc5ZmQ2YWY2Yjk2MThkYzI1MzJlMyIsImlhdCI6MTYwNjE5MTAxOSwiZXhwIjoxNjA4NzgzMDE5fQ.1dZJyXkkQ8Gk2w2bf8L3xsgOZ3Q-o7uhcYC20YN1Xh0",
        },
      }
    ).then((res) => {
      setData(res.data.user);
    });
  }, [comment]);
  console.log(data, "All Data of User");
  if (data) {
    return (
      <div>
        <Header />
        <div id="services" className="cardSection">
          <div className="container ">
            <div className="row">
              <div style={{ width: "50%" }}>
                <h4 style={{ fontWeight: "600" }}>
                  Ne soyez plus seul pour realiser vos projects, soyez entoures
                  des meilleurs !
                </h4>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              <div style={{ width: "50%" }}>
                <p
                  className="mt-1 ml-3"
                  style={{ fontSize: "18px", color: "#707070" }}
                >
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs.
                </p>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              {/* end of col */}
            </div>{" "}
            {/* end of row */}
            {/* end of row */}
          </div>{" "}
          {/* end of container */}
        </div>{" "}
        {/* end of cardSection */}
        {/* end of services */}
        <div id="services" className="cardSection">
          <div className="container ">
            <div className="row pt-4" style={{ background: "#fcfcfc" }}>
              <div className="col-lg-1 text-center">
                <span>
                  <img
                    alt="facebook"
                    src="images/facebook.png"
                    style={{ width: "25px", height: "25px" }}
                  />
                </span>
                <div className="mt-4">
                  <img
                    alt="facebook"
                    src="images/instagram.png"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div className="mt-4">
                  <img
                    alt="facebook"
                    src="images/youtube.png"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              <div className="col-lg-2  text-left">
                <div className="card">
                  <img
                    className="card-image"
                    src={
                      !data.profile_picture
                        ? `http://localhost:3000/views/uploads/${data.profile_picture}`
                        : DefaultImage
                    }
                    alt="alternative"
                  />
                </div>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              <div className="col-lg-9  text-left">
                <div>
                  <h5>{data.username}</h5>
                  <hr style={{ border: "2px solid #c4bec2" }} />
                </div>
                <p className="mt-2">{data.profile_description}</p>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              {/* end of col */}
            </div>
            <div className="row " style={{ marginTop: "2rem" }}>
              <div className="col-lg-6">
                <p style={{ marginLeft: "6rem" }}>
                  <i className="fas fa-map-marker-alt fa-lg" />
                  <span className="ml-3">{data.city ? data.city : "City"}</span>
                </p>
              </div>
              <div className="col-lg-6">
                <p>
                  <i className="fas fa-search fa-lg" />
                  <span className="ml-3">
                    Interet pour :{" "}
                    {data.interests
                      ? data.interests.map((item, i) => {
                          return <span key={i}>{item + ","}</span>;
                        })
                      : " "}
                  </span>
                </p>
              </div>
            </div>
            <div className="row" style={{ marginTop: "2rem" }}>
              <div
                className="col-lg-12 text-left  p-1"
                style={{
                  background: "#fcfcfc",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <h3 className="mt-1 ml-3">PROFIL</h3>
              </div>
            </div>
            <div
              className="row text-left"
              style={{ marginLeft: "5rem", marginTop: "2rem" }}
            >
              <div className="col-lg-6">
                <p>
                  <i
                    className="fas fa-phone-volume fa-lg "
                    style={{ color: "#0d2456" }}
                  />
                  <span className="ml-2">{data.phone}</span>
                </p>
                <p style={{ marginTop: "1.5rem" }}>
                  <i
                    className="fas fa-camera fa-lg "
                    style={{ color: "#0d2456" }}
                  />
                  <span className="ml-2">
                    {data.email ? data.email : "email@email.com"}
                  </span>
                </p>
                <p style={{ marginTop: "1.5rem" }}>
                  <i className="fas fa-shopping-basket fa-lg " />
                  {data.material
                    ? data.material.map((mat) => (
                        <span className="ml-2">{mat}</span>
                      ))
                    : ""}
                </p>
              </div>
              <div className="col-lg-6" style={{ marginTop: "-0.8rem" }}>
                {data.skills
                  ? data.skills.map((skill) => (
                      <div
                        className=" ml-2  "
                        id="iconRow"
                        style={{ marginTop: "-0.3rem" }}
                      >
                        <p>
                          <small>{skill.skillField} - </small>
                          {skill.skill}
                          <br />
                          <span>
                            <i
                              className="fas fa-star fa-sm fa-sm"
                              style={{ color: "#ffe500" }}
                            />
                            <i
                              className="fas fa-star fa-sm "
                              style={{ color: "#ffe500" }}
                            />
                            <i
                              className="fas fa-star fa-sm "
                              style={{ color: "#ffe500" }}
                            />
                            <i className="fas fa-star fa-sm " />
                            <i className="fas fa-star fa-sm " />
                          </span>
                        </p>
                        <p style={{ marginRight: "8rem" }}>
                          <i className="fas fa-heart " />
                          {/* <span class="ml-2 " id="span2" >21%</span> */}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <div className="row " style={{ marginTop: "2rem" }}>
              <div
                className="col-lg-12 text-left  p-1"
                style={{
                  background: "#fcfcfc",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <h4 className="mt-1 ml-3">PROJECTS</h4>
              </div>
            </div>
            <div
              className="row text-left"
              style={{ marginTop: "2rem" }}
              id="projectPage"
            >
              <div className=" text-right" style={{ width: "20%" }}>
                <img
                  className="project-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
              </div>
              <div className="text-left" style={{ width: "50%" }}>
                <div style={{ marginLeft: "2rem" }}>
                  <p>E-Commerce</p>
                  <h6 style={{ marginTop: "-0.7rem" }}>
                    Creation d'un site e-commerce
                  </h6>
                  <small>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs. The
                    passage is attributed to an unknown typesetter in the 15th
                    century who is thought to have scrambled parts of Cicero's
                    De Finibus Bonorum et Malorum for use in a type specimen
                    book.
                  </small>
                </div>
              </div>
              <div className="  text-center" style={{ width: "30%" }}>
                <i
                  className="fas fa-circle fa-lg "
                  style={{ color: "#4B8B0B" }}
                />
                <button type="button" className="btn btn-block">
                  Voir Plus
                </button>
              </div>
              <div className="col-lg-12 text-right">
                <i
                  className="fas fa-heart fa-lg "
                  style={{ marginRight: "5rem" }}
                />
              </div>
            </div>

            <div
              className="row text-left"
              style={{ marginTop: "1rem" }}
              id="projectPage"
            >
              <div className=" text-right" style={{ width: "20%" }}>
                <img
                  className="project-image"
                  src="images/305b7327ab645935e179307a21247d89232a242a.png"
                  alt="alternative"
                />
              </div>
              <div className="text-left" style={{ width: "50%" }}>
                <div style={{ marginLeft: "2rem" }}>
                  <p>E-Commerce</p>
                  <h6 style={{ marginTop: "-0.7rem" }}>
                    Creation d'un site e-commerce
                  </h6>
                  <small>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs. The
                    passage is attributed to an unknown typesetter in the 15th
                    century who is thought to have scrambled parts of Cicero's
                    De Finibus Bonorum et Malorum for use in a type specimen
                    book.
                  </small>
                </div>
              </div>
              <div className="  text-center" style={{ width: "30%" }}>
                <i className="fas fa-circle fa-lg" />
                <button type="button" className="btn btn-block">
                  Voir Plus
                </button>
              </div>{" "}
              <div className="col-lg-12 text-right">
                <i
                  className="fas fa-heart fa-lg "
                  style={{ marginRight: "5rem" }}
                />
              </div>
            </div>

            <div
              className="row text-left"
              style={{ marginTop: "1rem" }}
              id="projectPage"
            >
              <div className=" text-right" style={{ width: "20%" }}>
                <img
                  className="project-image"
                  src="images/89dadc1055d5a03f7cc45e7dc36030fb11d6f236.png"
                  alt="alternative"
                />
              </div>
              <div className="text-left" style={{ width: "50%" }}>
                <div style={{ marginLeft: "2rem" }}>
                  <p>E-Commerce</p>
                  <h6 style={{ marginTop: "-0.7rem" }}>
                    Creation d'un site e-commerce
                  </h6>
                  <small>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs. The
                    passage is attributed to an unknown typesetter in the 15th
                    century who is thought to have scrambled parts of Cicero's
                    De Finibus Bonorum et Malorum for use in a type specimen
                    book.
                  </small>
                </div>
              </div>
              <div className="  text-center" style={{ width: "30%" }}>
                <i className="fas fa-circle fa-lg" />
                <button type="button" className="btn btn-block">
                  Voir Plus
                </button>
              </div>{" "}
              <div className="col-lg-12 text-right">
                <i
                  className="fas fa-heart fa-lg "
                  style={{ marginRight: "5rem" }}
                />
              </div>
            </div>

            {/* end of row */}
            {/* end of row */}
            <div className="row" style={{ marginTop: "2rem" }}>
              <div
                className="col-lg-12 text-left ml-2 p-1"
                style={{
                  background: "#fcfcfc",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <h4 className="mt-1 ml-3">COMMENTAIRIES</h4>
              </div>
            </div>
            <div className="row text-left" style={{ marginTop: "2rem" }}>
              <div className="text-right" style={{ width: "15%" }}>
                <img
                  className="com-image"
                  src="images/2ec3fab78d6bb56ad5ea7980d9013f7e3b39cdf3.png"
                  alt="alternative"
                />
              </div>
              <div className="text-left" style={{ width: "85%" }}>
                <div style={{ marginLeft: "2rem" }}>
                  <h5>
                    Franco Prefumo
                    <small className="ml-2"> 13/03/2020</small>
                  </h5>
                  <p className="mt-2" style={{ fontWeight: "bold" }}>
                    Lorem ipsum, or lipsum as it is sometimes known,{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="row text-left" style={{ marginTop: "2rem" }}>
              <div className=" text-right" style={{ width: "15%" }}>
                <img
                  className="com-image"
                  src="images/955f725149c7dca617c33a6ae75ec32bc0f12d5b.png"
                  alt="alternative"
                />
              </div>
              <div className="text-left" style={{ width: "85%" }}>
                <div style={{ marginLeft: "2rem" }}>
                  <h5>
                    Franco Prefumo
                    <small className="ml-2"> 13/03/2020</small>
                  </h5>
                  <p className="mt-2 " style={{ fontWeight: "bold" }}>
                    Lorem ipsum, or lipsum as it is sometimes known,{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="container ">
              <div
                className="row"
                style={{ marginTop: "2rem", marginLeft: "5rem" }}
              >
                <div style={{ width: "90%" }} className="text-right">
                  <textarea
                    name
                    id
                    cols={110}
                    value={comment}
                    name="comment"
                    onChange={handleChange}
                    rows={3}
                    style={{ width: "90%" }}
                    placeholder="  Add a coment"
                  />
                </div>

                <div style={{ width: "10%" }} className="text-center">
                  {isLoading === true ? (
                    <center>
                      <div className={useStyles.root}>
                        <CircularProgress disableShrink />
                      </div>
                    </center>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-block mt-4"
                      style={{ maxWidth: "80%" }}
                      onClick={onAdd}
                    >
                      Send
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
        {/* Details 1 */}
        {/* end of basic-1 */}
        {/* end of details 1 */}
        {/* Details 2 */}
        {/* end of basic-2 */}
        {/* end of details 2 */}
        {/* Details Lightboxes */}
        {/* Details Lightbox 1 */}
        {/* Footer */}
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <h1>loading....</h1>
      </div>
    );
  }
}
