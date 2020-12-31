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

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,

    data,
    EditSkillSubmit,
    handleChange,
    isLoading,
    formData,
    aboutRequiredFields,
    ValidateSkillField,
    ValidateSkill,
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
        <ModalHeader toggle={props.toggle}>Edit Skill</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={6}>
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
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Skill*
                    {aboutRequiredFields.skill !== "" ? (
                      <p className="error"> {aboutRequiredFields.skill}</p>
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
            </Row>

            <Col className="text-right">
              {isLoading === true ? (
                <center>
                  <div className={useStyles.root}>
                    <CircularProgress disableShrink />
                  </div>
                </center>
              ) : (
                <button
                  onClick={EditSkillSubmit}
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
