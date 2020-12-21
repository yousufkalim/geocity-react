import React, { useEffect, useState } from "react";
import "../Theme/css/main.css";
import Autocomplete from "react-autocomplete";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Theme/styles";
import axios from "axios";
import ChipArray from "../shared/Chip";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  signupData,
  signupstepData,
  signupaboutRequired,
  signupskillRequired,
} from "../shared/Data";
import { Redirect } from "react-router-dom";
import SignupForm from "../Components/SignupForm";
function Signup() {
  const { addToast } = useToasts();

  // states start ************************************

  // formdata & arrayData states
  const [skillformData, setskillFormData] = useState(signupstepData);
  const [formData, setFormData] = useState(signupData);

  const [skillArrayData, setskillArrayData] = useState([]);
  const [materialArrayData, setmaterialArrayData] = useState([]);
  // *************

  // Single States
  const [address, setAddress] = useState("");
  const [material, setMaterial] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [isSuccess, setisSuccess] = useState("");

  //List States
  const [items, setItems] = useState([]);
  const [materialList, setMaterialList] = useState("");
  const [skillList, setskillList] = useState("");
  const [skillFieldList, setskillFieldList] = useState("");
  // **************

  // Required Fields states*****************
  const [aboutRequiredFields, setAboutRequiredFields] = useState(
    signupaboutRequired
  );
  const [skillRequiredFields, setskillRequiredFields] = useState(
    signupskillRequired
  );

  const [materialRequiredFields, setmaterialRequiredFields] = useState({
    name: "",
    error: "",
  });
  // *************************
  // states end ***************************

  // validation start*************************

  const ValidateSpecialization = () => {
    if (skillformData.specialization) {
      setskillRequiredFields({ ...skillRequiredFields, specialization: "" });

      return true;
    } else if (!skillformData.specialization) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, specialization: msg });
      return false;
    }
  };
  const validatePhoneNumber = () => {
    if (formData.phone) {
      setAboutRequiredFields({ ...aboutRequiredFields, phone: "" });
      return true;
    } else if (!formData.phone) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
      return false;
    }
  };

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (formData.email && isValid) {
      setAboutRequiredFields({ ...aboutRequiredFields, email: "" });
      return true;
    } else if (formData.email && !isValid) {
      const msg = "You have entered an invalid email address!";
      setAboutRequiredFields({ ...aboutRequiredFields, email: msg });
      return false;
    } else if (!formData.email) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, email: msg });
      return false;
    }
  };
  const validateAvailability = () => {
    if (formData.availability.length <= 5) {
      const msg = "Availability must be 6 chracters long";
      setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
      return false;
    } else if (formData.availability) {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
      return true;
    } else if (!formData.availability) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
      return false;
    }
    setAboutRequiredFields({ ...aboutRequiredFields, availability: "" });
    return true;
  };
  const ValidateSkillField = () => {
    if (skillformData.skillField) {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return true;
    } else if (!skillformData.skillField) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return false;
    }
  };

  const ValidateSkill = () => {
    if (skillformData.skill) {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, skill: msg });
      return true;
    } else if (!skillformData.skill) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, skill: msg });
      return false;
    }
  };

  const validateProfileDesc = () => {
    if (formData.profile_description) {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        profile_description: msg,
      });
      return true;
    } else if (!formData.profile_description) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        profile_description: msg,
      });
      return false;
    }
  };
  const validateFirstName = () => {
    // debugger;
    if (formData.firstname.length >= 4 && formData.firstname.length < 20) {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, firstname: msg });
    } else if (formData.firstname.trim().length < 5) {
      const msg = "firstname needs to be at least 5 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, firstname: msg });
      return false;
    } else if (formData.firstname.trim().length > 20) {
      const msg = "firstname must be less than or equal to 20 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, firstname: msg });
      return false;
    } else if (!formData.firstname.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, firstname: msg });
      return false;
    }

    return true;
  };
  const validateLastName = () => {
    if (formData.lastname.length >= 4 && formData.lastname.length < 20) {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, lastname: msg });
    } else if (formData.lastname.trim().length < 5) {
      const msg = "lastname needs to be at least 5 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, lastname: msg });
      return false;
    } else if (formData.lastname.trim().length > 20) {
      const msg = "lastname must be less than or equal to 20 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, lastname: msg });
      return false;
    } else if (!formData.lastname.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, lastname: msg });
      return false;
    }
    return true;
  };

  const validateScore = () => {
    if (skillformData.score === 5) {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, score: msg });
      return false;
    } else if (skillformData.score >= 5) {
      const msg = "Score needs to be equal 5 or less";
      setskillRequiredFields({ ...skillRequiredFields, score: msg });

      return false;
    } else if (!skillformData.score.length) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, score: msg });
      return false;
    }
    const num = parseInt(skillformData.score);
    const msg = "";
    setskillRequiredFields({ ...skillRequiredFields, score: msg });
    return true;
  };

  const validatePhoto = () => {
    if (formData.profile_picture) {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, profile_picture: msg });

      return true;
    } else if (!formData.profile_picture) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, profile_picture: msg });
      return false;
    }
  };
  const validateCity = () => {
    if (formData.city) {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    } else if (!formData.city) {
      let msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    }
  };
  const validateMaterial = () => {
    if (material) {
      let msg = "";

      setmaterialRequiredFields({ ...materialRequiredFields, name: msg });

      return true;
    } else if (!material) {
      let msg = "Required";
      setmaterialRequiredFields({ ...materialRequiredFields, name: msg });
      return false;
    }
  };
  const validatePassword = () => {
    if (
      formData.password.trim().length > 4 &&
      formData.password.trim().length < 20
    ) {
      setAboutRequiredFields({ ...aboutRequiredFields, password: "" });
      setFormData({ ...formData, password: formData.password });
      return true;
    } else if (formData.password.trim().length < 5) {
      const msg = "Passowrd needs to be at least 6 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });

      return false;
    } else if (formData.password.trim().length > 20) {
      const msg = "Passowrd needs to be  100 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      return false;
    } else if (!formData.password.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      return false;
    }
  };
  const validateConfirmPassword = () => {
    if (
      formData.confirm_password.trim().length > 4 &&
      formData.confirm_password.trim().length < 20
    ) {
      setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: "" });
      setFormData({ ...formData, confirm_password: formData.confirm_password });
      return true;
    } else if (formData.confirm_password !== formData.password) {
      const msg = "Confirm_Password should be same as Password";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        confirm_password: msg,
      });
    } else if (formData.confirm_password.trim().length < 5) {
      const msg = "Confirm_Password needs to be at least 6 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      return false;
    } else if (!formData.confirm_password.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: msg });
      return false;
    }
  };

  const ValidateUsername = () => {
    if (formData.username.length >= 4 && formData.username.length < 20) {
      const msg = "";

      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      setFormData({ ...formData, username: formData.username });
    } else if (formData.username.trim().length < 5) {
      const msg = "Username needs to be at least 5 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      return false;
    } else if (formData.username.trim().length > 20) {
      const msg = "Username must be less than or equal to 20 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      return false;
    } else if (!formData.username.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      return false;
    }

    return true;
  };

  // validation end******************

  // Handle_change
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      axios
        .get("http://localhost:3000/api/v1/auth/materialList")
        .then((res) => {
          setMaterialList(res.data.materials);
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }

    try {
      axios
        .get("http://localhost:3000/api/v1/auth/skillList")
        .then((res) => {
          setskillFieldList(res.data.skills);
          console.log(res, "res skill");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }
  }, []);
  const onMaterialChange = (e) => {
    setMaterial(e.target.value);
    if (e.target.value !== "") {
      if (Object.keys(materialArrayData).length > 0) {
        materialArrayData.map((mat) => {
          if (mat !== e.target.value) {
            const array = materialArrayData.filter(
              (mat) => mat !== e.target.value
            );
            if (e.target.value) {
              array.push(e.target.value);
            }
            setmaterialArrayData(array);
            const msg = "";
            setmaterialRequiredFields({
              ...materialRequiredFields,
              error: msg,
            });
          } else {
            const msg = "value already existed";
            setmaterialRequiredFields({
              ...materialRequiredFields,
              error: msg,
            });
            // alert("msg");
            const array = materialArrayData.filter(
              (mat) => mat !== e.target.value
            );
            console.log(array, "array mat");
            setmaterialArrayData(array);
          }
        });
      } else {
        setmaterialArrayData((prevState) => [...prevState, e.target.value]);
      }
    }
  };
  const handleChange = (e) => {
    let value = e.target.value;

    switch (e.target.name) {
      case "firstName":
        validateFirstName();
      case "lastName":
        validateLastName();
      case "username":
        ValidateUsername();
        break;
      case "email":
        validateEmail();
        break;
      case "password":
        validatePassword();
        break;
      case "confirm_password":
        validateConfirmPassword();
        break;
      // will use it
      case "profile_picture":
        validatePhoto();
        break;
      case "profile_description":
        validateProfileDesc();
        break;
      case "phone":
        validatePhoneNumber();
        break;
      case "availability":
        validateAvailability();
        break;

      default:
        break;
    }
    if (e.target.name === "phone") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.replace(/\D/g, ""),
      });
      // }
    } else if (e.target.name === "firstName") {
      setFormData({ ...formData, ["firstName"]: e.target.value });
    } else if (e.target.name === "lastName") {
      setFormData({ ...formData, ["lastName"]: e.target.value });
    } else {
      // console.log(value, "value");
      setFormData({ ...formData, [e.target.name]: value });
    }
  };

  const handleSkillChange = async (e) => {
    let value = e.target.value;

    if (e.target.name === "skillField") {
      setskillFormData({ ...skillformData, [e.target.name]: value });

      skillFieldList.map((skill) =>
        skill._id === e.target.value ? setskillList(skill.skill) : ""
      );
    } else if (e.target.name === "score") {
      setskillFormData({
        ...skillformData,
        [e.target.name]: e.target.value.replace(/\D/g, ""),
      });
      // }
    } else {
      setskillFormData({ ...skillformData, [e.target.name]: value });
    }
    switch (e.target.name) {
      case "skillField":
        ValidateSkillField();
        break;
      case "skill":
        ValidateSkill();
        break;
      case "specialization":
        ValidateSpecialization();
        break;
      case "score":
        validateScore();
        break;

      default:
        break;
    }
  };

  const onskillAdd = () => {
    checkValidateForm2();
    validateScore();

    const check = Object.values(skillformData).map((obj) => {
      if (obj !== "") {
        return true;
      } else {
        return false;
      }
    });
    if (check[0] === true) {
      setskillArrayData([...skillArrayData, skillformData]);
      setskillFormData(signupstepData);
      setskillRequiredFields(signupskillRequired);
    }
  };

  // ************
  const getAddress = (e) => {
    setAddress(e.target.value);
    fetch(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=housenumber&autocomplete=1&limit=10"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const msg = "";
        setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
        // console.log("res address", responseJson);
        var addressToSet = [];
        // debugger;
        for (var i = 0; i < responseJson.features.length; i++) {
          addressToSet.push({
            id: i,
            label: responseJson.features[i].properties.label,
            city: responseJson.features[i].properties.city,
            PostalCode: responseJson.features[i].properties.postcode,
            lat: responseJson.features[0].geometry.coordinates[1],
            lng: responseJson.features[0].geometry.coordinates[0],
          });
        }
        if (addressToSet.length === responseJson.features.length) {
          setItems(addressToSet);
        }
      })
      .catch((error) => {
        const msg = "Required";
        setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
        console.error(error);
      });
  };
  const SetAddress = (item) => {
    setAddress(item);
    for (let i = 0; i < items.length; i++) {
      if (items[i].label === item) {
        var city = items[i].city;
        var zipCode = items[i].PostalCode;
        var lat = items[i].lat.toString();
        var lng = items[i].lng.toString();
        var newAddress = items[i].label.split(String(zipCode));
        setFormData({
          address: newAddress[0],
          zipCode: zipCode,
          city: city,
          latitude: lat,
          longitude: lng,
          firstname: formData.firstname,
          lastname: formData.lastname,
          facebook: formData.facebook,
          youtube: formData.youtube,
          instagram: formData.instagram,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
          availability: formData.availability,
        });
      }
    }
  };
  // city_end

  // validation fuctions start
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

    if (!reqFields) {
      setAboutRequiredFields(obj);

      return false;
    } else {
      // alert("hello");
      setAboutRequiredFields(signupaboutRequired);
      return true;
    }
  };
  const checkValidateForm2 = () => {
    let obj = {};
    let reqFields = true;
    Object.keys(skillformData).map((key) => {
      if (skillformData[key] === "") {
        obj[key] = "Required";
        reqFields = false;
      }
      return obj;
    });
    // debugger;
    if (!reqFields) {
      const msg = "Required";

      setskillRequiredFields((prevState) => {
        Object.assign(skillRequiredFields, obj);
      });
      return false;
    } else {
      setskillRequiredFields(signupskillRequired);
      return true;
    }
  };

  // ******************
  console.log(formData, "formData form");

  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    checkValidateForm();
    validateMaterial();
    // social links
    console.log(formData.firstName, "formData.firstName");
    // ****
    const newFormData = new FormData();
    newFormData.append("firstName", formData.firstname);
    newFormData.append("lastName", formData.lastname);
    newFormData.append("username", formData.username);
    newFormData.append("availability", formData.availability);
    newFormData.append("city", formData.city);
    newFormData.append("confirm_password", formData.confirm_password);
    newFormData.append("email", formData.email);
    newFormData.append("latitude", formData.latitude);
    newFormData.append("longitude", formData.longitude);
    newFormData.append("password", formData.password);
    newFormData.append("phone", formData.phone);
    newFormData.append("profile_description", formData.profile_description);
    newFormData.append("profile_picture", photo);
    newFormData.append("zipCode", formData.zipCode);

    newFormData.append("facebook", formData.facebook);
    newFormData.append("instagram", formData.instagram);
    newFormData.append("youtube", formData.youtube);

    newFormData.append("skills", JSON.stringify(skillArrayData));
    newFormData.append("material", JSON.stringify(materialArrayData));
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post("http://localhost:3000/api/v1/auth/register", newFormData)
        .then((res) => {
          setisLoading(false);
          setFormData(signupData);
          setisSuccess(true);
          addToast("User Registered SuccessFully!", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          if (err.response.data) {
            if (err.response.data.message) {
              addToast(`${err.response.data.message}`, {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 1000,
              });
            } else {
              addToast(`${err.response.data}`, {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 1000,
              });
            }
          }

          console.log(" error signup =>", err.response.data);
        });
    } catch (error) {
      console.log(error, "error signup catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  if (isSuccess === true) {
    return <Redirect to="/Login" />;
  } else {
    return (
      <div className="main">
        <div className="containerProject">
          <SignupForm
            // HandleChange
            handleChange={handleChange}
            handleSkillChange={handleSkillChange}
            onMaterialChange={onMaterialChange}
            address={address}
            getAddress={getAddress}
            SetAddress={SetAddress}
            setPhoto={setPhoto}
            // formData
            isLoading={isLoading}
            skillformData={skillformData}
            formData={formData}
            //********** */
            skillArrayData={skillArrayData}
            materialArrayData={materialArrayData}
            setmaterialArrayData={setmaterialArrayData}
            //Validation Required
            skillRequiredFields={skillRequiredFields}
            aboutRequiredFields={aboutRequiredFields}
            materialRequiredFields={materialRequiredFields}
            validateAvailability={validateAvailability}
            validateConfirmPassword={validateConfirmPassword}
            validateEmail={validateEmail}
            validatePassword={validatePassword}
            validatePhoneNumber={validatePhoneNumber}
            validateProfileDesc={validateProfileDesc}
            validateScore={validateScore}
            ValidateSkillField={ValidateSkillField}
            ValidateUsername={ValidateUsername}
            validateFirstName={validateFirstName}
            validateLastName={validateLastName}
            // ***********
            // Components
            CircularProgress={CircularProgress}
            Autocomplete={Autocomplete}
            ChipArray={ChipArray}
            useStyles={useStyles}
            Link={Link}
            addToast={addToast}
            Button={Button}
            // *********

            // List
            items={items}
            materialList={materialList}
            skillFieldList={skillFieldList}
            skillList={skillList}
            material={material}
            // ***********
            // onSubmit
            onskillAdd={onskillAdd}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Signup;
