import React, { useEffect, useState } from "react";
import "../Theme/css/profile.css";
import Header from "../Components/header";
import Footer from "../Components/footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
import { useStyles } from "../Theme/styles";
import Button from "@material-ui/core/Button";
import ChipArray from "../shared/Chip";
import axios from "axios";
import { getUser } from "../Auth/Index";
import Popover from "@material-ui/core/Popover";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";
import { Link } from "react-router-dom";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import UserProjectList from "../Components/userprojectList";
import ProfileModal from "../shared/ProfileModal";
import Toast from "../shared/toast";
import facebook from "../Theme/images/facebook.png";
import instagram from "../Theme/images/instagram.png";
import youtube from "../Theme/images/youtube.png";

export default function Profile(props) {
  const projectData = {
    title: "",
    type: "",
    general_photo: "",
    general_description: "",
    category: "",

    // implementation_steps: "",
    // progress: "",
  };
  const stepData = {
    skillField: "",
    skill: "",
    specialization: "",
    score: "",
  };

  // states start ************************************
  const [skillformData, setskillFormData] = useState(stepData);

  const [formData, setFormData] = useState(projectData);
  const [data, setData] = useState({ data: "" });
  const [ProjectdataList, setProjectdataList] = useState([]);
  const [profilemodal, setprofileModal] = useState(false);
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [photo, setPhoto] = useState("");
  const [skillArrayData, setskillArrayData] = useState([]);
  const [materialArrayData, setmaterialArrayData] = useState([]);
  const [materialList, setMaterialList] = useState("");
  const [skillList, setskillList] = useState("");
  const [material, setMaterial] = useState("");
  const [recommendstatus, setrecommendstatus] = useState(false);

  // toast
  const [show, setShow] = useState(false);
  const [successmessage, setsuccessMessage] = useState("");
  const [errormessage, seterrorMessage] = useState("");
  // toast end

  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  // const [likeCount, setLikeCount] = useState(false);
  const [skillFieldList, setskillFieldList] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [CategoryList, setCategoryList] = useState("");

  const [commentArray, setCommentArray] = useState([]);
  // console.log(commentArray, "commentArray");
  const onAdd = async () => {
    const date = new Date();
    const obj = {};
    obj.comment = comment;
    obj.date = date;
    setCommentArray([...commentArray, obj]);

    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      await Axios.post(
        `http://localhost:3000/api/v1/profile/view-profile/comment?id=${
          getUser()._id
        }`,
        { comment: comment },
        headers
      )
        .then((res) => {
          setComment("");

          setisLoading(false);
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
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  // skill
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
    // switch (e.target.name) {
    //   case "skillField":
    //     ValidateSkillField();
    //     break;
    //   case "skill":
    //     ValidateSkill();
    //     break;
    //   case "specialization":
    //     ValidateSpecialization();
    //     break;
    //   case "score":
    //     validateScore();
    //     break;

    //   default:
    //     break;
    // }
  };
  const onskillAdd = () => {
    // checkValidateForm2();
    // debugger;
    // setskillArrayData((prevState) => [...prevState, skillformData]);
    setskillArrayData([...skillArrayData, skillformData]);

    setskillFormData(stepData);
    // setskillRequiredFields(skillRequiredFields);
    // console.log("skil", skillArrayData);
  };

  // *** skill end
  const onSubmit = async (e) => {
    e.preventDefault();
    setShow(true);
    const newFormData = new FormData();
    // console.log(file, "profile data");

    newFormData.append("username", formData.username);
    newFormData.append("availability", formData.availability);
    newFormData.append("city", formData.city);
    // newFormData.append("confirm_password", formData.confirm_password);
    // newFormData.append("email", formData.email);
    newFormData.append("latitude", formData.latitude);
    newFormData.append("longitude", formData.longitude);
    // newFormData.append("password", formData.password);
    newFormData.append("phone", formData.phone);
    newFormData.append("profile_description", formData.profile_description);
    newFormData.append("profile_picture", photo);
    newFormData.append("zipCode", formData.zipCode);
    // console.log("asfjlas", JSON.stringify(skillArrayData));
    if (skillArrayData.length > 0 && materialArrayData.lenth > 0) {
      newFormData.append("skills", JSON.stringify(skillArrayData));
      newFormData.append("material", JSON.stringify(materialArrayData));
    } else {
      alert("hello");
      newFormData.append("skills", JSON.stringify(formData.skills));
      newFormData.append("material", JSON.stringify(formData.material));
    }
    setisLoading(true);
    // console.log(newFormData.getAll("general_photo"), "formdata");

    // console.log(items,"items")

    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `http://localhost:3000/api/v1/profile/editProfile?id=${props.match.params.id}`,
          newFormData,
          headers
        )
        .then((res) => {
          setisLoading(false);
          setFormData(projectData);
          setprofileModal(false);
          setsuccessMessage("User updated successfully");
          seterrorMessage("");
          // console.log(res,"res")
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          seterrorMessage("User updated false");
          setsuccessMessage("");
          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  // onSubmit end
  const RecommendUser = async (skillField) => {
    // if (recommendstatus === true) {
    setrecommendstatus(!recommendstatus);
    // }
    setShow(true);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      await Axios.post(
        `http://localhost:3000/api/v1/profile/view-profile/recommendSkill?id=${props.match.params.id}`,
        { skillField: skillField },
        headers
      )
        .then((res) => {
          // setrecommendstatus(true);
          setsuccessMessage("User recommended successfully");
          seterrorMessage("");
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);

          setsuccessMessage("");

          seterrorMessage("User recommended failed");
          console.log(" error recommend=>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  const DeleteComment = (comment) => {
    const array = commentArray.filter((com) => com.comment !== comment.trim());
    console.log(array, "array");
    setCommentArray(array);
  };
  console.log(commentArray, "commentArray");
  // get set  address

  const getAddress = (e) => {
    setAddress(e.target.value);
    fetch(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=housenumber&autocomplete=1&limit=10"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // const msg = "";
        // setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
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
        const msg = "Required";
        // setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
        console.error(error);
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

  // *****
  // profile toggle

  const Profiletoggle = () => {
    if (profilemodal === false) {
      // debugger;
      const tempskillArray = [];
      const materialArray = [];

      const skillData = data.data.skills[0].skillField._id;
      const skillsObj = data.data.skills[0];
      const tempSkills = { ...skillsObj };
      tempSkills.skillField = skillData;
      delete tempSkills.recommendedBy;
      delete tempSkills._id;
      delete data.data.email;
      var tempMaterial = data.data.material;

      tempMaterial.map((mat) => {
        materialArray.push(mat._id);
      });
      tempMaterial = materialArray;
      console.log(tempskillArray, "tempSkills");
      console.log(data.data.skills, "data.data.skills");

      tempskillArray.push(tempSkills);
      const projectData = {
        username: data.data.username,
        // email: data.data.email,
        city: data.data.city,
        zipCode: data.data.zipCode,
        latitude: data.data.latitude,
        longitude: data.data.longitude,
        phone: data.data.phone,

        availability: data.data.availability,
        profile_description: data.data.profile_description,
        skills: tempskillArray,
        material: tempMaterial,
      };
      setPhoto(data.data.profile_picture);
      setAddress(data.data.city);
      setFormData({ ...projectData });
    }
    setprofileModal(!profilemodal);
  };
  console.log(formData, "formDat from database");
  //profile toggle end
  const handleChange = (e) => {
    let value = e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const projectLike = (id) => {
    // alert(id);
    setShow(true);
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    if (like === false) {
      try {
        Axios.post(
          `http://localhost:3000/api/v1/project/view-project/likedBy?id=${id}`,
          {},
          headers
        )
          .then((res) => {
            setLike(!like);
            setsuccessMessage("Success");
            seterrorMessage("");
            // console.log(res, "res like");
          })
          .catch((err) => {
            seterrorMessage("Error!");
            setsuccessMessage("");
            console.log(" error projects =>", err);
          });
      } catch (error) {
        console.log(error, "error catch");
      }
    } else {
      setLike(!like);
    }
  };
  const onMaterialChange = (e) => {
    // debugger;

    setMaterial(e.target.value);
    console.log(materialArrayData, "material aray dat from onchange");
    if (Object.keys(materialArrayData).length > 0) {
      materialArrayData.map((mat) => {
        if (mat !== e.target.value) {
          // alert(e.target.value);
          const array = materialArrayData.filter(
            (mat) => mat !== e.target.value
          );
          if (e.target.value) {
            array.push(e.target.value);
          }
          setmaterialArrayData(array);
          const msg = "";
          // setmaterialRequiredFields({ ...materialRequiredFields, error: msg });
          // setmaterialArrayData((prevState) => [...prevState, e.target.value]);
        } else {
          const msg = "value already existed";
          // setmaterialRequiredFields({ ...materialRequiredFields, error: msg });
          // alert("msg");
          const array = materialArrayData.filter(
            (mat) => mat !== e.target.value
          );
          console.log(array, "array mat");
          setmaterialArrayData(array);
        }
      });
    } else {
      // setmaterialArrayData([...materialArrayData, e.target.value]);
      setmaterialArrayData((prevState) => [...prevState, e.target.value]);
    }
  };
  // Toast
  const ToastClose = () => {
    setShow(!show);
  };

  // ****
  // useEffect
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .get("http://localhost:3000/api/v1/auth/materialList")
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
        .get("http://localhost:3000/api/v1/auth/skillList")
        .then((res) => {
          setskillFieldList(res.data.skills);
          console.log(res, "res skill");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }
    try {
      axios
        .get("http://localhost:3000/api/v1/auth/categoryList")
        .then((res) => {
          setCategoryList(res.data.category);
          // console.log(res, "response category");
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
    try {
      Axios.get("http://localhost:3000/api/v1/profile/myProjects", headers)
        .then((res) => {
          setProjectdataList(res.data.ownedProjects);
          console.log(res.data, "res owened projects");
        })
        .catch((err) => {
          console.log(" error projects =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
    try {
      Axios.get(
        `http://localhost:3000/api/v1/profile/view-profile?id=${props.match.params.id}`,
        headers
      )
        .then((res) => {
          // const obj = { ...res.data };

          setData({ ["data"]: res.data.user });
          // console.log(res.data, "res data user");
        })
        .catch((err) => {
          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  }, []);
  console.log(data, "user data list");
  if (Object.keys(data)) {
    return (
      <div>
        <Toast
          show={show}
          ToastClose={ToastClose}
          successmessage={successmessage}
          errormessage={errormessage}
        />
        <ProfileModal
          modal={profilemodal}
          // sendInvite={sendInvite}
          toggle={Profiletoggle}
          isLoading={isLoading}
          DefaultImage={DefaultImage}
          skillFieldList={skillFieldList}
          skillformData={skillformData}
          handleSkillChange={handleSkillChange}
          getAddress={getAddress}
          SetAddress={SetAddress}
          address={address}
          onSubmit={onSubmit}
          items={items}
          onskillAdd={onskillAdd}
          material={material}
          onMaterialChange={onMaterialChange}
          setPhoto={setPhoto}
          skillList={skillList}
          formData={formData}
          materialList={materialList}
          handleChange={handleChange}
          materialArrayData={materialArrayData}
          data={data}
          // searchBy={searchBy}
          // skillFieldData={skillFieldData.length > 0 ? skillFieldData : []}
        />
        <Header />
        <div id="services" className="cardSection">
          <div className="container ">
            <div className="row">
              <div style={{ width: "50%" }}>
                <h4 style={{ fontWeight: "600" }}>
                  Ne soyez plus seul pour realiser vos projects, soyez entoures
                  des meilleurs !
                </h4>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              <div style={{ width: "50%" }}>
                <p
                  className="mt-1 ml-3"
                  style={{ fontSize: "18px", color: "#707070" }}
                >
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs.
                </p>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              {/* end of col */}
            </div>{" "}
            {/* end of row */}
            {/* end of row */}
          </div>{" "}
          {/* end of container */}
        </div>{" "}
        {/* end of cardSection */}
        {/* end of services */}
        <div id="services" className="cardSection">
          <div className="container ">
            <div className="row pt-4" style={{ background: "#fcfcfc" }}>
              <div className="col-lg-1 text-center">
                <span>
                  <img
                    alt="facebook"
                    src={facebook}
                    style={{ width: "25px", height: "25px" }}
                  />
                </span>
                <div className="mt-4">
                  <img
                    alt="instagram"
                    src={instagram}
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div className="mt-4">
                  <img
                    alt="youtube"
                    src={youtube}
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              <div className="col-lg-2  text-left">
                <div className="card">
                  <img
                    className="card-image"
                    src={
                      data.data.profile_picture
                        ? `http://localhost:3000/views/uploads/${data.data.profile_picture}`
                        : DefaultImage
                    }
                    alt="alternative"
                  />
                </div>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              <div className="col-lg-9  text-left">
                <div>
                  <h5>{data.data.username}</h5>
                  <hr style={{ border: "2px solid #c4bec2" }} />
                </div>
                <p className="mt-2">{data.data.profile_description}</p>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>
              {/* end of col */}
            </div>
            <div className="row " style={{ marginTop: "2rem" }}>
              <div className="col-lg-6">
                <p style={{ marginLeft: "6rem" }}>
                  <i className="fas fa-map-marker-alt fa-lg" />
                  <span className="ml-3">
                    {data.data.city ? data.data.city : "City"}
                  </span>
                </p>
              </div>
              <div className="col-lg-6">
                <p>
                  <i className="fas fa-search fa-lg" />
                  <span className="ml-3">
                    Interet pour :{" "}
                    {data.data.interests
                      ? data.data.interests.map((item, i) => {
                          return <span key={i}>{item + ","}</span>;
                        })
                      : " "}
                  </span>
                </p>
              </div>
            </div>
            <div className="row" style={{ marginTop: "2rem" }}>
              <div
                className="col-lg-12 text-left  p-1"
                style={{
                  background: "#fcfcfc",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <div className="row ml-3">
                  <div className="col-8">
                    <h3 className="mt-1 ml-3">PROFIL</h3>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={Profiletoggle}
                      type="button"
                      style={{
                        // fontWeight: "lighter",
                        maxWidth: "40%",
                      }}
                      className="btn btn-block ml-3"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row text-left"
              style={{ marginLeft: "5rem", marginTop: "2rem" }}
            >
              <div className="col-lg-6">
                <p>
                  <i
                    className="fas fa-phone-volume fa-lg "
                    style={{ color: "#0d2456" }}
                  />
                  <span className="ml-2">{data.data.phone}</span>
                </p>
                <p style={{ marginTop: "1.5rem" }}>
                  <i
                    className="fas fa-camera fa-lg "
                    style={{ color: "#0d2456" }}
                  />
                  <span className="ml-2">
                    {data.data.email ? data.data.email : "email@email.com"}
                  </span>
                </p>
                <p style={{ marginTop: "1.5rem" }}>
                  <i className="fas fa-shopping-basket fa-lg " />
                  {Object.entries(data.data).length > 0
                    ? data.data.material.map((mat) => (
                        <span className="ml-2">{mat.name},</span>
                      ))
                    : ""}
                </p>
              </div>
              <div className="col-lg-6" style={{ marginTop: "-0.8rem" }}>
                {data.data.skills
                  ? data.data.skills.map((skill) => (
                      <div
                        className=" ml-2  "
                        id="iconRow"
                        style={{ marginTop: "-0.3rem" }}
                      >
                        <p>
                          <small>{skill.skillField.skillField} - </small>
                          {skill.skill}
                          <i
                            class="fas fa-info-circle fa-xs"
                            style={{
                              marginLeft: 2,
                              position: "absolute",
                              color: "#c1c1c1",
                            }}
                          />

                          <br />
                          <span>
                            <i
                              className="fas fa-star fa-sm "
                              style={{ color: "#ffe500" }}
                            />
                            <i
                              className="fas fa-star fa-sm "
                              style={{ color: "#ffe500" }}
                            />
                            <i
                              className="fas fa-star fa-sm "
                              style={{ color: "#ffe500" }}
                            />
                            <i className="fas fa-star fa-sm " />
                            <i className="fas fa-star fa-sm " />
                          </span>
                        </p>
                        <p
                          style={{ marginRight: "8rem", cursor: "pointer" }}
                          onClick={() => RecommendUser(skill.skillField._id)}
                        >
                          {recommendstatus == true ? (
                            <i
                              className="fas fa-heart "
                              style={{ color: "red" }}
                            />
                          ) : (
                            <i className="fas fa-heart " />
                          )}
                          {/* <span class="ml-2 " id="span2" >21%</span> */}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <div className="row " style={{ marginTop: "2rem" }}>
              <div
                className="col-lg-12 text-left  p-1"
                style={{
                  background: "#fcfcfc",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <h4 className="mt-1 ml-3">PROJECTS</h4>
              </div>
            </div>
            {Object.entries(ProjectdataList).length > 0
              ? ProjectdataList.slice(0, 4).map((data, i) => (
                  <UserProjectList
                    data={data}
                    i={i}
                    DefaultImage={DefaultImage}
                    like={like}
                    projectLike={projectLike}
                  />
                ))
              : ""}

            {/* end of row */}
            {/* end of row */}
            <div className="row" style={{ marginTop: "2rem" }}>
              <div
                className="col-lg-12 text-left ml-2 p-1"
                style={{
                  background: "#fcfcfc",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <h4 className="mt-1 ml-3">COMMENTAIRIES</h4>
              </div>
            </div>
            {data.data.comments && data.data.comments.length > 0
              ? data.data.comments.map((comment) => (
                  <div className="row text-left" style={{ marginTop: "2rem" }}>
                    <div className="text-right" style={{ width: "15%" }}>
                      <img
                        className="com-image"
                        src={
                          data.data.profile_picture
                            ? `http://localhost:3000/views/uploads/${data.data.profile_picture}`
                            : DefaultImage
                        }
                        alt="alternative"
                      />
                    </div>
                    <div className="text-left" style={{ width: "75%" }}>
                      <div style={{ marginLeft: "2rem" }}>
                        <h5>
                          {getUser() ? getUser().username : ""}
                          <small className="ml-2">
                            {
                              new Date(comment.createdAt)
                                .toString()
                                .split(" ")[2]
                            }{" "}
                            {
                              new Date(comment.createdAt)
                                .toString()
                                .split(" ")[1]
                            }{" "}
                            {new Date(comment.createdAt).getFullYear()}
                          </small>
                        </h5>
                        <p className="mt-2" style={{ fontWeight: "bold" }}>
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                ))
              : ""}
            {commentArray.length > 0
              ? commentArray.map((comment) => (
                  <div className="row text-left" style={{ marginTop: "2rem" }}>
                    <div className="text-right" style={{ width: "15%" }}>
                      <img
                        className="com-image"
                        src={DefaultImage}
                        alt="alternative"
                      />
                    </div>
                    <div className="text-left" style={{ width: "75%" }}>
                      <div style={{ marginLeft: "2rem" }}>
                        <h5>
                          {getUser() ? getUser().username : ""}
                          <small className="ml-2">
                            {new Date(comment.date).toString().split(" ")[2]}{" "}
                            {new Date(comment.date).toString().split(" ")[1]}{" "}
                            {new Date(comment.date).getFullYear()}
                          </small>
                        </h5>
                        <p className="mt-2" style={{ fontWeight: "bold" }}>
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                    <div>
                      <ClearOutlinedIcon
                        onClick={() => DeleteComment(comment.comment)}
                      />
                    </div>
                  </div>
                ))
              : ""}

            <div className="container ">
              <div
                className="row"
                style={{ marginTop: "2rem", marginLeft: "5rem" }}
              >
                <div style={{ width: "90%" }} className="text-right">
                  <textarea
                    name
                    id
                    cols={110}
                    value={comment}
                    name="comment"
                    onChange={handleCommentChange}
                    rows={3}
                    style={{ width: "90%" }}
                    placeholder="  Add a coment"
                  />
                </div>

                <div style={{ width: "10%" }} className="text-center">
                  {isLoading === true ? (
                    <center>
                      <div className={useStyles.root}>
                        <CircularProgress disableShrink />
                      </div>
                    </center>
                  ) : comment !== "" ? (
                    <button
                      type="button"
                      className="btn btn-block mt-4 ml-2"
                      style={{ maxWidth: "80%", padding: "6px 16px" }}
                      onClick={onAdd}
                    >
                      Send
                    </button>
                  ) : (
                    <Button
                      variant="contained"
                      disabled
                      name="add"
                      style={{ maxWidth: "80%", textTransform: "capitalize" }}
                      className="submitAdd btn btn-block mt-4"
                    >
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
        {/* Details 1 */}
        {/* end of basic-1 */}
        {/* end of details 1 */}
        {/* Details 2 */}
        {/* end of basic-2 */}
        {/* end of details 2 */}
        {/* Details Lightboxes */}
        {/* Details Lightbox 1 */}
        {/* Footer */}
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <h1>loading....</h1>
      </div>
    );
  }
}
