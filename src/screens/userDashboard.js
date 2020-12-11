import React, { useState, useEffect } from "react";
import { Nav, Row, Col, Tab, Container } from "react-bootstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../Theme/css/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Theme/styles";
import Autocomplete from "react-autocomplete";
import ChipArray from "../shared/Chip";
import SkillChipArray from "../shared/skillChip";
import { useToasts } from "react-toast-notifications";

import Header from "../Components/header";
import axios from "axios";
import UserTable from "../shared/UserTable";
import UserForm from "../Components/UserForm";
export default function UserDashboard(props) {
  const { addToast } = useToasts();

  const projectData = {
    title: "",
    type: "",
    general_photo: "",
    general_description: "",
    category: "",
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
  const [tempmaterialArrayData, settempmaterialArrayData] = useState([]);

  const [materialList, setMaterialList] = useState("");
  const [skillList, setskillList] = useState("");
  const [material, setMaterial] = useState("");
  const [errormessage, seterrorMessage] = useState("");

  const [skillFieldList, setskillFieldList] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [CategoryList, setCategoryList] = useState("");
  const [successmessage, setsuccessMessage] = useState("");
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("first");
  // functions

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

  const onskillAdd = () => {
    // checkValidateForm2();
    // debugger;
    // setskillArrayData((prevState) => [...prevState, skillformData]);

    if (skillArrayData.length === 3) {
      // alert(skillArrayData.length);
      addToast("skills length must be 3 or less", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
      seterrorMessage("You can only add upto 3 skills  or less");
    } else {
      setskillArrayData([...skillArrayData, skillformData]);
      setskillFormData(stepData);
    }

    // setskillRequiredFields(skillRequiredFields);
    // console.log("skil", skillArrayData);
  };

  // *** skill end
  const onSubmit = async (e) => {
    e.preventDefault();
    setShow(true);

    const newFormData = new FormData();
    if (!photo || photo === "default.png") {
      // alert("hello");
      seterrorMessage("Photo is required");
    } else {
      console.log(photo, "profile data");

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
      if (skillArrayData.length > 0 && materialArrayData.length > 0) {
        // alert("hello");
        newFormData.append("skills", JSON.stringify(skillArrayData));
        newFormData.append("material", JSON.stringify(materialArrayData));
      } else {
        // alert("hello");
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
            addToast("Success", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            // console.log(res,"res")
          })
          .catch((err) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);
            seterrorMessage("User updated false");
            setsuccessMessage("");
            addToast("Error", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            // console.log(" error =>", err);
          });
      } catch (error) {
        console.log(error, "error catch");
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      }
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };
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
      setmaterialArrayData([...materialArrayData, e.target.value]);
      // setmaterialArrayData(e.target.value);
    }
  };
  // *******************

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
      axios
        .get("http://localhost:3000/api/v1/profile/myProjects", headers)
        .then((res) => {
          setProjectdataList(res.data.ownedProjects);
          // console.log(res.data, "res owened projects");
        })
        .catch((err) => {
          console.log(" error projects =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
    try {
      axios
        .get(
          `http://localhost:3000/api/v1/profile/view-profile?id=${props.match.params.id}`,
          headers
        )
        .then((res) => {
          // const obj = { ...res.data };

          setData({ ["data"]: res.data.user });
          TempData(res.data.user);
          console.log(res.data, "res data user");
        })
        .catch((err) => {
          // console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, []);
  const TempData = (data) => {
    const tempskillArray = [];
    // skills
    // let skillData = "";
    // let tempSkills=""
    data.skills.map((skill, i) => {
      let skillData = skill.skillField._id;
      let skillsObj = skill;
      let tempSkills = { ...skillsObj };
      tempSkills.skillField = skillData;
      delete tempSkills.recommendedBy;
      delete tempSkills._id;
      tempskillArray.push(tempSkills);
    });
    delete data.email;
    // material

    const materialArray = [];
    var tempMaterial = data.material;
    tempMaterial.map((mat) => {
      materialArray.push(mat._id);
    });
    tempMaterial = materialArray;

    // *****

    console.log(tempskillArray, "tempSkills");
    // console.log(data.skills, "data.skills");

    const projectData = {
      username: data.username,
      // email: data.email,
      city: data.city,
      zipCode: data.zipCode,
      latitude: data.latitude,
      longitude: data.longitude,
      phone: data.phone,

      availability: data.availability,
      profile_description: data.profile_description,
      skills: tempskillArray,
      material: tempMaterial,
    };
    setmaterialArrayData(tempMaterial);
    setskillArrayData(tempskillArray);

    // setPhoto(data.profile_picture);
    setAddress(data.city);
    setFormData({ ...projectData });
  };
  return (
    <div>
      <Header />
      <div id="services" className="cards-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>User Dashboard</h2>
              {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
            </div>{" "}
            <Container className="mt-4 text-left">
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey="first"
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          General information
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second"> Projects </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third"> Invite Requests </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <UserForm
                          setmaterialArrayData={setmaterialArrayData}
                          setskillArrayData={setskillArrayData}
                          onSubmit={onsubmit}
                          formData={formData}
                          skillformData={skillformData}
                          handleSkillChange={handleSkillChange}
                          skillArrayData={skillArrayData}
                          materialArrayData={materialArrayData}
                          handleChange={handleChange}
                          SetAddress={setAddress}
                          getAddress={getAddress}
                          items={items}
                          skillList={skillList}
                          skillFieldList={skillFieldList}
                          materialList={materialList}
                          Form={Form}
                          Row={Row}
                          Col={Col}
                          FormGroup={FormGroup}
                          Input={Input}
                          Label={Label}
                          Autocomplete={Autocomplete}
                          setPhoto={setPhoto}
                          CategoryList={CategoryList}
                          material={material}
                          onMaterialChange={onMaterialChange}
                          onskillAdd={onskillAdd}
                          ChipArray={ChipArray}
                          SkillChipArray={SkillChipArray}
                          errormessage={errormessage}
                          isLoading={isLoading}
                          useStyles={useStyles}
                          CircularProgress={CircularProgress}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        {Object.keys(data) ? (
                          <div>
                            <UserTable data={data} />
                          </div>
                        ) : (
                          ""
                        )}
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div>
                          When to the sessions of sweet silent thought I summon
                          up remembrance of things past, I sigh the lack of many
                          a thing I sought, And with old woes new wail my dear
                          time's waste: Then can I drown an eye, unused to flow,
                          For precious friends hid in death's dateless night,
                          And weep afresh love's long since cancell'd woe, And
                          moan the expense of many a vanish'd sight: Then can I
                          grieve at grievances foregone, And heavily from woe to
                          woe tell o'er
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
