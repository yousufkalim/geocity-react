import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
const SkillsModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Skill Field</th>
                <th scope="col">Skill</th>
                <th scope="col">Intentions</th>
              </tr>
            </thead>
            <tbody>
              {props.data?.map((key, index) => {
                return (
                  <>
                    <tr>
                      <td>{key.skillField.skillField}</td>
                      <td>{key.skill}</td>
                      <td>{key.intentions}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SkillsModal;
