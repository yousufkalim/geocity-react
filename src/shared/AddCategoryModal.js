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

    AddCategorySubmit,
    isLoading,
    materialRequiredFields,
    handleCategory,
    addcategory,
    ValidateCategory,
    handleColor,
    color,
    ValidateColor,
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
        <ModalHeader toggle={props.toggle}>Add Category</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Category name*
                    {materialRequiredFields.addcategory !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {materialRequiredFields.addcategory}
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
                    name="category"
                    id="category"
                    value={addcategory}
                    placeholder="Enter category"
                    onChange={handleCategory}
                    onBlur={ValidateCategory}
                  />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Color *
                    {materialRequiredFields.color !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {materialRequiredFields.color}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="text"
                    name="color"
                    id="color"
                    value={color}
                    placeholder="Enter color"
                    onChange={handleColor}
                    onBlur={ValidateColor}
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
                  onClick={AddCategorySubmit}
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
