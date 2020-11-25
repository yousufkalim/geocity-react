import React, { useEffect, useState } from "react";
import "../Theme/css/main.css";
import Autocomplete from "react-autocomplete";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Theme/styles";
import axios from "axios";

function Signup() {
  const signupData = {
    username: "",
    email: "",
    city: "",
    password: "",
    availability: "",
    confirm_password: "",
    profile_picture: "",
    profile_description: "",
    phone: "",
    address: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    // name:""
    // skills:[],
    // material:[],
  };
  const stepData = {
    skillField: "",
    skill: "",
    specialization: "",
    score: "",
  };

  // states start ************************************

  const [formData, setFormData] = useState(signupData);
  const [address, setAddress] = useState("");
  const [material, setMaterial] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [skillArrayData, setskillArrayData] = useState([]);
  const [materialArrayData, setmaterialArrayData] = useState([]);
  const [materialList, setMaterialList] = useState("");
  const [userList, setuserList] = useState("");
  const [error, setError] = useState("");

  const [skillList, setskillList] = useState("");
  const [skillFieldList, setskillFieldList] = useState("");

  const [skillformData, setskillFormData] = useState(stepData);
  const [materialformData, setmaterialFormData] = useState([]);
  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    username: "",
    email: "",
    city: "",
    password: "",
    availability: "",
    confirm_password: "",
    profile_picture: "",
    profile_description: "",
    phone: "",
    address: "",
  });
  const [skillRequiredFields, setskillRequiredFields] = useState({
    skillField: [],
    skill: "",
    specialization: "",
    score: "",
  });
  const [materialRequiredFields, setmaterialRequiredFields] = useState({
    name: "",
  });
  console.log(formData, "formData");
  // console.log(materialformData,"materialformData")

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
    // alert(skillformData.skillField);

    if (skillformData.skillField) {
      const msg = "";

      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });

      return true;
    } else if (!skillformData.skillField) {
      // alert("hello");
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
      setAboutRequiredFields({
        ...aboutRequiredFields,
        profile_description: "",
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

  const validateScore = () => {
    if (skillformData.score === 5) {
      setskillRequiredFields({ ...skillRequiredFields, score: "" });
      // setFNErr("Please Enter Name");
      return false;
    } else if (skillformData.score >= 5) {
      const msg = "Score needs to be equal 5 or less";
      setskillRequiredFields({ ...skillRequiredFields, score: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (!skillformData.score.length) {
      // alert("hello")
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, score: msg });
      // setFNErr("Please Enter Name");
      return false;
    }
    const num = parseInt(skillformData.score);
    setskillRequiredFields({ ...skillRequiredFields, score: "" });
    setskillFormData({ ...skillformData, score: num });
    return true;
  };

  const validatePhoto = () => {
    if (formData.profile_picture) {
      // alert("hello h1");
      setAboutRequiredFields({ ...aboutRequiredFields, profile_picture: "" });

      return true;
    } else if (!formData.profile_picture) {
      // alert("hello");
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, profile_picture: msg });
      return false;
    }
  };
  const validateCity = () => {
    if (formData.city) {
      // alert("hello");

      setAboutRequiredFields({ ...aboutRequiredFields, city: "" });
      return false;
    } else if (!formData.city) {
      let msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    }
  };
  const validateMaterial = () => {
    if (materialformData.name) {
      setmaterialRequiredFields({ ...materialRequiredFields, name: "" });

      return true;
    } else if (!materialformData.name) {
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
      // setFNErr("Please Enter Name");
      return false;
    } else if (formData.password.trim().length > 20) {
      const msg = "Passowrd needs to be  100 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (!formData.password.length) {
      // alert("hello")
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
      // setFNErr("Please Enter Name");
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
      // setFNErr("Please Enter Name");
      return false;
    } else if (!formData.confirm_password.length) {
      // alert("hello")
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: msg });
      // setFNErr("Please Enter Name");
      return false;
    }
  };

  const ValidateUsername = () => {
    if (formData.username.length === 4 && formData.username.length < 20) {
      // alert("hello h1");
      setAboutRequiredFields({ ...aboutRequiredFields, username: "" });
      setFormData({ ...formData, username: formData.username });
    } else if (formData.username.trim().length < 5) {
      // alert("hello");
      const msg = "Username needs to be at least 5 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (formData.username.trim().length > 20) {
      const msg = "Username must be less than or equal to 20 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (!formData.username.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, username: msg });
      // setFNErr("Please Enter Name");
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
      },
    };
    try {
      axios
        .get("http://localhost:3000/api/v1/admin/userslist", headers)
        .then((res) => {
          setuserList(res.data.users);
          console.log(res, "res users");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }
    try {
      axios
        .get("http://localhost:3000/api/v1/admin/materialList", headers)
        .then((res) => {
          setMaterialList(res.data.materials);
          // console.log(res, "res material");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }

    try {
      axios
        .get("http://localhost:3000/api/v1/admin/skillList", headers)
        .then((res) => {
          setskillFieldList(res.data.skills);
          console.log(res, "res skill");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;

    switch (e.target.name) {
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
      // case "profile_picture":
      //   validatePhoto();
      //   break;
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
    } else {
      setFormData({ ...formData, [e.target.name]: value });
    }
  };
  // handle cahnge end
  // const handleMaterialChange = (e) => {
  //   let value = e.target.value;
  //   setmaterialFormData({ ...materialformData, [e.target.name]: value });
  // };
  // console.log(skillList, "skillList");
  const handleSkillChange = async (e) => {
    // alert("yooo")
    let value = e.target.value;

    if (e.target.name === "skillField") {
      // alert("hello");
      setskillFormData({ ...skillformData, [e.target.name]: value });

      skillFieldList.map((skill) =>
        skill._id === e.target.value ? setskillList(skill.skill) : ""
      );

      // alert(e.target.value);
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
    setskillArrayData((prevState) => [...prevState, skillformData]);

    setskillFormData(stepData);
    setskillRequiredFields(skillRequiredFields);
  };

  const onMaterialAdd = () => {
    if (material) {
      const msg = "";
      setmaterialRequiredFields({ ...aboutRequiredFields, name: msg });

      setmaterialArrayData((prevState) => [...prevState, material]);
      setMaterial("");
    } else {
      const msg = "Required";
      setmaterialRequiredFields({ ...aboutRequiredFields, name: msg });
    }
  };

  // set get

  // const getSkill = (e) => {
  //   // setAddress(e.target.value);
  //   const headers = {
  //     headers: {
  //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
  //     },
  //   };
  //   try {
  //     axios
  //       .get("http://localhost:3000/api/v1/admin/skillList", headers)
  //       .then((res) => {
  //         setskillList(res.data.skills.skill);
  //         // console.log(res, "res material");
  //       })
  //       .catch((err) => console.log(" error =>", err));
  //   } catch (error) {
  //     console.log(error, "error catch");
  //   }
  // };

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
          // setFormData({ ...formData,items:addressToSet })
          setItems(addressToSet);
        }
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  const SetAddress = (item) => {
    // console.log(item,'item')
    setAddress(item);
    // this.setState({ address: item });
    for (let i = 0; i < items.length; i++) {
      if (items[i].label === item) {
        // debugger;
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
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
          availability: formData.availability,
        });
        // this.setState({
        //   address: newAddress[0],
        //   zip: zipCode,
        //   city: city,
        //   lat: lat,
        //   lng: lng,
        //   zipError: "",
        // });
        // this.validationCheckforAddress(formData);
        // this.handleValidationCheckForButtonEnable();
      }
    }
    // validateCity();
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

    setAboutRequiredFields(obj);

    if (!reqFields && !formData.city) {
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

    setskillRequiredFields(obj);

    if (!reqFields) {
      // validatePortfolioThumbnail()
      // validatePortfolioFiles()
      const msg = "Required";
      // const flashData = { type: "error", text: "Fill the required fields." }
      // props.addFlashMessage(flashData)
      return false;
    } else {
      setskillRequiredFields({});

      return true;
    }
  };

  // const checkValidateForm3 = () => {
  //   let obj = {};
  //   let reqFields = true;
  //   Object.keys(materialformData).map((key) => {
  //     if (materialformData[key] === "") {
  //       obj[key] = "Required";
  //       reqFields = false;
  //     }
  //     return obj;
  //   });

  //   setmaterialRequiredFields(obj);

  //   if (!reqFields) {
  //     // validatePortfolioThumbnail()
  //     // validatePortfolioFiles()
  //     const msg = "Required";
  //     // const flashData = { type: "error", text: "Fill the required fields." }
  //     // props.addFlashMessage(flashData)
  //     return false;
  //   } else {
  //     setmaterialRequiredFields({});

  //     return true;
  //   }
  // };

  // ******************
  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    console.log(materialArrayData, "materialArrayData");
    checkValidateForm();
    checkValidateForm2();
    validateMaterial();
    const Signup = formData;
    Signup.skills = skillArrayData;
    Signup.material = materialArrayData;
    if (userList.length > 0) {
      userList.map((user) => {
        if (user.email === Signup.email) {
          setError("Email Already Existed");
        }
      });
    }

    console.log(Signup, "signup on sumbit");
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post("http://localhost:3000/api/v1/auth/register", Signup, headers)
        .then((res) => {
          setisLoading(false);
          setFormData(signupData);

          // console.log(res,"res")
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);

          // console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  // }
  // console.log(skillList, "skillList");
  return (
    <div className="main">
      <div className="containerProject">
        <form method="POST" className="appointmentform" id="appointment-form">
          <h2>Sign Up form</h2>
          <div className="form-group-1">
            <label className="label-agree-term">User_name*</label>

            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              placeholder="Username"
              required
              onChange={handleChange}
              onFocus={ValidateUsername}
            />
            {aboutRequiredFields.username !== "" ? (
              <p className="error"> {aboutRequiredFields.username}</p>
            ) : (
              ""
            )}

            <label className="label-agree-term">Email*</label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={validateEmail}
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
              required
              value={formData.password}
              onChange={handleChange}
              onFocus={validatePassword}
            />
            {aboutRequiredFields.password !== "" ? (
              <p className="error"> {aboutRequiredFields.password}</p>
            ) : (
              ""
            )}
            <label className="label-agree-term">Confirm_Password*</label>

            <input
              type="confirm_password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm_Password"
              required
              value={formData.confirm_password}
              onChange={handleChange}
              onFocus={validateConfirmPassword}
            />
            {aboutRequiredFields.confirm_password !== "" ? (
              <p className="error"> {aboutRequiredFields.confirm_password}</p>
            ) : (
              ""
            )}
            <label className="label-agree-term">City</label>

            <Autocomplete
              items={items}
              // shouldItemRender={(item, value) =>
              //   item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
              // }
              getItemValue={(item) => item.label}
              renderItem={(item, highlighted) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: highlighted ? "#eee" : "transparent",
                  }}
                >
                  {item.label}
                </div>
              )}
              wrapperStyle={{
                display: "block",
              }}
              menuStyle={{
                zIndex: "1",
                position: "static",
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 12px",
                fontSize: "90%",
                color: "#000",
                overflow: "auto",
                maxHeight: "50%",
              }}
              inputProps={{ className: "form-control" }}
              value={address}
              name="address"
              onChange={getAddress}
              onSelect={SetAddress}
            />
            {aboutRequiredFields.city !== "" ? (
              <p className="error"> {aboutRequiredFields.city}</p>
            ) : (
              ""
            )}
            <label className="label-agree-term">Profile_picture*</label>

            <input
              type="file"
              name="profile_picture"
              id="profile_picture"
              required
              value={formData.profile_picture}
              onChange={handleChange}
              // onFocus={validatePhoto}
            />
            {aboutRequiredFields.profile_picture !== "" ? (
              <p className="error"> {aboutRequiredFields.profile_picture}</p>
            ) : (
              ""
            )}
            <label className="label-agree-term">Profile_description*</label>

            <input
              type="text"
              name="profile_description"
              id="profile_description"
              placeholder="Profile_description"
              required
              value={formData.profile_description}
              onChange={handleChange}
              onFocus={validateProfileDesc}
            />
            {aboutRequiredFields.profile_description !== "" ? (
              <p className="error">
                {" "}
                {aboutRequiredFields.profile_description}
              </p>
            ) : (
              ""
            )}
            <label className="label-agree-term">Phone Number*</label>

            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone_number"
              required
              value={formData.phone}
              onChange={handleChange}
              onFocus={validatePhoneNumber}
            />
            {aboutRequiredFields.phone !== "" ? (
              <p className="error"> {aboutRequiredFields.phone}</p>
            ) : (
              ""
            )}
            <label className="label-agree-term">Availability*</label>

            <input
              type="text"
              name="availability"
              id="availability"
              placeholder="Enter availability"
              required
              value={formData.availability}
              onChange={handleChange}
              onFocus={validateAvailability}
            />
            {aboutRequiredFields.availability !== "" ? (
              <p className="error"> {aboutRequiredFields.availability}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-group-2">
            <h3>Skills</h3>
            <label className="label-agree-term">Skill_Field*</label>

            <div className="select-list">
              <select
                name="skillField"
                id="skillField"
                value={skillformData.skillField}
                onChange={handleSkillChange}
                onFocus={ValidateSkillField}
              >
                {skillFieldList
                  ? skillFieldList.map((skill) => (
                      <option value={skill._id}>{skill.skillField}</option>
                    ))
                  : ""}
              </select>
            </div>
            {skillRequiredFields.skillField !== "" ? (
              <p className="error"> {skillRequiredFields.skillField}</p>
            ) : (
              ""
            )}
            {skillList.length > 0 ? (
              <>
                <label className="label-agree-term">Skill*</label> <br />
                <div className="select-list">
                  <select
                    name="skill"
                    id="skill"
                    value={skillformData.skill}
                    onChange={handleSkillChange}
                    onFocus={ValidateSkillField}
                  >
                    <option></option>

                    {skillList.map((skill) => (
                      <option value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
                {skillRequiredFields.skill !== "" ? (
                  <p className="error"> {skillRequiredFields.skill}</p>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            <label className="label-agree-term">Specialization*</label>

            <input
              type="text"
              onChange={handleSkillChange}
              onFocus={ValidateSpecialization}
              name="specialization"
              id="specialization"
              placeholder="Enter Specialization"
              value={skillformData.specialization}
              required
            />
            {skillRequiredFields.specialization !== "" ? (
              <p className="error"> {skillRequiredFields.specialization}</p>
            ) : (
              ""
            )}
            <label className="label-agree-term">Score</label>

            <input
              type="text"
              onChange={handleSkillChange}
              onFocus={validateScore}
              name="score"
              id="score"
              placeholder="Enter Score"
              value={skillformData.score}
              required
            />
            {skillRequiredFields.score !== "" ? (
              <p className="error"> {skillRequiredFields.score}</p>
            ) : (
              ""
            )}
            {skillformData.score ? (
              <Button
                variant="contained"
                onClick={onskillAdd}
                name="add"
                className="submitAdd"
              >
                Add
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                name="add"
                className="submitAdd"
              >
                Add
              </Button>
            )}
          </div>
          <div className="form-group-2">
            <h3>Material*</h3>
            <div className="select-list">
              <select
                name="material"
                id="material"
                value={material}
                onChange={(e) => {
                  setMaterial(e.target.value);
                }}
                onFocus={validateMaterial}
              >
                <option></option>

                {materialList
                  ? materialList.map((mat) => (
                      <option value={mat._id}>{mat.name}</option>
                    ))
                  : ""}
              </select>
            </div>
            {materialRequiredFields.name !== "" ? (
              <p className="error"> {materialRequiredFields.name}</p>
            ) : (
              ""
            )}
            {material.length > 0 ? (
              <Button
                variant="contained"
                onClick={onMaterialAdd}
                name="add"
                className="submitAdd"
              >
                Add
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                name="add"
                className="submitAdd"
              >
                Add
              </Button>
            )}
          </div>
          {error !== "" ? <p className="error"> {error}</p> : ""}

          <div>
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

export default Signup;
