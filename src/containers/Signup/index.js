import React, { useEffect, useState } from "react";
import "../../Theme/css/main.css";
import Autocomplete from "react-autocomplete";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../../Theme/styles";
import axios from "axios";
import ChipArray from "../../Components/UI/MaterialChip";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { url } from "../../urlConfig";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
  signupData,
  signupstepData,
  signupaboutRequired,
  signupskillRequired,
} from "../../shared/Data";
import { Redirect } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import SuccessMessage from "./components/successMessage";

function Signup() {
  const { addToast } = useToasts();

  // states start ************************************
  const socialLinks = {
    facebook: "",
    instagram: "",
    youtube: "",
  };
  // formdata & arrayData states
  const [skillformData, setskillFormData] = useState(signupstepData);
  const [formData, setFormData] = useState(signupData);
  const [socialformData, setsocialFormData] = useState(socialLinks);
  const [CategoryList, setCategoryList] = useState("");

  const [skillArrayData, setskillArrayData] = useState([]);
  const [materialArrayData, setmaterialArrayData] = useState([]);
  // *************

  // Single States
  const [address, setAddress] = useState("");
  const [successmodal, setSuccessModal] = useState(false);

  const [material, setMaterial] = useState("");
  const [interest, setInterest] = useState("");
  const [interestArrayData, setinterestArrayData] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  const [isSuccess, setisSuccess] = useState("");
  const [otherSKill, setotherSkill] = useState("");
  const [otherMaterial, setotherMaterial] = useState("");

  //List States
  const [items, setItems] = useState([]);
  const [skillFieldItems, setskillFieldItems] = useState([]);
  const [skillField, setskillField] = useState("");

  const [materialList, setMaterialList] = useState("");
  const [skillList, setskillList] = useState("");
  const [skillFieldList, setskillFieldList] = useState("");
  // **************

  // Required Fields states*****************
  const [aboutRequiredFields, setAboutRequiredFields] =
    useState(signupaboutRequired);
  const [skillRequiredFields, setskillRequiredFields] =
    useState(signupskillRequired);

  const [materialRequiredFields, setmaterialRequiredFields] = useState({
    name: "",
    error: "",
    otherMaterial: "",
  });
  const [interestRequiredFields, setinterestRequiredFields] = useState({
    name: "",
    error: "",
  });
  // *************************
  // states end ***************************

  const successToggle = () => {
    setSuccessModal(!successmodal);
  };
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

  const ValidateIntension = () => {
    if (skillformData.intentions) {
      let msg = "";
      setskillRequiredFields({ ...skillRequiredFields, intentions: msg });

      return true;
    } else if (!skillformData.intentions) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, intentions: msg });
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
      let split = formData.phone.split("");
      if (split[0] !== "0") {
        const msg = "Phone number must start with 0";
        setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
        return false;
      } else {
        const msg = "";
        setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
        return true;
      }
    }
  };

  const validateEmail = () => {
    const isValid =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z]+)*$/.test(
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
  const ValidateOtherMaterial = () => {
    if (otherMaterial) {
      const msg = "";
      setmaterialRequiredFields({ ...materialRequiredFields, name: msg });
      return true;
    } else if (!otherSKill) {
      const msg = "Required";
      setmaterialRequiredFields({ ...materialRequiredFields, name: msg });
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
    // ""
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
    // ""
    if (address === "") {
      let msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    } else if (formData.city === "") {
      let msg = "Please select your complete address from list";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return true;
    }
  };
  const ValidateSkillField = () => {
    // alert(skillformData.skillField);
    if (skillField === "") {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return true;
    } else if (!skillformData.skillField) {
      let msg = "Please select your skill from list";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return false;
    } else {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
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
  const validateInterest = () => {
    if (!interest) {
      let msg = "Required";
      setinterestRequiredFields({ ...interestRequiredFields, name: msg });
      return false;
    } else {
      let msg = "";
      setinterestRequiredFields({ ...interestRequiredFields, name: msg });

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
    // ""
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
        .get(`${url}/api/v1/auth/categoryList`)
        .then((res) => {
          setCategoryList(res.data.category);
          // console.log(res, "response category");
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
    try {
      axios
        .get(`${url}/api/v1/auth/materialList`)
        .then((res) => {
          setMaterialList(res.data.materials);
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }

    try {
      axios
        .get(`${url}/api/v1/auth/skillList`)
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
  const onMaterialAdd = async () => {
    let matCheck = validateMaterial();
    // ""
    if (matCheck === true) {
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

          if (material !== "Other") {
            array.push(material);
          }
          if (otherMaterial) {
            try {
              let response = await axios.post(
                `${url}/api/v1/auth/createMaterial`,
                { name: otherMaterial }
              );
              let _id = response.data.material;
              array.push(_id);
            } catch (error) {
              addToast(error.response.data.message, {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
            }
          }
          setmaterialArrayData(array);
          // setMaterial("");
          const msg = "";
          setmaterialRequiredFields({
            ...materialRequiredFields,
            error: msg,
          });
          setMaterial("");
          setotherMaterial("");
        }
      } else {
        if (material !== "Other") {
          setmaterialArrayData((prevState) => [...prevState, material]);
          setMaterial("");
        } else {
          try {
            let response = await axios.post(
              `${url}/api/v1/auth/createMaterial`,
              { name: otherMaterial }
            );
            let _id = response.data.material;
            setmaterialArrayData((prevState) => [...prevState, _id]);
          } catch (error) {
            addToast(error.response.data.message, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          }

          setotherMaterial("");
          setMaterial("");
        }
      }
    }
  };

  const onInterestChange = (e) => {
    setInterest(e.target.value);
    if (e.target.value !== "") {
      const msg = "";
      setinterestRequiredFields({
        ...interestRequiredFields,
        name: msg,
      });
    }
  };
  const onInterestAdd = () => {
    validateInterest();
    // ""
    if (interestArrayData.length > 0) {
      const tempCheck = interestArrayData.find((cont) => cont === interest);

      if (tempCheck) {
        addToast("Material already existed", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        setInterest("");
      } else {
        var array = interestArrayData.filter((mat) => mat !== interest);

        if (interest) {
          array.push(interest);
        }
        setinterestArrayData(array);
        // setMaterial("");
        const msg = "";
        setinterestRequiredFields({
          ...interestRequiredFields,
          error: msg,
        });
        setInterest("");
      }
    } else {
      if (interest) {
        setinterestArrayData((prevState) => [...prevState, interest]);
        setInterest("");
      }
    }
  };

  const handleSocialChange = (e) => {
    setsocialFormData({ ...socialformData, [e.target.name]: e.target.value });
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
    if (skillArrayData.length === 5) {
      // alert(skillArrayData.length);
      addToast("skills length must be 1 or less than equal to 5", {
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
        setskillFormData({ ...skillformData, [e.target.name]: value });
      } else {
        setskillFormData({ ...skillformData, [e.target.name]: value });
      }
    }
  };
  // console.log(skillArrayData, "skillArrayData");
  const onskillAdd = () => {
    checkValidateForm2();

    // validateScore();
    if (skillArrayData.length > 0) {
      const tempCheck = skillArrayData.find(
        (cont) => cont.skillField === skillformData.skillField
      );
      const tempCheck2 = skillArrayData.find(
        (cont) => cont.skill === skillformData.skill
      );
      if (tempCheck && tempCheck2) {
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
        // ""
        const check = Object.values(skillformData).map((obj) => {
          if (obj !== "") {
            return true;
          } else {
            return false;
          }
        });
        if (check[0] === true && check[1] === true && check[2] === true) {
          if (skillArrayData.length === 5) {
            // alert(skillArrayData.length);
            addToast("skills length must be 1 or less than equal to 5", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            // seterrorMessage("You can only add upto 3 skills  or less");
          } else {
            if (skillformData.skill === "Other") {
              if (otherSKill !== "") {
                skillformData.skill = otherSKill;

                setskillArrayData([...skillArrayData, skillformData]);
                setskillFormData(signupstepData);
                setskillRequiredFields(signupskillRequired);
                setotherSkill("");
                setskillField("");
              } else {
                ValidateOtherSkill();
              }
            } else {
              setskillArrayData([...skillArrayData, skillformData]);
              setskillFormData(signupstepData);
              setskillField("");
              setskillRequiredFields(signupskillRequired);
            }
          }
        }
      }
    } else {
      // ""
      const check = Object.values(skillformData).map((obj) => {
        if (obj !== "") {
          return true;
        } else {
          return false;
        }
      });
      if (check[0] === true && check[1] === true && check[2] === true) {
        if (skillArrayData.length === 5) {
          // alert(skillArrayData.length);
          addToast("skills length must be 1 or less than equal to 5", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          // seterrorMessage("You can only add upto 3 skills  or less");
        } else {
          // if (otherSKill !== "") {
          //   skillformData.skill = otherSKill;
          // }
          if (skillformData.skill === "Other") {
            if (otherSKill !== "") {
              skillformData.skill = otherSKill;

              setskillArrayData([...skillArrayData, skillformData]);
              setskillFormData(signupstepData);
              setskillRequiredFields(signupskillRequired);
              setskillField("");
              setotherSkill("");
            } else {
              ValidateOtherSkill();
            }
          } else {
            setskillArrayData([...skillArrayData, skillformData]);
            setskillFormData(signupstepData);
            setskillRequiredFields(signupskillRequired);
            setskillField("");
          }
        }
      }
    }
  };
  const getSkillField = (e) => {
    setskillField(e.target.value);
    ValidateSkillField();
    fetch(`${url}/api/v1/auth/getSkillList/?q=${e.target.value}`)
      .then((response) => response.json())
      .then((responseJson) => {
        var addressToSet = [];
        // ""
        for (var i = 0; i < responseJson.length; i++) {
          addressToSet.push({
            id: responseJson[i]._id,
            label: responseJson[i].skillField,
          });
        }
        if (addressToSet.length === responseJson.length) {
          setskillFieldItems(addressToSet);
        }
        // setskillFieldItems(responseJson);
      });
  };
  const SetSkillFieldAddress = (item) => {
    setskillField(item);
    ValidateSkillField();
    var _id;
    for (let i = 0; i < skillFieldItems.length; i++) {
      if (skillFieldItems[i].label === item) {
        _id = skillFieldItems[i].id;

        setskillFormData({ ...skillformData, skillField: _id });
      }
    }
    skillFieldList.map((skill) =>
      skill._id === _id ? setskillList(skill.skill) : ""
    );
  };
  // ************
  const getAddress = (e) => {
    setAddress(e.target.value);
    validateCity();
    fetch(`${url}/api/v1/auth/places/?name=${e.target.value}`)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("res address", responseJson);
        // console.log(responseJson, "responseJson");

        var addressToSet = [];
        // ""
        for (var i = 0; i < responseJson.places.length; i++) {
          addressToSet.push({
            id: i,
            label: responseJson.places[i].formatted_address,
            // city: responseJson.places[i].properties.city,
            // PostalCode: responseJson.places[i].properties.postcode,
            lat: responseJson.places[i].geometry.location.lat,
            lng: responseJson.places[i].geometry.location.lng,
          });
        }
        if (addressToSet.length === responseJson.places.length) {
          setItems(addressToSet);
        }
      })
      .catch((error) => {
        const msg = "Required";
        setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
        // console.error(error);
      });
  };
  const SetAddress = async (item) => {
    setAddress(item);
    validateCity();
    let placesKey = "GOOGLE_API_KEY_REDACTED";
    for (let i = 0; i < items.length; i++) {
      if (items[i].label === item) {
        let place = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${items[i].lat},${items[i].lng}&key=${placesKey}`
        );
        let temp = place.data.results[0].formatted_address.split(",");
        let city;
        let zipCode;

        if (temp.length === 4) {
          let array = temp[2].split(" ");
          zipCode = Number(array[1]);
          city = array[2];
        } else {
          let array = temp[1].split(" ");
          zipCode = Number(array[1]);
          city = array[2];
        }

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
      const hasKey = aboutRequiredFields.hasOwnProperty([key]);

      if (hasKey && formData[key] === "") {
        obj[key] = "Required";
        reqFields = false;
      }
      return obj;
    });
    if (!reqFields) {
      setAboutRequiredFields(obj);

      // setmaterialArrayData((prevState) => [...prevState, material]);
      return false;
    } else {
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
        obj.otherSKill = "Required";
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
    // social links
    // console.log(formData.firstName, "formData.firstName");
    // ****
    const newFormData = new FormData();
    newFormData.append("firstName", formData.firstname);
    newFormData.append("lastName", formData.lastname);
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

    newFormData.append("facebook", socialformData.facebook);
    newFormData.append("instagram", socialformData.instagram);
    newFormData.append("youtube", socialformData.youtube);
    newFormData.append("interests", JSON.stringify(interestArrayData));

    newFormData.append("skills", JSON.stringify(skillArrayData));

    materialArrayData &&
      newFormData.append("material", JSON.stringify(materialArrayData));
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      let response = await axios.post(
        `${url}/api/v1/auth/register`,
        newFormData
      );
      try {
        let response = await axios.post(
          `${url}/api/v1/auth/email-verfication`,
          { email: formData.email }
        );
        setFormData(signupData);

        setisLoading(false);
        successToggle();

        addToast(response.data.message, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      } catch (err) {
        setisLoading(false);

        if (err.response.data) {
          if (err.response.data.message) {
            addToast(`${err.response.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          }
        }
      }

      // console.log(" error signup =>", err.response.data);
    } catch (err) {
      setisLoading(false);

      if (err.response) {
        addToast(`${err.response.data.message}`, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }
    }
  };
  const GoToLogin = () => {
    setisSuccess(true);
    successToggle();
  };
  if (isSuccess === true) {
    return <Redirect to="/Login" />;
  } else {
    return (
      <>
        <Modal size="lg" isOpen={successmodal} toggle={successToggle}>
          <ModalBody>
            <SuccessMessage
              toggle={successToggle}
              onClick={GoToLogin}
              title="Un e-mail de vérification vous a été envoyé, merci de cliquer sur le lien présent dans cet e-mail."
              buttonText="Ok!"
            />
          </ModalBody>
        </Modal>
        <div className="main">
          <div className="containerProject">
            <SignupForm
              // HandleChange
              handleChange={handleChange}
              handleSkillChange={handleSkillChange}
              onMaterialChange={onMaterialChange}
              onInterestChange={onInterestChange}
              address={address}
              getAddress={getAddress}
              getSkillField={getSkillField}
              SetSkillFieldAddress={SetSkillFieldAddress}
              skillField={skillField}
              SetAddress={SetAddress}
              setPhoto={setPhoto}
              // formData
              isLoading={isLoading}
              skillformData={skillformData}
              formData={formData}
              socialformData={socialformData}
              handleSocialChange={handleSocialChange}
              //********** */
              skillArrayData={skillArrayData}
              interestArrayData={interestArrayData}
              setinterestArrayData={setinterestArrayData}
              materialArrayData={materialArrayData}
              setmaterialArrayData={setmaterialArrayData}
              //Validation Required
              skillRequiredFields={skillRequiredFields}
              aboutRequiredFields={aboutRequiredFields}
              materialRequiredFields={materialRequiredFields}
              interestRequiredFields={interestRequiredFields}
              validateAvailability={validateAvailability}
              validateConfirmPassword={validateConfirmPassword}
              validateEmail={validateEmail}
              validatePassword={validatePassword}
              validatePhoneNumber={validatePhoneNumber}
              validateProfileDesc={validateProfileDesc}
              validateScore={validateScore}
              ValidateSkillField={ValidateSkillField}
              ValidateSkill={ValidateSkill}
              ValidateIntension={ValidateIntension}
              validateFirstName={validateFirstName}
              validateLastName={validateLastName}
              ValidateOtherSkill={ValidateOtherSkill}
              validateMaterial={validateMaterial}
              validateCity={validateCity}
              validateInterest={validateInterest}
              ValidateOtherMaterial={ValidateOtherMaterial}
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
              skillFieldItems={skillFieldItems}
              materialList={materialList}
              skillFieldList={skillFieldList}
              CategoryList={CategoryList}
              skillList={skillList}
              material={material}
              interest={interest}
              otherSKill={otherSKill}
              setotherSkill={setotherSkill}
              otherMaterial={otherMaterial}
              setotherMaterial={setotherMaterial}
              setskillArrayData={setskillArrayData}
              // ***********
              // onSubmit
              onskillAdd={onskillAdd}
              onSubmit={onSubmit}
              onMaterialAdd={onMaterialAdd}
              onInterestAdd={onInterestAdd}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
