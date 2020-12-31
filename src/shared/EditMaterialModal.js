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

    AddMaterialSubmit,
    isLoading,
    materialRequiredFields,
    handleMaterial,
    material,
    ValidateMaterial,
  } = props;

  return (
    <div id="Profilemodal">
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        className={className}
        style={{ width: "50%", borderRadius: "2rem" }}
        className="modal-xl"
      >
        <ModalHeader toggle={props.toggle}>Add Material</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={4}></Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Material*
                    {materialRequiredFields.editname !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {materialRequiredFields.editname}
                      </p>
                    ) : (
                      ""
                    )}
                    {materialRequiredFields.error !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {materialRequiredFields.error}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="text"
                    name="material"
                    id="material"
                    value={material}
                    placeholder="Enter material"
                    onChange={handleMaterial}
                    onBlur={ValidateMaterial}
                  />
                </FormGroup>
              </Col>
              <Col md={4}></Col>
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
                  onClick={AddMaterialSubmit}
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
