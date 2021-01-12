import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../Theme/css/main.css";
import { useStyles } from "../Theme/styles";
import Button from "@material-ui/core/Button";
import { Redirect, Route } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import { SignOut, isAuthenticated, getUser } from "../Auth/Index";

import { useToasts } from "react-toast-notifications";
import { loginData } from "../shared/Data";
import { Link } from "react-router-dom";
function Login() {
  const { addToast } = useToasts();
  // single states
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [formData, setFormData] = useState(loginData);
  const [type, setType] = useState("password");

  // ********
  // Required Fields states
  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    email: "",
    password: "",
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
  const validatePassword = () => {
    if (!formData.password.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      return false;
    } else if (formData.password.length < 6) {
      const msg = "Passowrd needs to be at least 6 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });

      return false;
    } else {
      setAboutRequiredFields({ ...aboutRequiredFields, password: "" });
      setFormData({ ...formData, password: formData.password });
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
    const check = checkValidateForm();
    if (check == true) {
      try {
        axios
          .post("http://localhost:3000/api/v1/auth/login", formData)
          .then((res) => {
            setisLoading(false);
            console.log(res, "res user");
            localStorage.setItem("jwt", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setFormData(loginData);
            setisSuccess(true);
            addToast(`Login Successfully`, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            if (formData.email === "admin@admin.com") {
              window.location.href = `/Admindashboard/${res.data.user._id}`;
            }
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
    return <Redirect to="/" />;
  } else {
    return (
      <div className="main">
        <div className="Logincontainer">
          <form method="POST" className="appointmentform" id="appointment-form">
            <h2>Login Form</h2>
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

              <label className="label-agree-term row">
                Password*
                {aboutRequiredFields.password !== "" ? (
                  <p className="error"> {aboutRequiredFields.password}</p>
                ) : (
                  ""
                )}
              </label>
              <div style={{ display: "flex" }}>
                <input
                  type={type}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onBlur={validatePassword}
                  onChange={handleChange}
                  value={formData.password}
                />
                {type === "password" ? (
                  <i
                    onClick={showHide}
                    class="fas fa-eye"
                    style={{
                      color: "#000",
                      fontSize: "15px",
                      position: "absolute",
                      left: "20rem",
                      right: 0,
                      top: "16.5rem",
                    }}
                  ></i>
                ) : (
                  <i
                    onClick={showHide}
                    class="fas fa-eye-slash"
                    style={{
                      color: "#000",
                      fontSize: "15px",
                      position: "absolute",
                      left: "20rem",
                      right: 0,
                      top: "16.5rem",
                    }}
                  ></i>
                )}
              </div>
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
                  Login
                </Button>
              )}
            </div>
            <p className="text-left ml-1 mt-3">
              <span style={{ opacity: 0.5 }}> Not registered? </span>
              <Link to="/SignUp">
                <span
                  style={{ fontSize: "15px", color: "#77b5dd" }}
                  id="register"
                >
                  Create an account
                </span>
              </Link>
            </p>
            <p className="text-left ml-1 mt-2">
              <Link to={`/ForgotPassword`}>
                <span id="register" style={{ color: "#77b5dd" }}>
                  Forgot password?
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
