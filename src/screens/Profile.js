import React, { useEffect, useState } from "react";
import "../Theme/css/profile.css";
import Header from "../Components/header";
import Footer from "../Components/footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
import { useStyles } from "../Theme/styles";
import Button from "@material-ui/core/Button";
import ChipArray from "../shared/MaterialChip";
import axios from "axios";
import { getUser, SignOut } from "../Auth/Index";
import Popover from "@material-ui/core/Popover";
import { Link } from "react-router-dom";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import UserProjectList from "../Components/userprojectList";

import LikeUser from "../Components/RecommendUser";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";

import facebook from "../Theme/images/facebook.png";
import instagram from "../Theme/images/instagram.png";
import youtube from "../Theme/images/youtube.png";
import { useToasts } from "react-toast-notifications";
import Notifications from "../Components/Notifications";
import CommentsFromDB from "../Components/CommentsFromDB";
import Comments from "../Components/Comments";
import LoadedClients from "../shared/Loaders";
export default function Profile(props) {
  const { addToast } = useToasts();
  // states start ************************************

  const [data, setData] = useState({ data: "" });
  const [ProjectdataList, setProjectdataList] = useState([]);
  const [commentArray, setCommentArray] = useState([]);
  const [tempcommentArray, settempCommentArray] = useState([]);

  const [comment, setComment] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [commentError, setCommentError] = useState("");

  // *************
  const validateComment = () => {
    if (!comment) {
      setCommentError("Required");
      return false;
    } else {
      setCommentError("");
      return true;
    }
  };
  const onAdd = async () => {
    const tempCheck = validateComment();
    if (tempCheck == true) {
      setCommentError("");

      const date = new Date();
      const obj = {};
      obj.comment = comment;
      obj.date = date;
      obj.profile_picture = getUser().profile_picture;

      settempCommentArray([...tempcommentArray, obj]);

      try {
        const headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        };

        await Axios.post(
          `http://localhost:3000/api/v1/profile/view-profile/comment?id=${props.match.params.id}`,
          { comment: comment },
          headers
        )
          .then((res) => {
            setComment("");
            addToast("Success", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            setisLoading(false);
          })
          .catch((err) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);
            addToast("Error", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            // console.log(" error =>", err);
          });
      } catch (error) {
        // console.log(error, "error catch");
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      }
    } else {
      setCommentError("Required");
    }
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const RecommendUser = async (skillField, like, setlike) => {
    if (like === 0) {
      try {
        const headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        };

        await Axios.post(
          `http://localhost:3000/api/v1/profile/view-profile/recommendSkill?id=${props.match.params.id}`,
          { skillField: skillField },
          headers
        )
          .then((res) => {
            // setrecommendstatus(true);

            addToast("User recommended successfully", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          })
          .catch((err) => {
            addToast("Error", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });

            // console.log(" error recommend=>", err);
          });
      } catch (error) {
        // console.log(error, "error catch");
      }
    } else {
      setlike(0);
    }
  };
  const DeleteTempComment = async (commentId) => {
    if (tempcommentArray && tempcommentArray.length > 0) {
      const temparray = commentArray.filter((com) => com.comment !== commentId);
      // console.log(array, "array");
      settempCommentArray(temparray);
    }

    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      await axios
        .post(
          `http://localhost:3000/api/v1/profile/view-profile/delete-comment?id=${props.match.params.id}`,
          { commentId: commentId },
          headers
        )
        .then((res) => {
          // setComment("");
          addToast("Comment Deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setisLoading(false);
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          // console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  const DeleteComment = async (commentId) => {
    if (data.data && data.data.comments) {
      var array = data.data.comments.filter((com) => com._id !== commentId);
      console.log(array, "array main");
      setCommentArray(array);
    }
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      await axios
        .post(
          `http://localhost:3000/api/v1/profile/view-profile/delete-comment?id=${props.match.params.id}`,
          { commentId: commentId },
          headers
        )
        .then((res) => {
          // setComment("");
          addToast("Comment Deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setisLoading(false);
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          // console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };

  // *****

  const projectLike = (id, like, setlike) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    if (like === 0) {
      try {
        Axios.post(
          `http://localhost:3000/api/v1/project/view-project/likedBy?id=${id}`,
          {},
          headers
        )
          .then((res) => {
            addToast("Project like successfully", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            // console.log(res, "res like");
          })
          .catch((err) => {
            addToast("Error", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            // console.log(" error projects =>", err);
          });
      } catch (error) {
        // console.log(error, "error catch");
      }
    } else {
      setlike(0);
    }
  };

  // Toast

  const DeleteProfile = () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/profile/delete-profile?id=${props.match.params.id}`,
          {},
          headers
        )
        .then((res) => {
          addToast("Profile Deleted Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          SignOut();
          // console.log(res, "res material");
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  };
  // ****
  // useEffect
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    try {
      Axios.get("http://localhost:3000/api/v1/profile/myProjects", headers)
        .then((res) => {
          setProjectdataList(res.data.ownedProjects);
          // console.log(res.data, "res owened projects");
        })
        .catch((err) => {
          console.log(" error projects =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
    try {
      Axios.get(
        `http://localhost:3000/api/v1/profile/view-profile?id=${props.match.params.id}`,
        headers
      )
        .then((res) => {
          // const obj = { ...res.data };

          setData({ ["data"]: res.data.user });
          setCommentArray(res.data.user.comments);

          console.log(res.data, "res data user");
        })
        .catch((err) => {});
    } catch (error) {}
  }, []);
  // useEffect(() => {
  //   if (data.data && data.data.comments) {
  //     setCommentArray(data.data.comments);
  //   }
  // }, [comment]);
  console.log(commentArray, "comemnt array");
  if (Object.keys(data)) {
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
              </div>
              <div style={{ width: "50%" }}>
                <p
                  className="mt-1 ml-3"
                  style={{ fontSize: "18px", color: "#707070" }}
                >
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs.
                </p>
              </div>
              {/* end of col */}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div id="Cardservices" className="cardSection">
          <div className="container ">
            <div className="row pt-4" style={{ background: "#fcfcfc" }}>
              <div className="col-lg-1 text-center">
                <span>
                  <a href={`${data.data.facebook ? data.data.facebook : "#"}`}>
                    <img
                      alt="facebook"
                      src={facebook}
                      style={{ width: "25px", height: "25px" }}
                    />
                  </a>
                </span>
                <div className="mt-4">
                  <a
                    href={`${data.data.instagram ? data.data.instagram : "#"}`}
                  >
                    <img
                      alt="instagram"
                      src={instagram}
                      style={{ width: "25px", height: "25px" }}
                    />
                  </a>
                </div>
                <div className="mt-4">
                  <a href={`${data.data.youtube ? data.data.youtube : "#"}`}>
                    <img
                      alt="youtube"
                      src={youtube}
                      style={{ width: "25px", height: "25px" }}
                    />
                  </a>
                </div>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              <div className="col-lg-2  text-left">
                <div className="card">
                  <img
                    className="card-image"
                    src={
                      data.data.profile_picture
                        ? `http://localhost:3000/views/uploads/${data.data.profile_picture}`
                        : DefaultImage
                    }
                    alt="alternative"
                  />
                </div>
              </div>
              <div className="col-lg-9  text-left">
                <div>
                  <h5>{data.data.username}</h5>
                  <hr style={{ border: "2px solid #c4bec2" }} />
                </div>
                <p className="mt-2">{data.data.profile_description}</p>
              </div>
              {/* end of col */}
            </div>
            <div className="row " style={{ marginTop: "2rem" }}>
              <div className="col-lg-6">
                <p style={{ marginLeft: "6rem" }}>
                  <i className="fas fa-map-marker-alt fa-lg text-dark" />
                  <span className="ml-3">
                    {data.data.city ? data.data.city : "City"}
                  </span>
                </p>
              </div>
              <div className="col-lg-6">
                <p>
                  <i className="fas fa-search fa-lg text-dark" />
                  <span className="ml-3">
                    Interet pour :{" "}
                    {data.data.interests
                      ? data.data.interests.map((item, i) => {
                          return <span key={i}>{item.name + ","}</span>;
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
                <div className="row ml-3">
                  <div className="col-8">
                    <h4 className="mt-1" style={{ fontWeight: "bold" }}>
                      PROFIL
                    </h4>
                  </div>
                  <div className="col-4  ">
                    {getUser()._id === data.data._id ? (
                      <div className="row">
                        <div className="col ">
                          <button
                            onClick={DeleteProfile}
                            type="button"
                            className="btn btn-block text-uppercase"
                            style={{
                              fontSize: "15px",
                              border: 0,
                              maxWidth: "100%",
                            }}
                          >
                            Delete Profile
                          </button>
                        </div>

                        <div className="col">
                          <Link to={`/userdashboard/${props.match.params.id}`}>
                            <button
                              type="button"
                              className="btn btn-block"
                              style={{
                                fontSize: "15px",
                                border: 0,
                                maxWidth: "90%",
                              }}
                            >
                              MODIFIER
                            </button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row text-left"
              style={{ marginLeft: "1.6rem", marginTop: "2rem" }}
            >
              <div className="col-lg-6 ">
                <p>
                  <i
                    className="fas fa-phone-volume fa-lg "
                    style={{ color: "#0d2456" }}
                  />
                  <span className="ml-2">{data.data.phone}</span>
                </p>
                <p style={{ marginTop: "1.5rem" }}>
                  <i
                    className="fas fa-envelope fa-lg "
                    style={{ color: "#0d2456" }}
                  />
                  <span className="ml-2">
                    {data.data.email ? data.data.email : "email@email.com"}
                  </span>
                </p>
                <p style={{ marginTop: "1.5rem" }}>
                  <i className="fas fa-shopping-basket fa-lg " />
                  {Object.entries(data.data).length > 0
                    ? data.data.material.map((mat) => (
                        <span className="ml-2">{mat.name},</span>
                      ))
                    : ""}
                </p>
              </div>
              <div className="col-lg-6" style={{ marginTop: "-0.8rem" }}>
                {data.data.skills
                  ? data.data.skills.map((skill, i) => (
                      <div
                        className=" ml-2  "
                        key={i}
                        id="iconRow"
                        style={{ marginTop: "-0.3rem" }}
                      >
                        <LikeUser skill={skill} RecommendUser={RecommendUser} />
                      </div>
                    ))
                  : ""}
              </div>
            </div>

            {data.data && typeof data.data !== typeof "" ? (
              <>
                <div className="row " style={{ marginTop: "2rem" }}>
                  <div
                    className="col-lg-12 text-left  p-1"
                    style={{
                      background: "#fcfcfc",
                      margin: "auto",
                      position: "relative",
                    }}
                  >
                    <h4 className="mt-1 ml-4 text-bold">PROJETS</h4>
                  </div>
                </div>
                {data.data.projects.map((data, i) => (
                  <UserProjectList
                    data={data}
                    i={i}
                    DefaultImage={DefaultImage}
                    projectLike={projectLike}
                  />
                ))}
              </>
            ) : (
              <center>
                <h1>No project found</h1>
              </center>
            )}

            <div className="row" style={{ marginTop: "2rem" }}>
              <div
                className="col-lg-12 text-left  p-1"
                style={{
                  background: "#fcfcfc",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <h4 className="mt-1 ml-3 " style={{ fontWeight: "bold" }}>
                  COMMENTAIRIES
                </h4>
              </div>
            </div>
            {commentArray && commentArray.length > 0
              ? commentArray.map((comment) => (
                  <CommentsFromDB
                    comment={comment}
                    getUser={getUser}
                    data={data}
                    DefaultImage={DefaultImage}
                    DeleteComment={DeleteComment}
                    ClearOutlinedIcon={ClearOutlinedIcon}
                  />
                ))
              : ""}
            {tempcommentArray.length > 0
              ? tempcommentArray.map((comment) => (
                  <Comments
                    comment={comment}
                    getUser={getUser}
                    data={data}
                    DefaultImage={DefaultImage}
                    DeleteComment={DeleteTempComment}
                    ClearOutlinedIcon={ClearOutlinedIcon}
                  />
                ))
              : ""}
            {getUser()._id == props.match.params.id ? (
              ""
            ) : (
              <div className="container ">
                <div
                  className="row"
                  style={{ marginTop: "2rem", marginLeft: "3rem" }}
                >
                  <div style={{ width: "90%" }} className="text-right">
                    <textarea
                      name
                      id
                      cols={110}
                      value={comment}
                      name="comment"
                      onChange={handleCommentChange}
                      rows={3}
                      style={{ width: "90%" }}
                      placeholder="  Add a coment"
                      onBlur={validateComment}
                    />
                    {commentError !== "" ? (
                      <p
                        className="error text-left"
                        style={{ marginLeft: "6rem" }}
                      >
                        {" "}
                        {commentError}
                      </p>
                    ) : (
                      ""
                    )}
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
                        className="btn btn-block mt-4 ml-2"
                        style={{ maxWidth: "80%", padding: "6px 16px" }}
                        onClick={onAdd}
                      >
                        SEND
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* end of row */}
        </div>{" "}
        {/* Footer */}
        <Footer />
      </div>
    );
  } else {
    return <LoadedClients />;
  }
}
