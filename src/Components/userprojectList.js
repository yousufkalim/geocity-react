import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
export default function UserprojectList({
  data,
  i,
  DefaultImage,
  projectLike,
}) {
  //   const onLikeClick = (id) => {
  //     projectLike(id);
  //   };
  const [like, setlike] = useState(0);
  const LikeProject = (id) => {
    setlike(like + 1);
    projectLike(id, like, setlike);
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
          className="project-image"
          style={{
            border: `5px solid ${data.project.category.color} !important`,
          }}
          src={
            data.project.general_photo
              ? `http://localhost:3000/views/uploads/${data.project.general_photo}`
              : DefaultImage
          }
          alt="alternative"
        />
      </div>
      <div className="text-left" style={{ width: "50%" }}>
        <div style={{ marginLeft: "2rem" }}>
          <p>{data.project.category.name}</p>
          <h5 style={{ marginTop: "-0.7rem", fontWeight: "bold" }}>
            {data.project.title}
          </h5>
          <small>{data.project.general_description}</small>
        </div>
      </div>
      <div className="  text-center" style={{ width: "30%" }}>
        {data.project.progress === "InProgress" ? (
          <i className="fas fa-circle fa-lg " style={{ color: "#4B8B0B" }} />
        ) : data.project.progress === "completed" ? (
          <i className="fas fa-circle fa-lg " style={{ color: "#000" }} />
        ) : data.project.progress === "NoProgress" ? (
          <i className="fas fa-circle fa-lg " style={{ color: "red" }} />
        ) : (
          ""
        )}
        <Link to={`/SingleProject/${data.project._id}`}>
          <button type="button" className="btn btn-block">
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
          {like == 1 ? (
            <i
              className="fas fa-heart "
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => LikeProject(data.project._id)}
            />
          ) : (
            <i
              className="fas fa-heart "
              onClick={() => LikeProject(data.project._id)}
            />
          )}
          {/* {like == true ? data.Likes + 1 : data.Likes} */}
          {data.Likes + like}
        </p>
      </div>
    </div>
  );
}
