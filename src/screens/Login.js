import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../Theme/css/main.css";
import { useStyles } from "../Theme/styles";
import Button from "@material-ui/core/Button";
import { Redirect, Route } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "react-router-dom";
function Login() {
  const signupData = {
    email: "",
    password: "",
  };
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
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
          console.log(res, "res user");
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          setFormData(signupData);
          setisSuccess(true);
        })
        .catch((err, res) => {
          setError(err.response.data);

          console.log(res, "res login");
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
              <label className="label-agree-term">Email*</label>

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
              <label className="label-agree-term">Password*</label>

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
            {error !== "" && formData.email && formData.password ? (
              <p className="error mt-1 mb-1"> {error}</p>
            ) : (
              ""
            )}
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
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
