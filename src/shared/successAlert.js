import React from "react";

import SweetAlert from "react-bootstrap-sweetalert";
const Message = ({ onConfirm, onCancel, show }) => (
  <SweetAlert
    success
    title="Success!"
    show={show}
    onConfirm={onConfirm}
    onCancel={onCancel}
  >
    {/* You clicked the button! */}
  </SweetAlert>
);
export default Message;
