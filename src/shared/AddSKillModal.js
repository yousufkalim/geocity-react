import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
} from "reactstrap";
import "../Theme/css/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Theme/styles";
import SkillChip from "./skillChip";
const ModalExample = (props) => {
  const {
    buttonLabel,
    className,

    data,
    AddSkillSubmit,
    handleChange,
    isLoading,
    formData,
    aboutRequiredFields,
    ValidateSkillField,
    ValidateSkill,
    AddSkill,
    skillArrayData,
    setskillArrayData,
  } = props;

  return (
    <div id="Profilemodal">
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        className={className}
        style={{ width: "70%", borderRadius: "4rem" }}
        className="modal-xl"
      >
        <ModalHeader toggle={props.toggle}>Add Skill</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={4}></Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Skill Field*
                    {aboutRequiredFields.skillField !== "" ? (
                      <p className="error"> {aboutRequiredFields.skillField}</p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="text"
                    name="skillField"
                    id="skillField"
                    value={formData.skillField}
                    placeholder="Enter SkillField"
                    onChange={handleChange}
                    onBlur={ValidateSkillField}
                  />
                </FormGroup>
              </Col>
              <Col md={4}></Col>
            </Row>
            <Row>
              <Col md={4}></Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Skill*
                    {aboutRequiredFields.skill !== "" ? (
                      <p className="error"> {aboutRequiredFields.skill}</p>
                    ) : (
                      ""
                    )}
                    {aboutRequiredFields.error !== "" ? (
                      <p className="error"> {aboutRequiredFields.error}</p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="text"
                    name="skill"
                    id="skill"
                    value={formData.skill}
                    placeholder="Enter Skill"
                    onChange={handleChange}
                    onBlur={ValidateSkill}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <button
                  onClick={AddSkill}
                  type="button"
                  // id="userButton"
                  id="modalButton2"
                  style={{ marginTop: "2rem", width: "30%" }}
                  className="btn text-uppercase"
                >
                  Add
                </button>
              </Col>
            </Row>

            <Row>
              <Col md={4}></Col>
              {skillArrayData && skillArrayData.length > 0 ? (
                <Col md={4}>
                  <div
                    className={
                      skillArrayData
                        ? skillArrayData.length > 0
                          ? "  stepDiv"
                          : ""
                        : ""
                    }
                  >
                    {skillArrayData.map((mat) => (
                      <SkillChip
                        skillArrayData={skillArrayData}
                        setskillArrayData={setskillArrayData}
                        mat={mat}
                      />
                    ))}
                  </div>
                </Col>
              ) : (
                ""
              )}
              <Col md={4}></Col>
            </Row>

            <Col className="text-right" style={{ marginTop: "2rem" }}>
              {isLoading === true ? (
                <center>
                  <div className={useStyles.root}>
                    <CircularProgress disableShrink />
                  </div>
                </center>
              ) : (
                <button
                  onClick={AddSkillSubmit}
                  type="button"
                  // id="userButton"
                  id="modalButton"
                  className="btn text-uppercase"
                >
                  Submit
                </button>
              )}
            </Col>
          </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default ModalExample;
