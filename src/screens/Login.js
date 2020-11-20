import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../Theme/css/main.css";
import { useStyles } from "../Theme/styles";
import Button from "@material-ui/core/Button";

function Login() {
  const signupData = {
    email: "",
    password: "",
  };
  const [isLoading, setisLoading] = useState(false);
  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    email: "",

    password: "",
  });
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
    if (!formData.password) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      return false;
    }
    setAboutRequiredFields({ ...aboutRequiredFields, password: "" });
    return true;
  };
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "email") {
      setAboutRequiredFields({ ...aboutRequiredFields, email: "" });
    } else if (e.target.name === "password") {
      setAboutRequiredFields({ ...aboutRequiredFields, password: "" });
    }
    setFormData({ ...formData, [e.target.name]: value });
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
  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    checkValidateForm();

    // if(isCheck===false){
    //   // alert("hello")
    //   seterror("You must have to add atleast one implementation step, for this fill steps field and press Add")

    // }
    // else{

    // setFormData({
    //   ...formData,
    //   skills: skillArrayData,
    //   material: materialArrayData,
    // });
    // console.log(formData, "signup on sumbit");

    const headers = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
      },
    };

    try {
      axios
        .post("http://localhost:3000/api/v1/auth/login", formData, headers)
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
            localStorage.setItem("jwt", res.data.token);
          }, 5000);

          // console.log(res, "res token");
        })
        .catch((err) => {
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

  const [formData, setFormData] = useState(signupData);
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
              required
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
              required
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

export default Login;
