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
import axios from "axios";
import "../Theme/css/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Theme/styles";
import {url} from '../../../urlConfig' 

const ModalExample = (props) => {
  const [suggest, setsuggest] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState("");
 
  const validateSuggest = () => {
    if (suggest) {
      seterror("");

      return true;
    } else if (suggest && suggest.length > 300) {
      const msg = "Description should not be greater than 300 characters";
      seterror(msg);
      return false;
    } else if (!suggest) {
      const msg = "Required";
      seterror(msg);
      return false;
    }
  };
  const onSubmit = async (e) => {
    if (!suggest) {
      validateSuggest();
    } else {
      setisLoading(true);

      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      try {
        let res = await axios.post(
          `${url}/api/v1/project/suggestStep`,
          { suggest: suggest, email: props.email },
          headers
        );
        props.addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
          placement: "bottom-right",
        });
        props.toggle();
        setsuggest("");
        seterror("");
        setisLoading(false);
      } catch (error) {
        props.addToast(error?.response?.data.message, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
          placement: "bottom-right",
        });
        setisLoading(false);
      }
    }
  };
  return (
    <div id="Profilemodal">
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        className={props.className}
        style={{ width: "70%", borderRadius: "4rem" }}
        className="modal-xl"
      >
        <ModalHeader toggle={props.toggle}>Edit Project</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleAddress2" className="row label">
                    Suggestion
                  </Label>
                  <Input
                    type="textarea"
                    name="general_description"
                    id="general_description"
                    value={suggest}
                    onChange={(e) => setsuggest(e.target.value)}
                    placeholder="Donnez des détails sur l'étape suggérée"
                    onBlur={validateSuggest}
                  />
                  {error !== "" ? <p className="error ">{error}</p> : ""}
                </FormGroup>
              </Col>
            </Row>

            <Col className="text-right"></Col>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={props.toggle}
            type="button"
            // id="userButton"
            id="modalButton"
            className="btn text-uppercase"
          >
            Cancel
          </button>
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
              Send
            </button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
//   array.push(dt);
//   axios
//     .post(
//       `${url}/api/v1/admin/create-skillField`,
//       { skillField: data[0], skills: array },
//       headers
//     )
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => console.log(err));
