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

    AddinterestSubmit,
    isLoading,
    interestRequiredFields,
    handleInterestChange,
    interest,
    CategoryList,
    ValidateInterest,
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
        <ModalHeader toggle={props.toggle}>Add Interest</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={4}></Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Interest*
                    {interestRequiredFields.interest !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {interestRequiredFields.interest}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>

                  <Input
                    type="select"
                    name="interest"
                    id="interest"
                    value={interest}
                    onChange={handleInterestChange}
                    onBlur={ValidateInterest}
                  >
                    <option value="">Select Category</option>
                    {CategoryList &&
                      CategoryList.map((cat) => (
                        <option value={cat._id}>{cat.name}</option>
                      ))}
                  </Input>
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
                  onClick={AddinterestSubmit}
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
