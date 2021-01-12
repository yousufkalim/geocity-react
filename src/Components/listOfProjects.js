import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectsTableRow from "../shared/ProjectsTableRow";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function UserTable(props) {
  const { data, addToast, materialList, skillFieldList, DeleteProject } = props;

  return (
    <>
      <Table responsive bordered>
        <thead>
          <tr className="text-center">
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              General Photo{" "}
            </th>
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Project Name
            </th>
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Project Owner
            </th>
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Step Name
            </th>
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>Status</th>
            <th style={{ padding: "0.75rem 0.4rem 0.75rem 0.4rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data &&
            data.map((project) =>
              project.implementation_steps.map((step) => (
                <ProjectsTableRow
                  project={project}
                  DeleteProject={DeleteProject}
                  step={step}
                />
              ))
            )
          ) : (
            <h5 className="text-dark">No Users found</h5>
          )}
        </tbody>
      </Table>
    </>
  );
}
