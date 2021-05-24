import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalExample = (props) => {
  const { buttonLabel, className, modal, toggle } = props;

  return (
    <div>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <ModalBody>THe Project is Private ,Please Request to view</ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "} */}
          <button
            onClick={toggle}
            type="button"
            // id="userButton"
            id="modalButton"
            className="btn text-uppercase"
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
