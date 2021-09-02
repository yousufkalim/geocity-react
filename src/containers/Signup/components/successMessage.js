import React from "react";
import Button from "@material-ui/core/Button";

export default function successMessage(props) {
  const { onClick, title, buttonText } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center ">
          <h1>
          <i
             
                class="fas fa-check-circle"
                style={{
                  color: "green",
                  fontSize: "40px",
                
                }}
              ></i>
          </h1>

          <h5>{title}</h5>
       
          <button
              variant="contained"
              onClick={onClick} 
              name="add"
              className="btn btn-primary"
            >
             {buttonText}
            </button>
          <hr />
        </div>
      </div>
    </div>
  );
}