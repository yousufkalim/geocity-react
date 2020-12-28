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
            border: `5px solid ${data.category.color} !important`,
          }}
          src={
            data.general_photo
              ? `http://localhost:3000/views/uploads/${data.general_photo}`
              : DefaultImage
          }
          alt="alternative"
        />
      </div>
      <div className="text-left" style={{ width: "50%" }}>
        <div style={{ marginLeft: "2rem" }}>
          <p>{data.category.name}</p>
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
          {like == 1 ? (
            <i
              className="fas fa-heart "
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => LikeProject(data._id)}
            />
          ) : (
            <i
              className="fas fa-heart "
              onClick={() => LikeProject(data._id)}
            />
          )}
          {/* {like == true ? data.Likes + 1 : data.Likes} */}
          {data.likedBy.length + like}
        </p>
      </div>
    </div>
  );
}
