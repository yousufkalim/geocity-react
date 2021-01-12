import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
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
      className="row text-left"
      style={{ marginTop: "2rem" }}
      id="projectPage"
    >
      <div className=" text-right" style={{ width: "20%" }}>
        <img
          style={{
            border: `5px solid ${data.category.color}`,
          }}
          className="project-image"
          src={
            data.general_photo == "default.png"
              ? DefaultImage
              : `http://localhost:3000/views/uploads/${data.general_photo}`
          }
          alt="alternative"
        />
      </div>
      <div className="text-left" style={{ width: "50%" }}>
        <div style={{ marginLeft: "2rem" }}>
          <p style={{ color: data.category.color }}>{data.category.name}</p>
          <h5 style={{ marginTop: "-0.7rem", fontWeight: "bold" }}>
            {data.title}
          </h5>
          <small>{data.general_description}</small>
        </div>
      </div>
      <div className="  text-center" style={{ width: "30%" }}>
        {data.progress === "InProgress" ? (
          <i className="fas fa-circle fa-lg " style={{ color: "#4B8B0B" }} />
        ) : data.progress === "completed" ? (
          <i className="fas fa-circle fa-lg " style={{ color: "#000" }} />
        ) : data.progress === "NoProgress" ? (
          <i className="fas fa-circle fa-lg " style={{ color: "red" }} />
        ) : (
          ""
        )}
        <Link to={`/SingleProject/${data._id}`}>
          <button type="button" className="btn btn-block text-uppercase">
            Voir Plus
          </button>
        </Link>
      </div>
      <div className="col-lg-12 text-right">
        {/* style={{ marginRight: "5rem", color: "grey" } */}
        <p
          style={{
            // color: like === true ? "red" : "grey",
            color: "grey",
            marginRight: "5rem",
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
