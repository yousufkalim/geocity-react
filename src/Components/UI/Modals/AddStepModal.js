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
import { names } from "../../../shared/Data";
import StepCard from "../StepCard";

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
    stepArrayData,
    HandleStepDelete,
    materialRequiredFields,
    stepRequiredFields,
    skillRequiredFields,
    ValidateSkillField,
    ValidateSkill,
    validateStatus,
    validateSpeciality,
    validateDescription,
    validateStepType,
    validateStepName,
    validateMaterial,
    otherSKill,
    setotherSkill,
    ValidateOtherSkill,
    ValidateOtherMaterial,
    otherMaterial,
    setotherMaterial,
    setFormDataSkillField,
    setMaterial,
    skillData,
  } = props;

  const handleStep = (e) => {
    if (e.target.name === "Field") {
      const array = [];
      setmaterialArrayData(array);
      setMaterial("");
    } else {
      setFormDataSkillField(skillData);
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
                  <Label for="exampleEmail" className="row label">
                    Step Name*
                    {stepRequiredFields.name !== "" ? (
                      <p className="error"> {stepRequiredFields.name}</p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={stepformData.name}
                    placeholder="Step name"
                    onChange={handleStepChange}
                    onBlur={validateStepName}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="examplePassword" className="row label">
                    Project Status*
                    {stepRequiredFields.status !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {stepRequiredFields.status}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="select"
                    name="status"
                    id="Type"
                    value={stepformData.status}
                    onChange={handleStepChange}
                    onBlur={validateStatus}
                  >
                    <option value="">Select status</option>

                    <option value="NoProgress">NoProgress</option>

                    <option value="completed">completed</option>
                    <option value="InProgress">InProgress</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress" className="row label">
                    Step Type*
                    {stepRequiredFields.stepType !== "" ? (
                      <p className="errorselect ">
                        {" "}
                        {stepRequiredFields.stepType}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    name="stepType"
                    id="stepType"
                    value={stepType}
                    type="select"
                    onChange={handleStep}
                    onBlur={validateStepType}
                  >
                    <option value="">Select StepType</option>
                    {names
                      ? names.map((mat) => <option value={mat}>{mat}</option>)
                      : ""}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              {stepType === "Material" ? (
                <>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleAddress" className="row label">
                        {stepType}*
                        {materialRequiredFields.name !== "" ? (
                          <p className="errorselect">
                            {" "}
                            {materialRequiredFields.name}
                          </p>
                        ) : (
                          ""
                        )}
                      </Label>
                      <Input
                        type="select"
                        name="material"
                        id="material"
                        value={material}
                        onChange={handleStepChange}
                        onBlur={validateMaterial}
                      >
                        <option>Select Material</option>
                        {materialList
                          ? materialList.map((mat) => (
                              <option value={mat._id}>{mat.name}</option>
                            ))
                          : ""}
                        <option value="Other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </>
              ) : stepType === "Field" ? (
                <>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleAddress" className="row label">
                        {stepType}*
                        {skillRequiredFields.skillField !== "" ? (
                          <p className="errorselect ">
                            {" "}
                            {skillRequiredFields.skillField}
                          </p>
                        ) : (
                          ""
                        )}
                      </Label>
                      <Input
                        type="select"
                        name="skillField"
                        id="skillField"
                        onBlur={ValidateSkillField}
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
                      <Label for="exampleAddress" className="row label">
                        Skill*
                        {skillRequiredFields.skill !== "" ? (
                          <p className="errorselect ">
                            {" "}
                            {skillRequiredFields.skill}
                          </p>
                        ) : (
                          ""
                        )}
                      </Label>
                      <Input
                        type="select"
                        name="skill"
                        id="skill"
                        onBlur={ValidateSkill}
                        value={formDataSkillField.skill}
                        onChange={handleSkillChange}
                      >
                        <option value="">Select skill</option>

                        {skillList
                          ? skillList.map((mat) => (
                              <option value={mat}>{mat}</option>
                            ))
                          : ""}
                        <option value="Other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  {formDataSkillField.skill === "Other" ? (
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleAddress" className="row label">
                          Skill*
                          {skillRequiredFields.otherSKill !== "" ? (
                            <p className="errorselect ">
                              {" "}
                              {skillRequiredFields.otherSKill}
                            </p>
                          ) : (
                            ""
                          )}
                        </Label>
                        <Input
                          type="text"
                          name="otherSKill"
                          id="otherSKill"
                          placeholder="Enter your Skill"
                          value={otherSKill}
                          onChange={(e) => {
                            ValidateOtherSkill();
                            setotherSkill(e.target.value);
                          }}
                          onBlur={ValidateOtherSkill}
                        ></Input>
                      </FormGroup>
                    </Col>
                  ) : (
                    ""
                  )}
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleAddress" className="row label">
                        Speciality*
                        {skillRequiredFields.speciality !== "" ? (
                          <p className="error">
                            {" "}
                            {skillRequiredFields.speciality}
                          </p>
                        ) : (
                          ""
                        )}
                        {stepRequiredFields.error !== "" ? (
                          <p className="error mt-2">
                            {" "}
                            {stepRequiredFields.error}
                          </p>
                        ) : (
                          ""
                        )}
                      </Label>
                      <Input
                        type="text"
                        name="speciality"
                        id="title"
                        value={formDataSkillField.speciality}
                        placeholder="Speciality"
                        onChange={handleSkillChange}
                        onBlur={validateSpeciality}
                      />
                    </FormGroup>
                  </Col>
                </>
              ) : (
                ""
              )}
              {material === "Other" ? (
                <Col md={4}>
                  <>
                    <Label for="exampleAddress" className="row label">
                      Other material*{" "}
                      {materialRequiredFields.otherMaterial !== "" ? (
                        <p className="errorselect">
                          {" "}
                          {materialRequiredFields.otherMaterial}
                        </p>
                      ) : (
                        ""
                      )}
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => setotherMaterial(e.target.value)}
                      // onBlur={validateScore}
                      name="other"
                      id="score"
                      placeholder="Enter your material"
                      value={otherMaterial}
                      onBlur={ValidateOtherMaterial}
                    ></Input>
                  </>
                </Col>
              ) : (
                ""
              )}
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2" className="row label">
                    Description*
                    {stepRequiredFields.description !== "" ? (
                      <p className="error mt-1">
                        {" "}
                        {stepRequiredFields.description}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={stepformData.description}
                    onChange={handleStepChange}
                    placeholder="Description"
                    onBlur={validateDescription}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div
                  className={
                    stepArrayData
                      ? stepArrayData.length > 0
                        ? " mt-3 stepDiv"
                        : ""
                      : ""
                  }
                >
                  {stepArrayData
                    ? stepArrayData.map((step, i) => (
                        <StepCard
                          i={i}
                          step={step}
                          HandleStepDelete={HandleStepDelete}
                          materialList={materialList}
                          skillfieldList={skillfieldList}
                        />
                      ))
                    : ""}
                </div>
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
