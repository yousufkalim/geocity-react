import React from "react";

export default function TableRow({ project, step, DeletContributor, data }) {
  //   const onDeletContributor = (id) => {
  //     DeletContributor(id);
  //   };
  return (
    <tr>
      <td>{project.title}</td>
      <td>{step.name}</td>
      <td>
        {project.project_owner === data.data._id ? (
          <span>Project Owner</span>
        ) : step.contributing_user.find((cont) => cont === data.data._id) ? (
          <span>Contributor</span>
        ) : (
          <span>Contributor</span>
        )}
      </td>
      <td>{step.status}</td>
      <td>
        {project.project_owner === data.data._id ? (
          <button
            onClick={() => DeletContributor(step._id)}
            type="button"
            id="modalButton3"
            className="btn btn-primary text-white ml-4 text-uppercase"
          >
            Edit Contributor
          </button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}
