import React, { useState } from "react";

export default function InviteTableRow({
  project,
  AcceptFunc,
  DeclineFunc,
  data,
  type,
}) {
  const [checkDecision, setcheckDecision] = useState(false);
  const AcceptedFunc = (projectId, sender, decision, invitation) => {
    AcceptFunc(setcheckDecision, projectId, sender, decision, invitation);
  };
  const DeclinedFunc = (projectId, sender, decision, invitation) => {
    DeclineFunc(setcheckDecision, projectId, sender, decision, invitation);
  };
  return (
    <tr>
      <td>
        {new Date(project.createdAt).toString().split(" ")[2]}
        {"/"}
        {new Date(project.createdAt).getMonth()}
        {"/"}
        {new Date(project.createdAt).getFullYear()}
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
            <td className="text-left">
              <button
                onClick={() =>
                  AcceptedFunc(
                    project.projectID._id,
                    project.sender,
                    "Accept",
                    project._id
                  )
                }
                // onClick={() => DeleteContributerUser(skill._id)}
                type="button"
                id="modalButton1"
                className="btn  btn-primary text-white "
              >
                Accept
              </button>
              <button
                onClick={() =>
                  DeclinedFunc(
                    project.projectID._id,
                    project.sender,
                    "Decline",
                    project._id
                  )
                }
                type="button"
                id="modalButton1"
                className="btn btn-primary text-white ml-4"
              >
                Decline
              </button>
            </td>
          </>
        ) : (
          <>
            <td className="text-left">
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
                className="btn  btn-primary text-white "
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
                className="btn btn-primary text-white ml-4"
              >
                Decline
              </button>
            </td>
          </>
        )
      ) : (
        <td></td>
      )}
    </tr>
  );
}
