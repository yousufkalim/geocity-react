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
import SkillChip from "../SkillChip";
const ModalExample = (props) => {
  const {
    buttonLabel,
    className,

    EditCategorySubmit,
    isLoading,
    materialRequiredFields,
    handleEditCategory,
    editcategory,
    ValidateEditCategory,
    handleEditColor,
    editcolor,
    ValidateEditColor,
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
        <ModalHeader toggle={props.toggle}>Edit Category</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Category name*
                    {materialRequiredFields.editcategory !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {materialRequiredFields.editcategory}
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
                    value={editcategory}
                    placeholder="Enter category"
                    onChange={handleEditCategory}
                    onBlur={ValidateEditCategory}
                  />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Color *
                    {materialRequiredFields.editcolor !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {materialRequiredFields.editcolor}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="text"
                    name="material"
                    id="material"
                    value={editcolor}
                    placeholder="Enter color"
                    onChange={handleEditColor}
                    onBlur={ValidateEditColor}
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
                  onClick={EditCategorySubmit}
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
