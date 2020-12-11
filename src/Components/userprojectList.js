import React, { memo } from "react";
import { Link } from "react-router-dom";
export default function userprojectList({
  data,
  i,
  DefaultImage,
  projectLike,
  like,
}) {
  //   const onLikeClick = (id) => {
  //     projectLike(id);
  //   };
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
          <i
            className="fas fa-heart  "
            onClick={() => projectLike(data.project._id)}
          />
          {/* {like == true ? data.Likes + 1 : data.Likes} */}
          {data.Likes}
        </p>
      </div>
    </div>
  );
}
