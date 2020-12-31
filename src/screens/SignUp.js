import React, { useEffect, useState } from "react";
import "../Theme/css/main.css";
import Autocomplete from "react-autocomplete";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Theme/styles";
import axios from "axios";
import ChipArray from "../shared/MaterialChip";
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
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  const [isSuccess, setisSuccess] = useState("");
  const [otherSKill, setotherSkill] = useState("");

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
  const showHide1 = (e) => {
    e.preventDefault();
    if (type1 === "password") {
      setType1("input");
    } else {
      setType1("password");
    }
  };
  const showHide2 = (e) => {
    e.preventDefault();
    if (type2 === "password") {
      setType2("input");
    } else {
      setType2("password");
    }
  };
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
    if (!formData.phone) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
      return false;
    } else if (formData.phone.length < 10 || formData.phone.length > 10) {
      const msg = "Phone number needs to be equal to 10 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
      return true;
    }
  };

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
  const validateAvailability = () => {
    if (!formData.availability) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
      return false;
    } else if (formData.availability > 168) {
      const msg = "Availibilty must be less than equal to 168";
      setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
      return true;
    }
  };
  const ValidateSkillField = () => {
    // alert(skillformData.skillField);
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
  const ValidateOtherSkill = () => {
    if (otherSKill) {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, otherSKill: msg });
      return true;
    } else if (!otherSKill) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, otherSKill: msg });
      return false;
    }
  };

  const validateProfileDesc = () => {
    if (!formData.profile_description) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        profile_description: msg,
      });
      return false;
    } else if (formData.profile_description.length < 10) {
      const msg =
        "Profile Description  needs to be atleast  10 characters long";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        profile_description: msg,
      });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        profile_description: msg,
      });
      return true;
    }
  };
  const validateFirstName = () => {
    if (formData.firstname || formData.firstname !== "") {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, firstname: msg });
      return true;
    } else {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, firstname: msg });
      return false;
    }
  };
  const validateLastName = () => {
    if (!formData.lastname.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, lastname: msg });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, lastname: msg });
      return false;
    }
  };

  const validateScore = () => {
    // debugger;
    // alert(skillformData.score);
    // console.log(skillformData.score);
    if (skillformData.score) {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, score: msg });
      return true;
    } else if (skillformData.score >= 6) {
      const msg = "Rating must be less than equal to 5";
      setskillRequiredFields({ ...skillRequiredFields, score: msg });
    } else {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, score: msg });
      return false;
    }
  };

  const validateCity = () => {
    // debugger;
    if (address === "") {
      let msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    } else if (!formData.city) {
      let msg = "Please select your complete address from list";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return true;
    }
  };
  const validateMaterial = () => {
    if (!material) {
      let msg = "Required";
      setmaterialRequiredFields({ ...materialRequiredFields, name: msg });
      return false;
    } else {
      let msg = "";
      setmaterialRequiredFields({ ...materialRequiredFields, name: msg });

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
  const validateConfirmPassword = () => {
    // debugger;
    if (!formData.confirm_password.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: msg });
      return false;
    } else if (formData.confirm_password !== formData.password) {
      const msg = "Confirm_Password should be same as Password";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        confirm_password: msg,
      });
      return false;
    } else if (formData.confirm_password.length < 6) {
      const msg = "Confirm_Password needs to be at least 6 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: msg });
      return false;
    } else {
      setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: "" });
      setFormData({ ...formData, confirm_password: formData.confirm_password });
      return true;
    }
  };

  const ValidateUsername = () => {
    if (!formData.username.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      const isValid = /^[a-zA-Z0-9]/.test(formData.username);
      if (formData.username && !isValid) {
        const msg = "special characters are not allowed";
        setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
        return false;
      }
      // setFormData({ ...formData, username: formData.username });
      return true;
    }
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
      // console.log(error, "error catch");
    }

    try {
      axios
        .get("http://localhost:3000/api/v1/auth/skillList")
        .then((res) => {
          setskillFieldList(res.data.skills);
          // console.log(res, "res skill");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, []);
  const onMaterialChange = (e) => {
    setMaterial(e.target.value);
    if (e.target.value !== "") {
      const msg = "";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        name: msg,
      });
    }
  };
  const onMaterialAdd = () => {
    validateMaterial();
    // debugger;
    if (materialArrayData.length > 0) {
      const tempCheck = materialArrayData.find((cont) => cont === material);

      if (tempCheck) {
        addToast("Material already existed", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        setMaterial("");
      } else {
        var array = materialArrayData.filter((mat) => mat !== material);
        if (material) {
          array.push(material);
        }
        setmaterialArrayData(array);
        // setMaterial("");
        const msg = "";
        setmaterialRequiredFields({
          ...materialRequiredFields,
          error: msg,
        });
        setMaterial("");
      }
    } else {
      if (material) {
        setmaterialArrayData((prevState) => [...prevState, material]);
        setMaterial("");
      }
    }
  };
  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "phone") {
      if (e.target.value.length <= 10) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.replace(/\D/g, ""),
        });
      }

      // }
    } else if (e.target.name === "availability") {
      console.log(e.target, "e.target");
      const avail = e.target.value.replace(/\D/g, "");
      if (e.target.value <= 168) {
        if (avail !== "") {
          if (avail.length <= 3 && avail < 169) {
            setFormData({
              ...formData,
              [e.target.name]: avail,
            });
          }
        } else {
          if (e.target.value) {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value.replace(/\D/g, ""),
            });
          } else {
            setFormData({
              ...formData,
              [e.target.name]: "",
            });
          }
        }
        const msg = "";
        setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
      } else {
        const msg = "Availibilty must be less than equal to 168";
        setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
      }
    } else {
      // console.log(value, "value");
      setFormData({ ...formData, [e.target.name]: value });
    }
  };
  // console.log(skillformData, "skillformData");
  const handleSkillChange = (e) => {
    let value = e.target.value;
    if (skillArrayData.length === 3) {
      // alert(skillArrayData.length);
      addToast("skills length must be 1 or less than equal to 3", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      // seterrorMessage("You can only add upto 3 skills  or less");
    } else {
      if (e.target.name === "skillField") {
        if (e.target.value) {
          setskillFormData({ ...skillformData, [e.target.name]: value });

          skillFieldList.map((skill) =>
            skill._id === e.target.value ? setskillList(skill.skill) : ""
          );
        }
      } else if (e.target.name === "score") {
        var avail = e.target.value.replace(/\D/g, "");
        if (e.target.value <= 5) {
          if (avail !== "") {
            if (avail.length >= 2 && e.target.value >= 5) {
            } else {
              setskillFormData({
                ...skillformData,
                [e.target.name]: avail,
              });
            }
          } else {
            if (e.target.value) {
              setskillFormData({
                ...skillformData,
                [e.target.name]: e.target.value.replace(/\D/g, ""),
              });
            } else {
              setskillFormData({
                ...skillformData,
                [e.target.name]: "",
              });
            }
          }
          const msg = "";
          setskillRequiredFields({ ...skillRequiredFields, score: msg });
        } else {
          const msg = "Rating must be less than equal to 5";
          setskillRequiredFields({ ...skillRequiredFields, score: msg });
        }
      } else {
        setskillFormData({ ...skillformData, [e.target.name]: value });
      }
    }
  };
  // console.log(skillArrayData, "skillArrayData");
  const onskillAdd = () => {
    const checkForm = checkValidateForm2();
    // validateScore();
    if (checkForm == true) {
      if (skillArrayData.length > 0) {
        const tempCheck = skillArrayData.find(
          (cont) => cont.skillField === skillformData.skillField
        );
        const tempCheck2 = skillArrayData.find(
          (cont) => cont.skill === skillformData.skill
        );
        if (tempCheck || tempCheck2) {
          const msg = "Skill already existed";
          addToast("Skill already existed", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        } else {
          if (otherSKill !== "") {
            skillformData.skill = otherSKill;
          }
          // debugger;
          const check = Object.values(skillformData).map((obj) => {
            if (obj !== "") {
              return true;
            } else {
              return false;
            }
          });
          if (check[0] === true) {
            if (skillArrayData.length === 3) {
              // alert(skillArrayData.length);
              addToast("skills length must be 1 or less than equal to 3", {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
              // seterrorMessage("You can only add upto 3 skills  or less");
            } else {
              if (otherSKill !== "") {
                skillformData.skill = otherSKill;
              }

              setskillArrayData([...skillArrayData, skillformData]);
              setskillFormData(signupstepData);
              setskillRequiredFields(signupskillRequired);
            }
          }
        }
      } else {
        if (otherSKill !== "") {
          skillformData.skill = otherSKill;
        }
        // debugger;
        const check = Object.values(skillformData).map((obj) => {
          if (obj !== "") {
            return true;
          } else {
            return false;
          }
        });
        if (check[0] === true) {
          if (skillArrayData.length === 3) {
            // alert(skillArrayData.length);
            addToast("skills length must be 1 or less than equal to 3", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            // seterrorMessage("You can only add upto 3 skills  or less");
          } else {
            if (otherSKill !== "") {
              skillformData.skill = otherSKill;
            }

            setskillArrayData([...skillArrayData, skillformData]);
            setskillFormData(signupstepData);
            setskillRequiredFields(signupskillRequired);
          }
        }
      }
    }
  };

  // ************
  const getAddress = (e) => {
    setAddress(e.target.value);
    validateCity();
    fetch(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=housenumber&autocomplete=1&limit=10"
    )
      .then((response) => response.json())
      .then((responseJson) => {
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
        // console.error(error);
      });
  };
  const SetAddress = (item) => {
    setAddress(item);
    validateCity();

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
        if (key === "specialization") {
          obj[key] = "";
        } else {
          obj[key] = "Required";
          reqFields = false;
        }
      }
      return obj;
    });
    // debugger;
    // setskillRequiredFields({
    //   skillField: "Required",
    //   skill: "Required",
    //   specialization: "Required",
    //   score: "Required",
    // });

    if (!reqFields) {
      const msg = "Required";
      if (otherSKill !== "") {
        obj.skill = "";
        // setskillRequiredFields((prevState) => {
        //   Object.assign(skillRequiredFields, obj);
        // });
        setskillRequiredFields(obj);
        return false;
      } else {
        setskillRequiredFields(obj);
        return false;
      }
    } else {
      setskillRequiredFields(signupskillRequired);
      return true;
    }
  };

  // ******************
  // console.log(formData, "formData form");

  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    checkValidateForm();

    // checkValidateForm2();
    if (skillArrayData.length == 0) {
      addToast(`You must add atleast one skill`, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      setisLoading(false);
    } else if (materialArrayData.length == 0) {
      addToast(`You must add atleast one material`, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      setisLoading(false);

      validateMaterial();
    } else {
      // social links
      // console.log(formData.firstName, "formData.firstName");
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
              autoDismissTimeout: 3000,
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

            // console.log(" error signup =>", err.response.data);
          });
      } catch (error) {
        // console.log(error, "error signup catch");
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      }
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
            ValidateSkill={ValidateSkill}
            ValidateUsername={ValidateUsername}
            validateFirstName={validateFirstName}
            validateLastName={validateLastName}
            ValidateOtherSkill={ValidateOtherSkill}
            validateMaterial={validateMaterial}
            validateCity={validateCity}
            // ***********
            // Components
            CircularProgress={CircularProgress}
            Autocomplete={Autocomplete}
            ChipArray={ChipArray}
            useStyles={useStyles}
            Link={Link}
            addToast={addToast}
            Button={Button}
            showHide1={showHide1}
            type1={type1}
            type2={type2}
            showHide2={showHide2}
            // *********

            // List
            items={items}
            materialList={materialList}
            skillFieldList={skillFieldList}
            skillList={skillList}
            material={material}
            otherSKill={otherSKill}
            setotherSkill={setotherSkill}
            setskillArrayData={setskillArrayData}
            // ***********
            // onSubmit
            onskillAdd={onskillAdd}
            onSubmit={onSubmit}
            onMaterialAdd={onMaterialAdd}
          />
        </div>
      </div>
    );
  }
}

export default Signup;
