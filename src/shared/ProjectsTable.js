import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteModal from "./ContributerModal";
import ProjectTableRow from "../Components/ProjectTableRow";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function UserTable(props) {
  const { data, addToast, materialList, skillFieldList } = props;
  const [deletemodal, setdeletemodal] = useState(false);
  const [stepData, setstepData] = useState("");

  const [stepId, setstepId] = useState("");
  const [projectId, setprojectId] = useState("");
  const DeletContributor = (stepId, projectId) => {
    // alert(stepId);
    if (deletemodal === false) {
      if (typeof stepId === "string") {
        data.data.projects.map((project) =>
          project.implementation_steps.map((step) => {
            // console.log(step);

            if (step._id === stepId) {
              setstepData(step);
              // console.log(stepData);
              setstepId(stepId);
              setprojectId(projectId);
              setdeletemodal(!deletemodal);
            }
          })
        );
      }
    } else {
      setdeletemodal(!deletemodal);
    }
  };
  // console.log(data, "ProjectdataList");
  const ContributorDelete = (userId) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/delete-contributing-user?id=${projectId}`,
          { user_id: userId, step_Id: stepId },
          headers
        )
        .then((res) => {
          addToast("Contributor deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setdeletemodal(!deletemodal);

          // console.log(res, "res material");
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
      // console.log(error, "error catch");
    }
  };
  return (
    <>
      <DeleteModal
        ContributorDelete={ContributorDelete}
        modal={deletemodal}
        materialList={materialList}
        skillFieldList={skillFieldList}
        toggle={DeletContributor}
        data={stepData}
        stepId={stepId}
      />
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
          {data && data.data.projects && data.data.projects.length > 0 ? (
            data.data.projects.map((project) =>
              project.implementation_steps.map((step) => (
                <>
                  <ProjectTableRow
                    project={project}
                    step={step}
                    DeletContributor={() =>
                      DeletContributor(step._id, project._id)
                    }
                    data={data}
                  />
                </>
              ))
            )
          ) : (
            <h5 className="text-dark">No projects found</h5>
          )}
        </tbody>
      </Table>
    </>
  );
}
