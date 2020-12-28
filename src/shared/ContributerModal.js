import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
const ModalExample = (props) => {
  const {
    modal,
    toggle,
    data,
    materialList,
    skillFieldList,
    ContributorDelete,
    stepId,
  } = props;

  return (
    <div className="col-lg-12 text-center ">
      <Modal
        isOpen={modal}
        fade={false}
        toggle={toggle}
        style={{ width: "70%", borderRadius: "4rem" }}
        className="modal-xl"
      >
        <ModalHeader toggle={toggle}>Delete Contributing User</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>User Name</th>
                <th style={{ width: "20%" }}>Fields</th>
                <th style={{ width: "20%" }}>Materials</th>
                <th style={{ width: "40%" }}></th>
              </tr>
            </thead>
            <tbody>
              {data &&
              data.contributing_user &&
              data.contributing_user.length > 0 ? (
                data.contributing_user.map((skill) => (
                  <tr>
                    <th scope="row">{skill.username}</th>
                    <td>
                      {skill.skills
                        ? skill.skills.map((data) => {
                            // let icon = <TagFacesIcon />;
                            return (
                              skillFieldList &&
                              skillFieldList.map((mat) => {
                                if (mat._id === data.skillField) {
                                  return mat.skillField + " ,";
                                }
                              })
                            );
                          })
                        : ""}
                    </td>

                    <td>
                      {skill.material
                        ? skill.material.map((data) => {
                            // let icon = <TagFacesIcon />;
                            return (
                              materialList &&
                              materialList.map((mat) => {
                                if (mat._id === data) {
                                  return mat.name + " ,";
                                }
                              })
                            );
                          })
                        : ""}
                    </td>

                    <td>
                      <Link to={`/profile/${skill._id}`}>
                        <button
                          type="button"
                          id="modalButton1"
                          className="btn btn-primary text-white text-uppercase"
                        >
                          See profile
                        </button>
                      </Link>
                      <button
                        onClick={() => ContributorDelete(skill._id)}
                        type="button"
                        id="modalButton2"
                        className="btn btn-primary text-white ml-4 text-uppercase"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <center>No User Found</center>
              )}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            id="modalButton"
            className="btn text-uppercase"
            color="secondary"
            onClick={props.toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
