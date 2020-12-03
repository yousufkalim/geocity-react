import React, { useState } from "react";
import { Toast, Col, Row } from "react-bootstrap";

const ToastDismissExample = ({
  ToastClose,
  show,
  successmessage,
  errormessage,
}) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "relative",
        // minHeight: "100px",
        // minwidth: "20rem",
      }}
    >
      <Toast
        style={{
          position: "absolute",
          //   background: "green",
          top: "150vh",
          //   minwidth: "20rem",
          right: 0,
          //   bottom: 0,
        }}
        onClick={ToastClose}
        onClose={ToastClose}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header
          style={{
            background: `${successmessage ? "green" : "red"}`,
            color: "#fff",
            // minwidth: "20rem",
          }}
        >
          <strong className="mr-auto ">
            {successmessage ? successmessage : errormessage}
          </strong>
          {/* <small>just now</small> */}
        </Toast.Header>
        {/* <Toast.Body></Toast.Body> */}
      </Toast>
    </div>
  );
};

export default ToastDismissExample;
