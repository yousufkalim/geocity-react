import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../Theme/css/main.css";
import { useStyles } from "../Theme/styles";
import Button from "@material-ui/core/Button";
import { Redirect, Route } from "react-router-dom";

function Login() {
  const signupData = {
    email: "",
    password: "",
  };
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);

  const [formData, setFormData] = useState(signupData);

  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    email: "",
    password: "",
  });

  // validation start ******************
  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    if (!formData.email) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, email: msg });
      return false;
    } else if (formData.email && !isValid) {
      const msg = "You have entered an invalid email address!";
      setAboutRequiredFields({ ...aboutRequiredFields, email: msg });
      return false;
    } else {
      setAboutRequiredFields({ ...aboutRequiredFields, email: "" });
      return true;
    }
  };
  const validatePassword = () => {
    if (formData.password.length <= 4) {
      // alert("hello");
      const msg = "Password length must be at least 6 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      return false;
    } else if (!formData.password) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      return false;
    } else {
      setAboutRequiredFields({ ...aboutRequiredFields, password: "" });
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
      // validatePortfolioThumbnail()
      // validatePortfolioFiles()
      const msg = "Required";
      // const flashData = { type: "error", text: "Fill the required fields." }
      // props.addFlashMessage(flashData)
      return false;
    } else {
      return true;
    }
  };
  // validation end ***************

  // handle Actions

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "email") {
      validateEmail();
    } else if (e.target.name === "password") {
      validatePassword();
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    checkValidateForm();

    try {
      axios
        .post("http://localhost:3000/api/v1/auth/login", formData)
        .then((res) => {
          setisLoading(false);
          localStorage.setItem("jwt", res.data.token);
          setFormData(signupData);
          setisSuccess(true);
          // setisError()
        })
        .catch((err, res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);

          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
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
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onFocus={validateEmail}
                onChange={handleChange}
              />
              {aboutRequiredFields.email !== "" ? (
                <p className="error"> {aboutRequiredFields.email}</p>
              ) : (
                ""
              )}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onFocus={validatePassword}
                onChange={handleChange}
                value={formData.password}
              />
              {aboutRequiredFields.password !== "" ? (
                <p className="error"> {aboutRequiredFields.password}</p>
              ) : (
                ""
              )}
            </div>

            <div className="form-submit">
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
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
