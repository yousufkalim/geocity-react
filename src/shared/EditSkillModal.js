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
import SkillChipCard from "../shared/EditSkillChipCard";
const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    data,
    EditSkillSubmit,
    handleChangeEdit,
    isLoading,
    editformData,
    aboutRequiredFields,
    ValidateSkillField,
    ValidateSkill,
    AddSkill,
    AddSkillSubmit,
    editskillArrayData,
    seteditFormData,
    ValidateEditSkillField,
    seteditskillArrayData,
    skillFieldList,
    ValidateEditSkill,
    HandleEditSkill,
    AddEditSkill,
    editskill,
    seteditskill,
    editcheck,
    seteditcheck,
    UpdateSkill,
    setIndex,
  } = props;
  const EditSkillState = (value, i) => {};
  // console.log(editformData, "editformData");
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
            <Row
              style={{
                marginRight: "0px",
                marginLeft: "0px",
              }}
            >
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Skill Field*
                    {aboutRequiredFields.editSkillField !== "" ? (
                      <p className="error">
                        {" "}
                        {aboutRequiredFields.editSkillField}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="text"
                    name="skillField"
                    id="skillField"
                    value={editformData.skillField}
                    placeholder="Enter SkillField"
                    onChange={handleChangeEdit}
                    onBlur={ValidateEditSkillField}
                  />
                </FormGroup>
              </Col>
              {editskill && editcheck == true ? (
                <>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail" className="row label">
                        Skill*
                        {aboutRequiredFields.editSkill !== "" ? (
                          <p className="error">
                            {" "}
                            {aboutRequiredFields.editSkill}
                          </p>
                        ) : (
                          ""
                        )}
                      </Label>
                      <Input
                        type="text"
                        name="skill"
                        id="skill"
                        value={editskill}
                        placeholder="Enter Skill"
                        onChange={HandleEditSkill}
                        onBlur={ValidateEditSkill}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="text-left">
                    {isLoading === true ? (
                      <center>
                        <div className={useStyles.root}>
                          <CircularProgress disableShrink />
                        </div>
                      </center>
                    ) : (
                      <button
                        onClick={UpdateSkill}
                        type="button"
                        // id="userButton"
                        id="modalButton1"
                        style={{ marginTop: "2rem" }}
                        className="btn text-uppercase"
                      >
                        Update Skill
                      </button>
                    )}
                  </Col>
                </>
              ) : (
                ""
              )}
            </Row>
            <Col
              md={8}
              style={{
                marginRight: "0px",
                marginLeft: "0px",
              }}
            >
              <div
                className={
                  editformData.skill
                    ? editformData.skill.length > 0
                      ? "  stepDiv"
                      : ""
                    : ""
                }
              >
                {editformData.skill && editformData.skill.length > 0
                  ? editformData.skill.map((step, i) => (
                      <SkillChipCard
                        key={i}
                        skillArrayData={editformData.skill}
                        setskillArrayData={seteditFormData}
                        skillFieldList={skillFieldList}
                        mat={step}
                        i={i}
                        seteditskill={seteditskill}
                        seteditcheck={seteditcheck}
                        editcheck={editcheck}
                        // EditSkillState={EditSkillState}
                        setIndex={setIndex}
                      />
                    ))
                  : ""}
              </div>
            </Col>
            {/* <Row className="mt-3">
              <Col md={4} style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  onClick={AddSkill}
                  type="button"
                  // id="userButton"
                  id="modalButton2"
                  style={{ width: "30%" }}
                  className="btn text-uppercase"
                >
                  Add
                </button>
              </Col>
            </Row> */}
            <Col className="text-right" style={{ marginTop: "2rem" }}>
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
