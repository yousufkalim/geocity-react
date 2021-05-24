import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../Auth/Index";
import ProjectOwnerImage from "../Theme/images/geocity/Image 35.png";
export default function UserprojectList({
  data,
  i,
  DefaultImage,
  projectLike,
  projectunLike,
}) {
  //   const onLikeClick = (id) => {
  //     projectLike(id);
  //   };
  const [like, setlike] = useState(0);
  const LikeProject = (id, likedBy) => {
    setlike(like + 1);
    projectLike(id, like, setlike, likedBy);
  };
  const UnLikeProject = (id, likedBy) => {
    setlike(0);
    projectunLike(id, like, setlike, likedBy);
  };
  return (
    <div
      key={i}
      className="row "
      style={{ marginTop: "2rem" }}
      id="projectPage"
    >
      <div className=" col-lg-9 col-md-8 col-sm-12 col-xs-12">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="col-lg-3  ">
            <img
              style={{
                border: `5px solid ${data.category.color}`,
              }}
              className="project-image"
              src={
                data.general_photo == "default.png"
                  ? DefaultImage
                  : `http://localhost:1190/views/uploads/${data.general_photo}`
              }
              alt="alternative"
            />
          </div>

          <div className="text-left col-lg-9 " style={{ marginLeft: "1rem" }}>
            <p style={{ color: data.category.color }}>{data.category.name}</p>

            <h5 style={{ marginTop: "-0.7rem", fontWeight: "bold" }}>
              {data.title}
            </h5>
            <small>{data.general_description}</small>
          </div>

          {/* style={{ marginRight: "5rem", color: "grey" } */}
        </div>
      </div>
      <div className="text-center col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <div className="viewmore">
          <div className="row ">
            {getUser()._id === data.project_owner ? (
              <p>
                <img
                  src={ProjectOwnerImage}
                  style={{ marginTop: "5px", height: "20px" }}
                />
              </p>
            ) : (
              ""
            )}
            {data.progress >= "0%" ? (
              <i
                className="fas fa-circle fa-lg "
                style={{
                  color: "green",
                  marginTop: "6px",
                  fontSize: "20px",
                }}
              />
            ) : data.progress === "100%" ? (
              <i
                className="fas fa-circle fa-lg "
                style={{ color: "#000", marginTop: "5px" }}
              />
            ) : (
              <i
                className="fas fa-circle fa-lg "
                style={{ color: "red", marginTop: "5px" }}
              />
            )}
            <Link to={`/SingleProject/${data._id}`}>
              <button
                type="button"
                style={{
                  maxWidth: "100%",
                  paddingRight: "2rem",
                  paddingLeft: "2rem",
                  paddingTop: "0.2rem",
                  paddingBottom: "0.2rem",
                }}
                className="btn btn-block "
              >
                Voir Plus
              </button>
            </Link>
          </div>
        </div>
        <p
          style={{
            // color: like === true ? "red" : "grey",
            color: "grey",
            position: "absolute",
            bottom: "-32px",
            right: "16px",
          }}
        >
          {like >= 1 ? (
            <i
              className="fas fa-heart "
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => UnLikeProject(data._id, data.likedBy)}
            />
          ) : (
            <i
              className="fas fa-heart "
              onClick={() => LikeProject(data._id, data.likedBy)}
            />
          )}
          {/* {like == true ? data.Likes + 1 : data.Likes} */}
          {data.likedBy.length + like}
        </p>
      </div>
    </div>
  );
}
