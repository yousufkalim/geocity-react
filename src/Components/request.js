import React, { memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

export default function UserprojectList({ data, i, DefaultImage }) {
  const { addToast } = useToasts();

  //   const onLikeClick = (id) => {
  //     projectLike(id);
  //   };
  //   console.log(data, "data from invitation");
  const AcceptFunc = async (projectId, sender, decision, invitation) => {
    // alert(sender);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://160.153.249.64:7002/api/v1/project/view-project/requests/decision?id=${projectId}`,
          { sender: sender, decision: decision, invitation: invitation },
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
  const DeclineFunc = async (projectId, sender, decision, invitation) => {
    // alert(sender);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://160.153.249.64:7002/api/v1/project/view-project/requests/decision?id=${projectId}`,
          { sender: sender, decision: decision, invitation: invitation },
          headers
        )
        .then((res) => {})
        .catch((err) => {
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
      <div className=" text-right" style={{ width: "20%" }}>
        <img
          className="card-image"
          //   style={{
          //     border: `5px solid ${data.project.category.color} !important`,
          //   }}
          src={
            data.sender.profile_picture
              ? `http://160.153.249.64:7002/views/uploads/${data.sender.profile_picture}`
              : DefaultImage
          }
          alt="alternative"
        />
      </div>
      <div className="text-left" style={{ width: "50%" }}>
        <div style={{ marginLeft: "2rem" }}>
          {/* <p>{data.name}</p> */}
          <h5 style={{ fontWeight: "bold" }}>{data.sender.username}</h5>
          <span style={{ fontSize: "14px" }}>
            {data.sender.profile_description}
          </span>
        </div>
      </div>
      <div className=" text-center" style={{ width: "30%" }}>
        <div className="row " style={{ marginLeft: "2rem" }}>
          <button
            type="button"
            onClick={() =>
              AcceptFunc(
                data.projectID._id,
                data.sender._id,

                "Accept",
                data._id
              )
            }
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
            onClick={() =>
              DeclineFunc(
                data.projectID._id,
                data.sender._id,

                "Decline",
                data._id
              )
            }
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
