import React, { memo } from "react";
import { Link } from "react-router-dom";

export default function projectList({
  data,
  totalLikes,
  DefaultImage,
  filter,
}) {
  console.log(data, "data filtered");
  if (filter === true && data.project) {
    return (
      <div className="col-lg-3 ">
        <div className="card">
          <Link to={`/SingleProject/${data.project._id}`}>
            <img
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
                data.project.general_photo
                  ? `http://localhost:3000/views/uploads/${data.project.general_photo}`
                  : DefaultImage
              }
              alt="alternative"
            />
          </Link>
          <div className="card-body mb-1">
            <span className="row ml-2">
              <img
                id="ImageSmall"
                src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                alt="alternative"
              />
              <h6 className="card-title ml-3">{data.project.title}</h6>
            </span>
            <p>{data.project.general_description}</p>
            <div className="w-100  ml-2 " id="iconRow">
              <span>
                <i className="fas fa-heart" />
                <span className="ml-2 " id="span2">
                  {totalLikes}
                </span>
              </span>
              <span id="second">
                <i className="far fa-circle" />
                <span className="ml-2 " id="span2">
                  {data.project.progress}
                </span>
              </span>
            </div>
            {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-lg-3 ">
        <div className="card">
          <Link to={`/SingleProject/${data._id}`}>
            <img
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
                data.general_photo
                  ? data.general_photo !== "default.png"
                    ? `http://localhost:3000/views/uploads/${data.general_photo}`
                    : DefaultImage
                  : ""
              }
              alt="alternative"
            />
          </Link>
          <div className="card-body mb-1">
            <span className="row ml-2">
              <img
                id="ImageSmall"
                src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                alt="alternative"
              />
              <h6 className="card-title ml-3">{data.title}</h6>
            </span>
            <p>{data.general_description}</p>
            <div className="w-100  ml-2 " id="iconRow">
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
            </div>
            {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
          </div>
        </div>
      </div>
    );
  }
}
