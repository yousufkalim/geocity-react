import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios"
import { useToasts } from "react-toast-notifications";

export default function EmailVerify() {
    const params = useParams();
    const history = useHistory();

  const { addToast } = useToasts();
    
  const [show, setShow] = useState(true);
  const [loading, setloading] = useState(false);

    const handleSubmit = async () => {
        console.log(params,"params.token")
      try {
          const res = await axios.post(`http://localhost:1190/api/v1/auth/verify-email/${params.token}`, {});
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setShow(false)
          history.push("/Login")
      } catch (err) {
        if (err.response) {
            addToast(`${err.response.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          }
      }
  };

  const handleClose = () => setShow(false);
  
  
  return (
      <Modal show={show}
      size="lg"
          onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Connexion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <p>Click below to verify your email</p>
              {loading ? (
          <Button disabled={loading} variant="secondary">
            Loading....
          </Button>
        ) : (
          <Button
            disabled={loading}
            variant="primary"
            disabled={false}
            onClick={handleSubmit}
          >
            Enregistrer
          </Button>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
}
