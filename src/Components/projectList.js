import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { getUser } from "../Auth/Index";
import PrivateModal from "../shared/PrivateModal";
export default function ProjectList({
  data,
  totalLikes,
  DefaultImage,
  filter,
  RequestToView,
  ProjectLike,
  like,
}) {
  const [check, setcheck] = useState(false);
  const [modal, setModal] = useState(false);

  const onRequestToView = (id) => {
    RequestToView(id);
  };
  const onProjectLike = () => {
    ProjectLike();
  };
  const CheckRedirect = () => {
    if (filter === true) {
      if (getUser()._id !== data.project_owner && data.type === "Private") {
        setModal(!modal);
      } else {
        setcheck(true);
      }
    } else {
      if (getUser()._id !== data.project_owner && data.type === "Private") {
        setModal(!modal);
      } else {
        setcheck(true);
      }
    }
  };

  if (filter === true && data.project) {
    if (check == true) {
      return <Redirect to={`/SingleProject/${data._id}`} />;
    } else {
      return (
        <>
          <PrivateModal toggle={CheckRedirect} modal={modal} />

          <div className="col-lg-3 ">
            <div className="card">
              {/* <Link to={`/SingleProject/${data.project._id}`}> */}
              <img
                onClick={CheckRedirect}
                className="card-image"
                style={{
                  border: `${
                    data.project.category
                      ? data.project.category.color
                        ? `5px solid ${data.project.category.color}`
                        : ""
                      : ""
                  }`,
                }}
                src={
                  data.project.type === "Private" &&
                  getUser()._id !== data.project.project_owner
                    ? DefaultImage
                    : data.project.general_photo
                    ? `http://localhost:3000/views/uploads/${data.project.general_photo}`
                    : DefaultImage
                }
                alt="alternative"
              />
              {/* </Link> */}
              <div className="card-body mb-1">
                <span className="row ml-2">
                  <img
                    id="ImageSmall"
                    src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                    alt="alternative"
                  />
                  <h6 className="card-title ml-3">
                    {data.project.type === "Private" &&
                    getUser()._id !== data.project.project_owner
                      ? data.project.type
                      : data.project.title}
                  </h6>
                </span>
                <p>
                  {data.project.type === "Private" &&
                  getUser()._id !== data.project.project_owner
                    ? "This project is private"
                    : data.project.general_description}
                </p>
                <div className="w-100  ml-2 " id="iconRow">
                  <span>
                    {like == 1 ? (
                      <i
                        className="fas fa-heart "
                        style={{ color: "red" }}
                        onClick={onProjectLike}
                      />
                    ) : (
                      <i className="fas fa-heart " onClick={onProjectLike} />
                    )}
                    <span className="ml-2 " id="span2">
                      {data.project.type &&
                      (getUser()._id !== data.project.project_owner) ===
                        "Private"
                        ? ""
                        : totalLikes}
                    </span>
                  </span>
                  <span id="second">
                    <i className="far fa-circle" />
                    <span className="ml-2 " id="span2">
                      {data.project.type === "Private" &&
                      getUser()._id !== data.project.project_owner
                        ? ""
                        : data.project.progress}
                    </span>
                  </span>
                </div>
                {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    if (check === true) {
      return <Redirect to={`/SingleProject/${data._id}`} />;
    } else {
      return (
        <>
          <PrivateModal toggle={CheckRedirect} modal={modal} />
          <div className="col-lg-3 ">
            <div className="card">
              <img
                onClick={CheckRedirect}
                className="card-image"
                style={{
                  border: `${
                    data.category
                      ? data.category.color
                        ? `5px solid ${data.category.color}`
                        : ""
                      : ""
                  }`,
                }}
                src={
                  data.type === "Private" &&
                  getUser()._id !== data.project_owner
                    ? DefaultImage
                    : data.type === "Private" &&
                      data.usersToView.map((user) => {
                        return user;
                      }) == getUser()._id
                    ? DefaultImage
                    : data.general_photo
                    ? `http://localhost:3000/views/uploads/${data.general_photo}`
                    : DefaultImage
                }
                alt="alternative"
              />

              <div className="card-body mb-1">
                <span className="row ml-2">
                  <img
                    id="ImageSmall"
                    src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                    alt="alternative"
                  />
                  <h6 className="card-title ml-3">
                    {data.type === "Private" &&
                    getUser()._id !== data.project_owner
                      ? data.type
                      : data.type === "Private" &&
                        data.usersToView.map((user) => {
                          return user;
                        }) == getUser()._id
                      ? data.type
                      : data.title}
                  </h6>
                </span>
                <p>
                  {data.type === "Private" &&
                  getUser()._id !== data.project_owner
                    ? "This Project is private"
                    : data.type === "Private" &&
                      data.usersToView.map((user) => {
                        return user;
                      }) == getUser()._id
                    ? "This Project is private"
                    : data.general_description}
                </p>
                <div className="w-100  ml-2 " id="iconRow">
                  {data.type === "Private" &&
                  getUser()._id !== data.project_owner ? (
                    <button
                      type="button"
                      style={{ fontSize: "0.9rem" }}
                      id="modalButton"
                      className="btn  ml-1"
                      onClick={() => onRequestToView(data._id)}
                    >
                      Request To View
                    </button>
                  ) : data.type === "Private" &&
                    data.usersToView.map((user) => {
                      return user;
                    }) == getUser()._id ? (
                    <button
                      type="button"
                      style={{ fontSize: "0.9rem" }}
                      id="modalButton"
                      className="btn  ml-1"
                      onClick={() => onRequestToView(data._id)}
                    >
                      Request To View
                    </button>
                  ) : (
                    <>
                      <span>
                        <i className="fas fa-heart" />
                        <span className="ml-2 " id="span2">
                          {totalLikes}
                        </span>
                      </span>
                      <span id="second">
                        <i className="far fa-circle" />
                        <span className="ml-2 " id="span2">
                          {data.progress}
                        </span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
