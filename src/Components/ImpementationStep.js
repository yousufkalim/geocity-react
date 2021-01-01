import React from "react";
import { Link } from "react-router-dom";
export default function ImpementationStep({
  step,
  getUser,
  data,
  DefaultImage,
  Steptoggle,
  ShowInterest,
  toggle,
}) {
  return (
    <div
      className="row text-left"
      style={{ marginTop: "2rem" }}
      id="projectPage"
    >
      <div className=" text-left" style={{ width: "60%" }}>
        <div style={{ marginLeft: "2rem" }}>
          <p>
            <i
              className="fas fa-circle fa-lg mr-3 "
              style={{
                color: `${
                  step.status === "completed"
                    ? "#000"
                    : step.status === "InProgress"
                    ? "green"
                    : step.status === "NoProgress"
                    ? "#c9c9c9"
                    : ""
                }`,
              }}
            />
            <span
              style={{
                fontSize: "16px",
                color: "#707070",
              }}
            >
              {step.name}
            </span>
          </p>
          <div className="row" style={{ marginTop: "-0.7rem" }}>
            <p style={{ width: "56%", marginLeft: "3.3rem" }}>
              {console.log(step.skills, "ste.skills")}
              {step.skills ? (
                Object.entries(step.skills).length > 0 ? (
                  <p
                    style={{
                      color: "#707070",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "unset",
                        fontSize: "13px",
                      }}
                    >
                      {" "}
                      Field
                    </span>{" "}
                    :
                    <span
                      className="ml-1"
                      style={{
                        fontWeight: "unset",
                        fontSize: "12px",
                      }}
                    >
                      {step.skills.skillField.skillField}
                    </span>
                  </p>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {step.material ? (
                Object.entries(step.material).length > 0 ? (
                  <p
                    style={{
                      color: "#707070",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "unset",
                        fontSize: "13px",
                      }}
                    >
                      {" "}
                      Material
                    </span>{" "}
                    :
                    <span
                      className="ml-1"
                      style={{
                        fontWeight: "unset",
                        fontSize: "12px",
                      }}
                    >
                      {step.material.name}
                    </span>
                  </p>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <p
                style={{
                  color: "#707070",
                  marginTop: "-1rem",
                }}
              >
                <span
                  style={{
                    fontWeight: "unset",
                    fontSize: "13px",
                  }}
                >
                  {" "}
                  Description
                </span>{" "}
                :
                <span
                  className="ml-1"
                  style={{
                    fontWeight: "unset",
                    fontSize: "12px",
                  }}
                >
                  {step.description}
                </span>
              </p>
            </p>
            {getUser()._id === data.project.project_owner._id &&
            data.project.progress !== "100%" ? (
              <p id="entapeSearch">
                {step.skills && Object.entries(step.skills).length > 0 ? (
                  <i
                    className="fas fa-search fa-lg  text-secondary"
                    onClick={() =>
                      toggle("skills", step.skills.skillField._id, step._id)
                    }
                  />
                ) : step.material ? (
                  <i
                    className="fas fa-search fa-lg  text-secondary"
                    onClick={() =>
                      toggle("material", step.material._id, step._id)
                    }
                  />
                ) : (
                  ""
                )}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="  text-left" style={{ width: "25%" }}>
        {step.contributing_user ? (
          <>
            <p style={{ color: "rgb(112, 112, 112)" }}>Collaborateurs: </p>

            <p>
              {step.contributing_user.map((cont) => (
                <Link to={`/profile/${cont._id}`}>
                  <img
                    className="project-image-sm"
                    src={
                      cont.profile_picture
                        ? `http://localhost:3000/views/uploads/${cont.profile_picture}`
                        : DefaultImage
                    }
                    alt="alternative"
                  />
                </Link>
              ))}
            </p>
          </>
        ) : (
          ""
        )}
      </div>
      <div style={{ width: "15%" }}>
        {getUser()._id === data.project.project_owner._id &&
        data.project.progress !== "100%" ? (
          <button
            onClick={() => Steptoggle(step._id)}
            type="button"
            // id="modifyButton"
            style={{ maxWidth: "90%" }}
            className="btn btn-block ml-1 mt-3"
          >
            MODIFIER
          </button>
        ) : data.project.progress === "100%" ||
          step.contributing_user.find((el) => el == getUser()._id) !== "" ? (
          ""
        ) : (
          <button
            onClick={() => ShowInterest(step._id)}
            type="button"
            // id="modifyButton"
            style={{ maxWidth: "80%" }}
            className="btn btn-block ml-1 mt-3"
          >
            Show Interest
          </button>
        )}
      </div>
    </div>
  );
}
