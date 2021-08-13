import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { url } from "../urlConfig";

export default function ImpementationStep({
  step,
  getUser,
  data,
  DefaultImage,
  Steptoggle,
  ShowInterest,
  toggle,
  DeleteStep,
  CircularProgress,
  useStyles,
  paramID,
}) {
  const [show, setShow] = useState(false);
  const [isShown, setisShown] = useState(false);
  const [isSent, setisSent] = useState(false);

  const onShowInterest = (id) => {
    ShowInterest(id, setisShown);
  };
  const FilterUser = (step) => {
    let fill = step?.user_requests?.some((dt) => dt === getUser()._id);
    if (fill === false) {
      return (
        <button
          onClick={() => onShowInterest(step._id)}
          type="button"
          // id="modifyButton"

          className="btn btn-block ml-1 mt-3"
        >
          Show Interest
        </button>
      );
    } else {
      return (
        <button type="button" className="btn btn-block ml-1 mt-3">
          Pending
        </button>
      );
    }
  };
  useEffect(() => {
    if (getUser().interests && getUser().interests.length > 0) {
      let isFill = getUser().interests.some((dt) => dt === `${paramID}`);
      setisSent(isFill);
    }
  }, []);
  return (
    <div
      className="row text-left"
      style={{ marginTop: "2rem" }}
      id="projectPage"
    >
      <div
        className="col-lg-6 col-md-6 col-sm-5 col-xs-5 text-left"
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div>
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
                {step.name.substring(0, 50)}
                <p
                  style={{
                    marginLeft: "2rem",
                    marginTop: "5px",
                  }}
                >
                  {step.skills ? (
                    Object.entries(step.skills).length > 0 ? (
                      <>
                        <p
                          style={{
                            color: "#707070",
                            margin: "0px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "unset",
                              fontSize: "13px",
                            }}
                          >
                            Field
                          </span>
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
                            Intentions
                          </span>
                          :
                          <span
                            className="ml-1"
                            style={{
                              fontWeight: "unset",
                              fontSize: "12px",
                            }}
                          >
                            {step.skills.intentions}
                          </span>
                        </p>
                      </>
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
                      {step.description.substring(0, 50)}
                    </span>
                  </p>
                </p>
              </span>
            </p>
          </div>
          {/* search icon */}
          <div className="text-center" style={{ paddingTop: "1.5rem" }}>
            {getUser()._id === data.project.project_owner._id &&
            data.project.progress !== "100%" &&
            step.status !== "completed" ? (
              <p>
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
                ) : step.skills.intentions ? (
                  <>
                    <i
                      className="fas fa-search fa-lg  text-secondary"
                      onClick={() =>
                        toggle("intention", step.skills.intentions, step._id)
                      }
                    />
                    {console.log(step.skills.intentions, "date")}
                  </>
                ) : (
                  ""
                )}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* serach icon end */}
      </div>

      <div
        className="col-lg-6 col-md-6 col-sm-6 col-xs-6  text-left"
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <div>
            {step.contributing_user ? (
              <>
                <p
                  className="collaborator"
                  style={{ color: "rgb(112, 112, 112)" }}
                >
                  Collaborateurs:{" "}
                </p>

                <p>
                  {step.contributing_user.map((cont) => (
                    <Link to={`/profile/${cont._id}`}>
                      <img
                        className="project-image-sm"
                        src={
                          cont.profile_picture
                            ? `${url}/views/uploads/${cont.profile_picture}`
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
          <div>
            {getUser()._id === data.project.project_owner._id &&
            data.project.progress !== "100%" ? (
              <div
                className="text-right"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  onMouseOver={() => setShow(true)}
                  onMouseOut={() => setShow(false)}
                >
                  <button
                    onClick={() => Steptoggle(step._id)}
                    type="button"
                    // id="modifyButton"

                    className="btn btn-block ml-1 mt-3"
                  >
                    Modifier
                  </button>
                </div>
                <div
                  onMouseOver={() => setShow(true)}
                  onMouseOut={() => setShow(false)}
                  className="ml-2"
                >
                  <div
                    // onMouseOver={() => setShow(true)}
                    style={{ display: show == true ? "block" : "none" }}
                  >
                    <ClearOutlinedIcon
                      id="clear"
                      onClick={() => DeleteStep(step._id)}
                    />
                  </div>
                </div>
              </div>
            ) : data.project.progress === "100%" ||
              step.status === "completed" ||
              step.contributing_user.find((el) => el._id == getUser()._id) ? (
              ""
            ) : isShown == false ? (
              FilterUser(step)
            ) : (
              <div className={useStyles.root}>
                <CircularProgress disableShrink />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
