import React from "react";
import { Table } from "reactstrap";
export default function UserTable({ data }) {
  return (
    <Table responsive bordered>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Step Name</th>
          <th>Working as</th>
          <th>Status </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.data.projects ? (
          data.data.projects.map((project) => (
            <tr>
              <td>{project.title}</td>
              <td>
                {project.implementation_steps.map((step) => (
                  <span>{step.name},</span>
                ))}
              </td>
              <td>
                {project.implementation_steps.map((step) => (
                  <span>
                    {step.contributing_user.map((user) =>
                      user === data.data.project_owner ? (
                        <span>Project Owner</span>
                      ) : (
                        <span>Contributor</span>
                      )
                    )}
                  </span>
                ))}
              </td>
              <td>{project.status}</td>
              <td>Table cell</td>
            </tr>
          ))
        ) : (
          <center>
            <h5>No projects found</h5>
          </center>
        )}
      </tbody>
    </Table>
  );
}
