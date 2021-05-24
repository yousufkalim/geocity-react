import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../Components/UI/Theme/css/main.css";
import { useStyles } from "../../Components/UI/Theme/styles";
import Button from "@material-ui/core/Button";
import { Redirect, Route } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useToasts } from "react-toast-notifications";
import { loginData } from "../../shared/Data";
import { Link } from "react-router-dom";
function Login() {
  const { addToast } = useToasts();
  // single states
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [type, setType] = useState("password");

  // ********
  // Required Fields states
  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    email: "",
  });

  // validation start ******************
  const validateEmail = () => {
    const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z]+)*$/.test(
      formData.email
    );
    if (!formData.email) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, email: msg });
      return false;
    } else if (formData.email) {
      if (formData.email && !isValid) {
        const msg = "You have entered an invalid email address!";
        setAboutRequiredFields({ ...aboutRequiredFields, email: msg });
        return false;
      }
      setAboutRequiredFields({ ...aboutRequiredFields, email: "" });
      return true;
    }
  };

  const checkValidateForm = () => {
    let obj = {};
    let reqFields = true;

    Object.keys(formData).map((key) => {
      if (formData[key] === "") {
        obj[key] = "Required";
        reqFields = false;
      }
      return obj;
    });

    setAboutRequiredFields(obj);
    if (!reqFields) {
      const msg = "Required";
      return false;
    } else {
      return true;
    }
  };
  // validation end ***************

  // handle Actions

  const handleChange = (e) => {
    let value = e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const check = validateEmail();
    if (check === true) {
      try {
        axios
          .post(
            "http://localhost:1190/api/v1/profile/request-forget-password",
            {
              email: formData.email,
            }
          )
          .then((res) => {
            setisLoading(false);

            setFormData(loginData);
            setisSuccess(true);
            addToast(`Request Sent Successfully,Check your email`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          })
          .catch((err) => {
            if (err.response.data) {
              if (err.response.data.message) {
                addToast(`${err.response.data.message}`, {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });
              } else {
                addToast(`${err.response.data}`, {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });
              }
            }
            setTimeout(() => {
              setisLoading(false);
            }, 1000);

            // console.log(" error =>", err);
          });
      } catch (error) {
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  const showHide = (e) => {
    e.preventDefault();
    if (formData.password) {
      if (type === "password") {
        setType("input");
      } else {
        setType("password");
      }
    }
  };
  // handle actions end ***************
  if (isSuccess === true) {
    return <Redirect to="/Login" />;
  } else {
    return (
      <div className="main">
        <div className="Logincontainer">
          <div>
            <Link to="/">
              <p className="pl-4 pt-2 ">
                <i
                  class="fa fa-arrow-left"
                  aria-hidden="true"
                  style={{ fontSize: "18px" }}
                ></i>
                <span style={{ fontSize: "18px" }} className="pl-1">
                  {" "}
                  Back to home{" "}
                </span>
              </p>
            </Link>
          </div>
          <form method="POST" className="appointmentform" id="appointment-form">
            <h2>Forgot Password</h2>
            <div className="form-group-1">
              <label className="label-agree-term row">
                Email*{" "}
                {aboutRequiredFields.email !== "" ? (
                  <p className="error"> {aboutRequiredFields.email}</p>
                ) : (
                  ""
                )}
              </label>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onBlur={validateEmail}
                onChange={handleChange}
              />
            </div>

            <div className="form-submit ">
              {isLoading === true ? (
                <center>
                  <div className={useStyles.root}>
                    <CircularProgress disableShrink />
                  </div>
                </center>
              ) : (
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  name="add"
                  className="submit"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
