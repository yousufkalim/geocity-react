import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  Col,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import "../Theme/css/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Theme/styles";
import { names } from "./Data";
const ModalExample = (props) => {
  const {
    stepformData,
    onAddStepSubmit,
    isLoading,
    setmaterialArrayData,
    setstepType,
    handleStepChange,
    stepType,
    materialList,
    skillfieldList,
    skillList,
    handleSkillChange,
    material,
    formDataSkillField,
    onStepAdd,
  } = props;

  const handleStep = (e) => {
    if (e.target.name === "Field") {
      const array = [];
      setmaterialArrayData(array);
    }

    setstepType(e.target.value);
  };
  return (
    <div id="Profilemodal">
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        style={{ width: "70%", borderRadius: "4rem" }}
        className="modal-xl"
      >
        <ModalHeader toggle={props.toggle}>Add Implementation Step</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">Step Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={stepformData.name}
                    placeholder="Step name"
                    onChange={handleStepChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="examplePassword">Project Status</Label>
                  <Input
                    type="select"
                    name="status"
                    id="Type"
                    value={stepformData.status}
                    onChange={handleStepChange}
                  >
                    <option value="NoProgress">NoProgress</option>

                    <option value="completed">completed</option>
                    <option value="InProgress">InProgress</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress">Step Type</Label>
                  <Input
                    name="stepType"
                    id="stepType"
                    value={stepType}
                    type="select"
                    onChange={handleStep}
                  >
                    <option>Select StepType</option>
                    {names
                      ? names.map((mat) => <option value={mat}>{mat}</option>)
                      : ""}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              {stepType === "Material" ? (
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleAddress">{stepType}</Label>
                    <Input
                      type="select"
                      name="material"
                      id="material"
                      value={material}
                      onChange={handleStepChange}
                    >
                      <option>Select Material</option>
                      {materialList
                        ? materialList.map((mat) => (
                            <option value={mat._id}>{mat.name}</option>
                          ))
                        : ""}
                    </Input>
                  </FormGroup>
                </Col>
              ) : stepType === "Field" ? (
                <>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleAddress">{stepType}</Label>
                      <Input
                        type="select"
                        name="skillField"
                        id="skillField"
                        value={formDataSkillField.skillField}
                        onChange={handleSkillChange}
                      >
                        <option value="">Select skillField</option>

                        {skillfieldList
                          ? skillfieldList.map((mat) => (
                              <option value={mat._id}>{mat.skillField}</option>
                            ))
                          : ""}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleAddress">Skill</Label>
                      <Input
                        type="select"
                        name="skill"
                        id="skill"
                        value={formDataSkillField.skill}
                        onChange={handleSkillChange}
                      >
                        <option value="">Select skill</option>

                        {skillList
                          ? skillList.map((mat) => (
                              <option value={mat}>{mat}</option>
                            ))
                          : ""}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleAddress">Speciality</Label>
                      <Input
                        type="text"
                        name="speciality"
                        id="title"
                        value={formDataSkillField.speciality}
                        placeholder="Speciality"
                        onChange={handleSkillChange}
                      />
                    </FormGroup>
                  </Col>
                </>
              ) : (
                ""
              )}
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={stepformData.description}
                    onChange={handleStepChange}
                    placeholder="Description"
                  />
                </FormGroup>
              </Col>
              <Col md={4} className="text-left">
                <button
                  type="button"
                  onClick={onStepAdd}
                  // id="userButton"
                  id="modalButton"
                  style={{
                    marginTop: "2.7rem",
                    marginLeft: "1rem",
                  }}
                  className="btn "
                >
                  Add
                </button>
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
                  onClick={onAddStepSubmit}
                  type="button"
                  // id="userButton"
                  id="modalButton"
                  className="btn "
                >
                  Submit
                </button>
              )}
            </Col>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalExample;
