import React, { useState, useEffect } from "react";
import { Nav, Row, Col, Tab, Container } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import {
  signupskillRequired,
  editProfileRequired,
  editProfileData,
  signupstepData,
} from "../shared/Data";
import Header from "../Components/header";
import axios from "axios";

import ListOfUser from "../Components/ListOfUser";
import ListOfProjects from "../Components/listOfProjects";
import ListOfSkills from "../Components/listOfSkills";
import ListOfMaterials from "../Components/ListOfMaterials";

import EditSkillModal from "../shared/EditSkillModal";
import AddSKillModal from "../shared/AddSKillModal";
import AddMaterialModal from "../shared/AddMaterialModal";

export default function UserDashboard(props) {
  const { addToast } = useToasts();

  // states start ************************************
  const [skillformData, setskillFormData] = useState(signupstepData);

  const [formData, setFormData] = useState({ skill: "", skillField: "" });
  const [userdata, setuserData] = useState([]);
  const [projectdata, setprojectData] = useState([]);
  const [skillFieldList, setskillFieldList] = useState([]);

  const [ProjectdataList, setProjectdataList] = useState([]);
  const [profilemodal, setprofileModal] = useState(false);
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [photo, setPhoto] = useState("");
  const [skillArrayData, setskillArrayData] = useState([]);
  const [materialArrayData, setmaterialArrayData] = useState([]);
  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    skill: "",
    skillField: "",
    error: "",
  });
  const [materialRequiredFields, setmaterialRequiredFields] = useState({
    name: "",
    error: "",
  });
  const [skillRequiredFields, setskillRequiredFields] = useState(
    signupskillRequired
  );
  const [materialList, setMaterialList] = useState([]);
  const [skillList, setskillList] = useState("");
  const [material, setMaterial] = useState("");
  const [otherSKill, setotherSkill] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [CategoryList, setCategoryList] = useState("");
  const [key, setKey] = useState("first");
  const [invitationData, setinvitationData] = useState("");
  const [editskillmodal, seteditskillmodal] = useState(false);
  const [addskillmodal, setaddskillmodal] = useState(false);
  const [materialmodal, setmaterialmodal] = useState(false);

  const [skillId, setskillId] = useState("");

  // functions
  const AddMaterialSubmit = () => {
    setisLoading(true);
    const check = ValidateMaterial();

    if (check == true) {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      try {
        axios
          .post(
            `http://localhost:3000/api/v1/admin/create-material`,
            { name: material },
            headers
          )
          .then((res) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);
            addToast("Material added successfully", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            const msg = "";
            setmaterialRequiredFields({
              ...materialRequiredFields,
              error: msg,
            });
            setmaterialmodal(!materialmodal);
            setMaterial("");
            // console.log(res, "res material");
          })
          .catch((err) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1500);
            if (err.response.data) {
              if (err.response.data.message) {
                addToast(`${err.response.data.message}`, {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });
                const msg = err.response.data.message;
                setmaterialRequiredFields({
                  ...materialRequiredFields,
                  error: msg,
                });
              } else {
                addToast(`${err.response.data}`, {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });
                const msg = err.response.data;
                setmaterialRequiredFields({
                  ...materialRequiredFields,
                  error: msg,
                });
              }
            }
          });
      } catch (error) {
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
        // console.log(error, "error catch");
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1500);
    }
  };
  const handleMaterial = (e) => {
    setMaterial(e.target.value);
  };
  const MaterialToggle = () => {
    setMaterial("");
    setmaterialmodal(!materialmodal);
  };
  const EditSkillSubmit = () => {
    setisLoading(true);
    ValidateSkillField();

    ValidateSkill();
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/admin/edit-skillField?id=${skillId}`,
          { skillField: formData.skillField, skill: formData.skill },
          headers
        )
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          addToast("skill updated successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          // console.log(res, "res material");
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          console.log(" error =>", err);
        });
    } catch (error) {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
      // console.log(error, "error catch");
    }
  };
  const AddSkill = () => {
    const check = ValidateSkill();
    if (check === true) {
      if (skillArrayData.length > 0) {
        const tempCheck = skillArrayData.find(
          (cont) => cont === formData.skill
        );
        if (tempCheck) {
          const msg = "Value already existed";
          setAboutRequiredFields({
            ...aboutRequiredFields,
            error: msg,
          });
        } else {
          var array = skillArrayData.filter((mat) => mat !== formData.skill);
          if (formData.skill) {
            array.push(formData.skill);
          }
          setskillArrayData(array);
          // setMaterial("");
          const msg = "";
          setAboutRequiredFields({
            ...aboutRequiredFields,
            error: msg,
          });
          setFormData({ ...formData, ["skill"]: "" });
        }
      } else {
        if (formData.skill) {
          setskillArrayData((prevState) => [...prevState, formData.skill]);
          setFormData({ ...formData, ["skill"]: "" });
        } else {
        }
      }
    }
  };
  const AddSkillSubmit = () => {
    setisLoading(true);
    ValidateSkillField();

    if (skillArrayData.length > 0) {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      try {
        axios
          .post(
            `http://localhost:3000/api/v1/admin/create-skillField?id=${skillId}`,
            { skillField: formData.skillField, skill: formData.skill },
            headers
          )
          .then((res) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);
            addToast("skill added successfully", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            // console.log(res, "res material");
          })
          .catch((err) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);
            console.log(" error =>", err);
          });
      } catch (error) {
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
        // console.log(error, "error catch");
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
      addToast("You must add atleast one skill regarding skillField", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  };
  // *****
  const Edittoggle = (skillId) => {
    if (editskillmodal === false) {
      setskillId(skillId);
    }

    seteditskillmodal(!editskillmodal);
  };
  const Addtoggle = () => {
    if (addskillmodal === false) {
    }

    setaddskillmodal(!addskillmodal);
  };
  const handleChange = (e) => {
    let value = e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };
  // *******************

  // Validations
  const ValidateMaterial = () => {
    if (!material) {
      const msg = "Required";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        name: msg,
      });
      return false;
    } else {
      const msg = "";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        name: msg,
        error: msg,
      });

      return true;
    }
  };
  const ValidateSkillField = () => {
    if (!formData.skillField) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skillField: msg,
      });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skillField: msg,
      });

      return true;
    }
  };
  const ValidateSkill = () => {
    if (!formData.skill) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skill: msg,
      });
      return false;
    } else if (formData.skill.length < 3) {
      const msg = "Please enter minimum 3 character length skill";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skill: msg,
      });
      return false;
    } else if (formData.skill.length > 15) {
      const msg = "Please enter max 10 character length skill";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skill: msg,
      });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skill: msg,
      });

      return true;
    }
  };
  // *************
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
          console.log(res, "res material");
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
        .get(`http://localhost:3000/api/v1/admin/userslist`, headers)
        .then((res) => {
          const filter = res.data.users.filter(
            (dt) => dt.email !== "admin@admin.com"
          );
          setuserData(filter);
          console.log(res.data.users, "res data user");
        })
        .catch((err) => {
          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }

    // fecth all projects
    try {
      axios
        .get(`http://localhost:3000/api/v1/admin/projectslist`, headers)
        .then((res) => {
          setprojectData(res.data.projects);
          console.log(res.data, "res data projects");
        })
        .catch((err) => {
          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  }, [props.match.params.id, key]);
  // console.log(data, "data user");

  // Delete User
  const DeleteUser = (id) => {
    setisLoading(true);
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/admin/delete-user?id=${id}`,
          {},
          headers
        )
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 2000);
          const filter = userdata.filter((dt) => dt._id !== id);
          setuserData(filter);
          addToast("User has been deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });

          // console.log(res, "res material");
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
        });
    } catch (error) {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
      // console.log(error, "error catch");
    }
  };

  //Delete Project
  const DeleteProject = (id) => {
    setisLoading(true);
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/admin//delete-project?id=${id}`,
          {},
          headers
        )
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 2000);
          const filter = projectdata.filter((dt) => dt._id !== id);
          setprojectData(filter);
          addToast("Project has been deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });

          // console.log(res, "res material");
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
        });
    } catch (error) {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
      // console.log(error, "error catch");
    }
  };
  const DeleteMaterial = (id) => {
    setisLoading(true);
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/admin/delete-material?id=${id}`,
          {},
          headers
        )
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 2000);
          const filter = materialList.filter((dt) => dt._id !== id);
          setMaterialList(filter);
          addToast("Material has been deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });

          // console.log(res, "res material");
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
        });
    } catch (error) {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
      // console.log(error, "error catch");
    }
  };
  const DeleteSkillField = (id) => {
    setisLoading(true);
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/admin/delete-skillField?id=${id}`,
          {},
          headers
        )
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 2000);
          const filter = skillFieldList.filter((dt) => dt._id !== id);
          setskillFieldList(filter);
          addToast("Skill has been deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });

          // console.log(res, "res material");
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
        });
    } catch (error) {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
      // console.log(error, "error catch");
    }
  };
  // ****
  // Edit Skill

  return (
    <div>
      <Header />
      <EditSkillModal
        modal={editskillmodal}
        toggle={Edittoggle}
        isLoading={isLoading}
        handleChange={handleChange}
        formData={formData}
        aboutRequiredFields={aboutRequiredFields}
        ValidateSkill={ValidateSkill}
        ValidateSkillField={ValidateSkillField}
        EditSkillSubmit={EditSkillSubmit}
      />
      <AddSKillModal
        modal={addskillmodal}
        toggle={Addtoggle}
        isLoading={isLoading}
        handleChange={handleChange}
        formData={formData}
        aboutRequiredFields={aboutRequiredFields}
        ValidateSkill={ValidateSkill}
        ValidateSkillField={ValidateSkillField}
        AddSkillSubmit={AddSkillSubmit}
        AddSkill={AddSkill}
        skillArrayData={skillArrayData}
        setskillArrayData={setskillArrayData}
      />
      <AddMaterialModal
        modal={materialmodal}
        toggle={MaterialToggle}
        isLoading={isLoading}
        handleMaterial={handleMaterial}
        materialRequiredFields={materialRequiredFields}
        ValidateMaterial={ValidateMaterial}
        material={material}
        AddMaterialSubmit={AddMaterialSubmit}
      />
      <div id="services" className="cards-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Admin Dashboard</h2>
              {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
            </div>{" "}
            <div className="container">
              {" "}
              <div className="col-lg-12 text-right ">
                {key == "third" ? (
                  <button
                    onClick={Addtoggle}
                    type="button"
                    id="modalButton1"
                    className="btn btn-primary text-white  text-uppercase"
                  >
                    Add Skill
                  </button>
                ) : key == "fourth" ? (
                  <button
                    onClick={MaterialToggle}
                    type="button"
                    id="modalButton1"
                    className="btn btn-primary text-white  text-uppercase"
                  >
                    Add Material
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
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
                        <Nav.Link eventKey="first">List of Users</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second"> Projects </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third"> Skill Field List </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth"> Material List </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <ListOfUser
                          data={userdata ? userdata : ""}
                          addToast={addToast}
                          materialList={materialList}
                          DeleteUser={DeleteUser}
                          skillFieldList={skillFieldList}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <ListOfProjects
                          data={projectdata ? projectdata : ""}
                          addToast={addToast}
                          materialList={materialList}
                          DeleteProject={DeleteProject}
                          skillFieldList={skillFieldList}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <ListOfSkills
                          data={skillFieldList ? skillFieldList : ""}
                          addToast={addToast}
                          materialList={materialList}
                          DeleteSkillField={DeleteSkillField}
                          Edittoggle={Edittoggle}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <ListOfMaterials
                          addToast={addToast}
                          materialList={materialList}
                          DeleteMaterial={DeleteMaterial}
                          Edittoggle={Edittoggle}
                        />
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
