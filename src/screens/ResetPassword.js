import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../Theme/css/main.css";
import { useStyles } from "../Theme/styles";
import Button from "@material-ui/core/Button";
import { Redirect, Route } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useToasts } from "react-toast-notifications";
import { loginData } from "../shared/Data";
import { Link } from "react-router-dom";
function Login(props) {
  const { addToast } = useToasts();
  // single states
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [formData, setFormData] = useState({ password: "", confirm: "" });
  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");

  // ********
  // Required Fields states
  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    confirm: "",
    password: "",
  });

  // validation start ******************
  const validateconfirm = () => {
    if (!formData.confirm.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, confirm: msg });
      return false;
    } else if (formData.confirm.length < 6) {
      const msg = "Passowrd needs to be at least 6 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, confirm: msg });

      return false;
    } else {
      setAboutRequiredFields({ ...aboutRequiredFields, confirm: "" });
      setFormData({ ...formData, confirm: formData.confirm });
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

  const onSubmit = (e) => {
    // alert(props.match.params.id);
    e.preventDefault();
    setisLoading(true);
    const check = checkValidateForm();
    if (check === true) {
      if (formData.password === formData.confirm) {
        try {
          axios
            .post(
              `http://160.153.249.64:7002/api/v1/profile/reset-password?passwordToken=${props.match.params.id}`,
              {
                password: formData.password,
                confirm: formData.confirm,
              }
            )
            .then((res) => {
              setisLoading(false);
              setFormData({ password: "", confirm: "" });
              setisSuccess(true);
              addToast(`Password updated Successfully`, {
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
        addToast(`Password and Confirm_Password are not same`, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
      addToast(`Please fill all the fields`, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
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
  const showHide1 = (e) => {
    e.preventDefault();
    if (formData.confirm) {
      if (type1 === "password") {
        setType1("input");
      } else {
        setType1("password");
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
          <form method="POST" className="appointmentform" id="appointment-form">
            <h2>Reset Password</h2>
            <div className="form-group-1">
              <label className="label-agree-term row">
                Password*{" "}
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
                      top: "11rem",
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
                      top: "11rem",
                    }}
                  ></i>
                )}
              </div>
              <label className="label-agree-term row">
                Confirm Password*
                {aboutRequiredFields.confirm !== "" ? (
                  <p className="error"> {aboutRequiredFields.confirm}</p>
                ) : (
                  ""
                )}
              </label>
              <div style={{ display: "flex" }}>
                <input
                  type={type1}
                  name="confirm"
                  id="confirm"
                  placeholder="Confirm_Password"
                  onBlur={validateconfirm}
                  onChange={handleChange}
                  value={formData.confirm}
                />
                {type1 === "password" ? (
                  <i
                    onClick={showHide1}
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
                    onClick={showHide1}
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
