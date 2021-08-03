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
import { useStyles } from "../../../Theme/styles";
import { names } from "../../../shared/Data";
const ModalExample = (props) => {
  const {
    stepformData,
    onSubmit,
    isLoading,
    setmaterialArrayData,
    setstepType,
    error,
    handleStepChange,
    stepType,
    materialList,
    skillfieldList,
    skillList,
    handleSkillChange,
    material,
    formDataSkillField,
    stepRequiredFields,
    skillRequiredFields,
    onStepAdd,
    data,
    tempstepId,
    validateMaterial,
    validateStepType,
    validateStepName,
    validateStatus,
    validateSpeciality,
    validateDescription,
    ValidateSkillField,
    ValidateSkill,
  } = props;
  // const [stepdata, setstepdata] = useState("");
  // useEffect(() => {
  //   const array = data.filter((dt) => dt._id == tempstepId);
  //   setstepdata(array);
  // }, [tempstepId]);
  const handleStep = (e) => {
    if (e.target.name === "Field") {
      const array = [];
      setmaterialArrayData(array);
    }

    setstepType(e.target.value);
  };
  // console.log(stepdata, "data from step ");
  return (
    <div id="Profilemodal">
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        style={{ width: "70%", borderRadius: "4rem" }}
        className="modal-xl"
      >
        <ModalHeader toggle={props.toggle}>
          Edit Implementation Step
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Step Name*{" "}
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
                    Project Status*{" "}
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
                    <option value={""}>Select status</option>
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
                    disabled
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
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleAddress" className="row label">
                      {stepType}{" "}
                      {stepRequiredFields.material !== "" ? (
                        <p className="errorselect">
                          {" "}
                          {stepRequiredFields.material}
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
                      onBlur={validateMaterial}
                      onChange={handleStepChange}
                    >
                      <option>Select Material*</option>
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
                      <Label for="exampleAddress" className="row label">
                        {stepType}{" "}
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
                        value={formDataSkillField.skillField}
                        onChange={handleSkillChange}
                        onBlur={ValidateSkillField}
                      >
                        <option value="">Select skillField*</option>

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
                        value={formDataSkillField.skill}
                        onChange={handleSkillChange}
                        onBlur={ValidateSkill}
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
                      <Label for="exampleAddress" className="row label">
                        intentions*
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
                        name="intentions"
                        id="intentions"
                        value={formDataSkillField.intentions}
                        onChange={handleSkillChange}
                        onBlur={ValidateSkill}
                      >
                        <option value="">Select intentions</option>
                        <option value="bénévole">bénévole</option>
                        <option value="troc">troc</option>
                        <option value="payé">payé</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleAddress" className="row label">
                        Speciality*{" "}
                        {skillRequiredFields.speciality !== "" ? (
                          <p className="error">
                            {" "}
                            {skillRequiredFields.speciality}
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
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2" className="row label">
                    Description*{" "}
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

            {error !== "" ? <p className="error"> {error}</p> : ""}
            <Col className="text-right">
              {isLoading === true ? (
                <center>
                  <div className={useStyles.root}>
                    <CircularProgress disableShrink />
                  </div>
                </center>
              ) : (
                <button
                  onClick={onSubmit}
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
