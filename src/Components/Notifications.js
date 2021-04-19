import React, { memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

export default function UserprojectList({ i, DefaultImage, data }) {
  const { addToast } = useToasts();

  //   const onLikeClick = (id) => {
  //     projectLike(id);
  //   };
  //   console.log(data, "data from invitation");
  const AcceptFunc = async (projectId) => {
    // alert(sender);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `https://api.geocity.io/api/v1/project/take-decision?id=${projectId}`,
          { decision: "Yes" },
          headers
        )
        .then((res) => {
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };
  const DeclineFunc = async (projectId) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `https://api.geocity.io/api/v1/project/take-decision?id=${projectId}`,
          { decision: "No" },
          headers
        )
        .then((res) => {
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };
  return (
    <div
      key={i}
      className="row text-left"
      style={{ marginTop: "2rem" }}
      id="projectPage"
    >
      <div className=" text-right" style={{ width: "15%" }}>
        <img
          className="card-image"
          //   style={{
          //     border: `5px solid ${data.project.category.color} !important`,
          //   }}
          src={DefaultImage}
          alt="alternative"
        />
      </div>
      <div className="text-left" style={{ width: "55%" }}>
        <div style={{ marginLeft: "2rem" }}>
          {/* <p>{data.name}</p> */}
          <h5 style={{ fontWeight: "bold" }}>{data.title}</h5>
          <span style={{ fontSize: "14px" }}>{data.description}</span>
        </div>
      </div>
      <div className=" text-center" style={{ width: "30%" }}>
        <div className="row " style={{ marginLeft: "2rem" }}>
          <button
            onClick={() => AcceptFunc(data.projectID)}
            type="button"
            style={{
              display: "inline-block",
              marginTop: "10px",
              maxWidth: "40%",
            }}
            className="btn btn-block"
          >
            Accept
          </button>
          <button
            onClick={() => DeclineFunc(data.projectID)}
            type="button"
            style={{
              display: "inline-block",
              marginTop: "10px",
              maxWidth: "40%",
            }}
            className="btn btn-block ml-3"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
