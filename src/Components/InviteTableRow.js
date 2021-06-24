import React, { useState } from "react";

export default function InviteTableRow({
  project,
  AcceptFunc,
  DeclineFunc,
  data,
  type,
}) {
  const [checkDecision, setcheckDecision] = useState(false);
  const AcceptedFunc = (projectId, stepId, decision, invitation) => {
    AcceptFunc(setcheckDecision, projectId, stepId, decision, invitation);
  };
  const DeclinedFunc = (projectId, stepId, decision, invitation) => {
    DeclineFunc(setcheckDecision, projectId, stepId, decision, invitation);
  };
  return (
    <tr>
      <td>
        {new Date(project.createdAt).toString().split(" ")[2]}
        {"/"}
        {new Date(project.createdAt).getMonth() + 1}
        {"/"}
        {new Date(project.createdAt).getFullYear()}
      </td>
      <td>{project.sender.firstName}</td>
      <td>
        {project.type === "inviteProjectOwner"
          ? "Shown Interest"
          : project.type === "inviteCollaborator"
          ? "Collaboration"
          : "View private project"}
      </td>
      <td>
        {project.receiver._id === data.data._id
          ? "Received"
          : project.sender._id === data.data._id
          ? "Sent"
          : ""}
      </td>
      <td>{project.projectID.title}</td>
      <td>
        {project.projectID.implementation_steps.map((step) => (
          <span>{step._id === project.stepID ? step.name : ""}</span>
        ))}
      </td>
      <td>
        {project.receiver._id === data.data._id
          ? "To validate"
          : project.status}
      </td>

      {project.receiver._id === data.data._id ? (
        type === "viewProject" ? (
          <>
            <td className="text-center">
              <div
                className="row"
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginRight: "0px",
                  marginLeft: "0px",
                }}
              >
                <button
                  onClick={() =>
                    AcceptedFunc(
                      project.projectID._id,
                      project.stepID,
                      "Accept",
                      project._id
                    )
                  }
                  // onClick={() => DeleteContributerUser(skill._id)}
                  type="button"
                  id="modalButton1"
                  className="btn  btn-primary text-white text-uppercase"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    DeclinedFunc(
                      project.projectID._id,
                      project.stepID,
                      "Decline",
                      project._id
                    )
                  }
                  type="button"
                  id="modalButton1"
                  className="btn btn-primary text-white ml-2  mr-2  text-uppercase"
                >
                  Decline
                </button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="text-center ">
              <div
                className="row"
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginRight: "0px",
                  marginLeft: "0px",
                }}
              >
                <button
                  onClick={() =>
                    AcceptedFunc(
                      project.projectID._id,
                      project.stepID,
                      "Accepted",
                      project._id
                    )
                  }
                  // onClick={() => DeleteContributerUser(skill._id)}
                  type="button"
                  id="modalButton1"
                  className="btn  btn-primary text-white text-uppercase"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    DeclinedFunc(
                      project.projectID._id,
                      project.stepID,
                      "Decline",
                      project._id
                    )
                  }
                  type="button"
                  id="modalButton1"
                  className="btn btn-primary text-white ml-2 mr-1 text-uppercase"
                >
                  Decline
                </button>
              </div>
            </td>
          </>
        )
      ) : (
        ""
      )}
    </tr>
  );
}
