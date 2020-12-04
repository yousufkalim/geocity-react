import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Loaders from "./Loaders";
import Table from "./Table";
const ModalExample = (props) => {
  const { skillFieldData, sendInvite, searchBy } = props;
  if (skillFieldData && skillFieldData.length > 0) {
    return (
      <div>
        <Button color="danger"></Button>
        <Modal
          isOpen={props.modal}
          toggle={props.toggle}
          className="modal-xl"
          style={{ width: "70%", borderRadius: "4rem" }}
        >
          <ModalHeader toggle={props.toggle}></ModalHeader>
          <ModalBody>
            {typeof skillFieldData !== typeof "" ? (
              <>
                <h6
                  className="text-center text-dark"
                  style={{
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#000",
                  }}
                >
                  SEARCH BY :
                </h6>
                <div className="row  mt-4">
                  <div className="col-lg-2"></div>
                  <div className="col-lg-3">
                    <button
                      type="button"
                      // id="userButton"
                      id="modalButton"
                      className="btn "
                    >
                      Goods
                    </button>
                  </div>
                  <div className="col-lg-2"></div>

                  <div className="col-lg-3">
                    <button type="button" id="modalButton" className="btn ">
                      Field
                    </button>
                  </div>
                  <div className="col-lg-2"></div>
                </div>

                <Table
                  searchBy={searchBy}
                  skillFieldData={skillFieldData}
                  sendInvite={sendInvite}
                />
              </>
            ) : (
              <h5 className="text-center">
                No Users found with this Skill name
              </h5>
            )}
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
  } else {
    return (
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        className="modal-xl"
        style={{ width: "70%", borderRadius: "4rem" }}
      >
        <ModalHeader toggle={props.toggle}></ModalHeader>
        <ModalBody>
          <h5 className="text-center">No Users found with this Skill name</h5>
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
    );
  }
};

export default ModalExample;
