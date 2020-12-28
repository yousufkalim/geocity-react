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
    formData,
    handleChange,
    onSubmit,
    isLoading,
    CategoryList,
    DefaultImage,
    photo,
    setPhoto,
    data,
    aboutRequiredFields,
    validateTitle,
    validateCategory,
    validateGenralDesc,
    validateProjectType,
  } = props;
  const [profilePreview, setProfilePreview] = useState(DefaultImage);

  return (
    <div id="Profilemodal">
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        className={className}
        style={{ width: "70%", borderRadius: "4rem" }}
        className="modal-xl"
      >
        <ModalHeader toggle={props.toggle}>Edit Project</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail" className="row label">
                    Project Title*
                    {aboutRequiredFields.title !== "" ? (
                      <p className="error"> {aboutRequiredFields.title}</p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    placeholder="Title"
                    onChange={handleChange}
                    onBlur={validateTitle}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {/* <Row> */}
                {/* <Col> */}
                <FormGroup>
                  <Label for="examplePassword" className="row label">
                    General Photo
                  </Label>
                  <Input
                    type="file"
                    name="general_photo"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      console.log(file, "photo1");
                      setProfilePreview(URL.createObjectURL(file));
                      setPhoto(file);
                    }}
                  />
                </FormGroup>
                {/* </Col>
                  <Col> */}
                {/* <img
                      className="editproject-image"
                      src={
                        profilePreview
                          ? profilePreview
                          : `http://localhost:3000/views/uploads/${data.project.general_photo}`
                      }
                      alt="alternative"
                    /> */}
                {/* </Col>
                </Row> */}
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleAddress" className="row label">
                    Category*
                    {aboutRequiredFields.category !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {aboutRequiredFields.category}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    name="category"
                    id="category"
                    type="select"
                    value={formData.category}
                    onChange={handleChange}
                    onBlur={validateCategory}
                  >
                    <option value="">Select category</option>
                    {CategoryList
                      ? CategoryList.map((cat) =>
                          cat._id === formData.category ? (
                            <option value={cat._id}>{cat.name}</option>
                          ) : (
                            ""
                          )
                        )
                      : ""}

                    {CategoryList
                      ? CategoryList.map((cat) => (
                          <option value={cat._id} key={cat._id}>
                            {cat.name}
                          </option>
                        ))
                      : ""}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleAddress" className="row label">
                    Project Type*
                    {aboutRequiredFields.type !== "" ? (
                      <p className="errorselect"> {aboutRequiredFields.type}</p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    name="type"
                    id="type"
                    type="select"
                    value={formData.type}
                    onChange={handleChange}
                    onBlur={validateProjectType}
                  >
                    <option value={""}>Select type</option>

                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleAddress2" className="row label">
                    Description*
                    {aboutRequiredFields.general_description !== "" ? (
                      <p className="error ">
                        {aboutRequiredFields.general_description}
                      </p>
                    ) : (
                      ""
                    )}
                  </Label>
                  <Input
                    type="textarea"
                    name="general_description"
                    id="general_description"
                    value={formData.general_description}
                    onChange={handleChange}
                    placeholder="Description"
                    onBlur={validateGenralDesc}
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
