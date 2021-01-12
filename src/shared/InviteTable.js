import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import InviteTableRow from "../Components/InviteTableRow";
import { projectData } from "./Data";
export default function UserTable(props) {
  const { data, addToast, invitationData, setinvitationData } = props;
  // ******
  // Accept invitation from project owner for collaboration

  const AcceptInviteCollaborator = async (
    setcheckDecision,
    projectId,
    stepId,
    decision,
    invitation
  ) => {
    var array = invitationData.filter((com) => com._id !== invitation);
    // console.log(array, "array main");
    setinvitationData(array);
    // alert("sender");
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/invite-collaborator/decison?id=${projectId}`,
          { step: stepId, decision: decision, invitation: invitation },
          headers
        )
        .then((res) => {
          if (res.data.message) {
            addToast(`${res.data.message}`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            if (window.socket) {
              // alert("hello");

              window.socket.emit(`sendNotification`, {
                id: data.project.project_owner._id,
                title: `Invitation Accepted on ${data.project.title}`,
                description: `Invitation Accepted on ${data.project.title}`,
                projectID: props.match.params.id,
              });
            }
          } else {
            addToast(`Success`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        })
        .catch((err) => {
          if (err.res.data.message) {
            addToast(`${err.res.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          } else {
            addToast(`Error`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };
  // Decline invitation from project owner for collaboration
  const DeclineInviteCollaborator = async (
    setcheckDecision,
    projectId,
    sender,
    decision,
    invitation
  ) => {
    var array = invitationData.filter((com) => com._id !== invitation);
    // console.log(array, "array main");
    setinvitationData(array);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/requests/decision?id=${projectId}`,
          { sender: sender, decision: decision, invitation: invitation },
          headers
        )
        .then((res) => {
          if (res.data.message) {
            addToast(`${res.data.message}`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            setcheckDecision(true);
            if (window.socket) {
              // alert("hello");

              window.socket.emit(`sendNotification`, {
                id: data.project.project_owner._id,
                title: `Invitation Declined on ${data.project.title}`,
                description: `Invitation Declined on ${data.project.title}`,
                projectID: props.match.params.id,
              });
            }
          } else {
            addToast(`Error`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }
        })
        .catch((err) => {
          if (err.res.data.message) {
            addToast(`${err.res.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          } else {
            addToast(`Error`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };

  // Accept Request to view private project from a user
  const AcceptRequestToView = async (
    setcheckDecision,
    projectId,
    sender,
    decision,
    invitation
  ) => {
    // alert(sender);
    var array = invitationData.filter((com) => com._id !== invitation);
    // console.log(array, "array main");
    setinvitationData(array);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/requests/decision?id=${projectId}`,
          { sender: sender, decision: decision, invitation: invitation },
          headers
        )
        .then((res) => {
          if (res.data.message) {
            addToast(`${res.data.message}`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            if (window.socket) {
              // alert("hello");

              window.socket.emit(`sendNotification`, {
                id: data.project.project_owner._id,
                title: `Invitation Accepted on ${data.project.title}`,
                description: `Invitation Accepted on ${data.project.title}`,
                projectID: props.match.params.id,
              });
            }
          } else {
            addToast(`Success`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        })
        .catch((err) => {
          if (err.res.data.message) {
            addToast(`${err.res.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          } else {
            addToast(`Error`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };

  // Decline Request to view private project from a user

  const DeclineRequestToView = async (
    setcheckDecision,
    projectId,
    sender,
    decision,
    invitation
  ) => {
    // alert(sender);
    var array = invitationData.filter((com) => com._id !== invitation);
    // console.log(array, "array main");
    setinvitationData(array);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/requests/decision?id=${projectId}`,
          { sender: sender, decision: decision, invitation: invitation },
          headers
        )
        .then((res) => {
          if (res.data.message) {
            addToast(`${res.data.message}`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            if (window.socket) {
              // alert("hello");

              window.socket.emit(`sendNotification`, {
                id: data.project.project_owner._id,
                title: `Invitation Declined on ${data.project.title}`,
                description: `Invitation Declined on ${data.project.title}`,
                projectID: props.match.params.id,
              });
            }
          } else {
            addToast(`Success`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        })
        .catch((err) => {
          if (err.res.data.message) {
            addToast(`${err.res.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          } else {
            addToast(`Error`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };

  // Accept request from a user to collaborate with us in a project
  const AcceptRequestToCollaborate = async (
    setcheckDecision,
    projectId,
    stepId,
    decision,
    invitation
  ) => {
    // alert(sender);
    var array = invitationData.filter((com) => com._id !== invitation);
    // console.log(array, "array main");
    setinvitationData(array);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/sendInviteToCollaborateByUser/decison?id=${projectId}`,
          { step: stepId, decision: decision, invitation: invitation },
          headers
        )
        .then((res) => {
          if (res.data.message) {
            addToast(`${res.data.message}`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            if (window.socket) {
              // alert("hello");

              window.socket.emit(`sendNotification`, {
                id: data.project.project_owner._id,
                title: `Invitation Accepted on ${data.project.title}`,
                description: `Invitation Accepted on ${data.project.title}`,
                projectID: props.match.params.id,
              });
            }
          } else {
            addToast(`Success`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        })
        .catch((err) => {
          if (err.res.data.message) {
            addToast(`${err.res.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          } else {
            addToast(`Error`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };

  // Decline request from a user to collaborate with us in a project
  const DeclineRequestToCollaborate = async (
    setcheckDecision,
    projectId,
    stepId,
    decision,
    invitation
  ) => {
    // alert(sender);
    var array = invitationData.filter((com) => com._id !== invitation);
    // console.log(array, "array main");
    setinvitationData(array);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/invite-collaborator/decison?id=${projectId}`,
          { step: stepId, decision: decision, invitation: invitation },
          headers
        )
        .then((res) => {
          if (res.data.message) {
            addToast(`${res.data.message}`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            if (window.socket) {
              // alert("hello");

              window.socket.emit(`sendNotification`, {
                id: data.project.project_owner._id,
                title: `Invitation Declined on ${data.project.title}`,
                description: `Invitation Declined on ${data.project.title}`,
                projectID: props.match.params.id,
              });
            }
          } else {
            addToast(`Success`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        })
        .catch((err) => {
          if (err.res.data.message) {
            addToast(`${err.res.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          } else {
            addToast(`Error`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }

          setcheckDecision(true);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };
  // *****************

  return (
    <Table bordered className="text-center">
      <thead>
        <tr>
          <th>Date of request</th>
          <th>Sent By</th>
          <th>Invite (For)</th>

          <th>Invite Type</th>
          <th>Project name </th>
          <th>Step name </th>
          <th>Invite status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {invitationData && invitationData.length > 0 ? (
          invitationData.map((project) =>
            project.type === "inviteProjectOwner" ? (
              <InviteTableRow
                project={project}
                DeclineFunc={DeclineRequestToCollaborate}
                data={data}
                type={project.type}
                AcceptFunc={AcceptRequestToCollaborate}
              />
            ) : project.type === "inviteCollaborator" ? (
              <InviteTableRow
                project={project}
                DeclineFunc={DeclineInviteCollaborator}
                data={data}
                type={project.type}
                AcceptFunc={AcceptInviteCollaborator}
              />
            ) : project.type === "viewProject" ? (
              <InviteTableRow
                project={project}
                DeclineFunc={DeclineRequestToView}
                data={data}
                type={project.type}
                AcceptFunc={AcceptRequestToView}
              />
            ) : (
              ""
            )
          )
        ) : (
          <tr>
            <td colSpan={8}>
              <p className="text-dark text-center mt-2">No invitations found</p>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
