import React, { useEffect, useState } from "react";
import "../Theme/css/project.css";
import Header from "../Components/header";
import Footer from "../Components/footer";
import axios from "axios";
import Loaders from "../shared/Loaders";
import { useToasts } from "react-toast-notifications";
import { useStyles } from "../Theme/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { getUser } from "../Auth/Index";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";
import { Link, Redirect } from "react-router-dom";
import Modal from "../shared/Modal";
import ProjectModal from "../shared/ProjectModal";
import StepModal from "../shared/StepModal";
import DeleteModal from "../shared/DeleteContributer";

export default function Project(props) {
  const { addToast } = useToasts();

  const [data, setData] = useState("");
  const [comment, setComment] = useState("");
  const [skillFieldData, setSkillFieldData] = useState("");
  const [MaterialData, setMaterialData] = useState("");
  const [like, setlike] = useState(0);

  const [searchBy, setsearchBy] = useState("");
  const [InviteId, setInviteId] = useState("");

  const [commentArray, setCommentArray] = useState([]);

  // modal states
  const [modal, setModal] = useState(false);
  const [Profilemodal, setProfileModal] = useState(false);
  const [stepmodal, setstepModal] = useState(false);
  const [deletemodal, setdeletemodal] = useState(false);

  // ***
  const [isLoading, setisLoading] = useState(false);
  const [CategoryList, setCategoryList] = useState("");
  const [stepId, setstepId] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  // toast
  const [successmessage, setsuccessMessage] = useState("");
  const [deleteCheck, setdeleteCheck] = useState(false);

  const [errormessage, seterrorMessage] = useState("");

  // toast end

  const projectData = {
    title: "",
    type: "",
    general_photo: "",
    general_description: "",
    category: "",

    // implementation_steps: "",
    // progress: "",
  };
  const [formData, setFormData] = useState(projectData);

  // Edit step states*******************************************
  const stepData = {
    name: "",
    description: "",
    status: "NoProgress",
  };
  const skillData = {
    skillField: "",
    speciality: "",
    skill: "",
  };
  const [stepformData, setstepFormData] = useState(stepData);
  const [formDataSkillField, setFormDataSkillField] = useState(skillData);
  const [stepType, setstepType] = useState("");
  const [materialArrayData, setmaterialArrayData] = useState([]);
  const [material, setMaterial] = useState("");
  const [materialList, setMaterialList] = useState("");
  const [skillfieldList, setskillFieldList] = useState("");
  const [skillList, setskillList] = useState("");
  const [stepArrayData, setstepArrayData] = useState([]);
  const [tempstepId, settempstepId] = useState("");
  const [requestCount, setrequestCount] = useState(0);

  // ***********************************************

  const onAdd = async () => {
    // setCommentArray([...commentArray, comment]);
    const date = new Date();
    const obj = {};
    obj.comment = comment;
    obj.date = date;
    obj.profile_picture = getUser().profile_picture;
    setCommentArray([...commentArray, obj]);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      await axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/comment?id=${props.match.params.id}`,
          { comment: comment },
          headers
        )
        .then((res) => {
          setComment("");
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          setisLoading(false);
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
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
  const DeleteComment = (comment) => {
    const array = commentArray.filter((com) => com.comment !== comment.trim());
    // console.log(array, "array");
    setCommentArray(array);
    addToast("Success", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 1000,
    });
  };

  const handleChange = (e) => {
    let value = e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("type", formData.type);
    newFormData.append("general_photo", photo);
    newFormData.append("general_description", formData.general_description);
    newFormData.append("category", formData.category);
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
          `http://localhost:3000/api/v1/project/editProject?id=${props.match.params.id}`,
          newFormData,
          headers
        )
        .then((res) => {
          setisLoading(false);
          setFormData(projectData);
          setProfileModal(false);
          setsuccessMessage("Success");
          seterrorMessage("");
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
            placement: "bottom-right",
          });
          // console.log(res,"res")
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          seterrorMessage("Error");
          setsuccessMessage("");
          if (err.response.data) {
            if (err.response.data.message) {
              setError(err.response.data.message);
            } else {
              setError(err.response.data);
            }
          }
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });

          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  // modal dialoge
  const Steptoggle = (id) => {
    if (stepmodal === false) {
      settempstepId(id);
    }
    setstepModal(!stepmodal);
  };
  // searchby functions
  const SearchBySkills = (skill, id) => {
    setsearchBy(skill);

    // alert("hello");
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // console.log(headers, "asnlnkoasnas");
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/project/SearchCollaboratorsBySkill`,
          { skill: id },
          headers
        )
        .then((res) => {
          // setProjectdataList(res.data.ownedProjects);
          setSkillFieldData(res.data);
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(res.data, "res skill search data");
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(" error projects =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };
  const SearchByMaterials = (skill, id) => {
    setsearchBy(skill);

    // alert("hello");
    // alert(id);

    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // console.log(headers, "asnlnkoasnas");
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/project/SearchCollaboratorsByMaterial`,
          { material: id },
          headers
        )
        .then((res) => {
          // setProjectdataList(res.data.ownedProjects);
          setMaterialData(res.data.users);
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(res.data, "res material search data");
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(" error projects =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };

  // ************
  const toggle = (skill, id, stepId) => {
    setsearchBy(skill);
    setstepId(stepId);

    setInviteId(id);
    if (modal === false && skill === "skills") {
      SearchBySkills(skill, id);
    } else if (modal === false && skill === "material") {
      SearchByMaterials(skill, id);
    }
    setModal(!modal);
  };

  // profile toggle
  // project Like
  const ProjectLike = () => {
    // debugger;
    if (like >= 1) {
      setlike(0);
    } else {
      var headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      // console.log(headers, "asnlnkoasnas");
      try {
        axios
          .post(
            `http://localhost:3000/api/v1/project//view-project/likedBy?id=${props.match.params.id}`,
            {},
            headers
          )
          .then((res) => {
            setlike(like + 1);
            setsuccessMessage("Success");
            addToast("Success", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            seterrorMessage("");
            // setProjectdataList(res.data.ownedProjects);
          })
          .catch((err) => {
            setlike(false);
            seterrorMessage("Error!");
            setsuccessMessage("");
            addToast("Error", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            console.log(" error projects =>", err);
          });
      } catch (error) {
        console.log(error, "error catch");
      }
    }
  };

  // ****
  const Projecttoggle = () => {
    if (Profilemodal === false) {
      const projectData = {
        title: data.project.title,
        type: data.project.type,
        general_photo: "",
        general_description: data.project.general_description,
        category: data.project.category._id,
      };
      // setPhoto(data.project.general_photo);
      setFormData({ ...projectData });
    }
    setProfileModal(!Profilemodal);
  };
  // console.log(formData, "project in profile toggle");
  const sendInvite = (receiver) => {
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/send-invite?id=${props.match.params.id}`,
          { receiver: receiver, skills: InviteId, stepID: stepId },
          headers
        )
        .then((res) => {
          // setProjectdataList(res.data.ownedProjects);
          // const obj = { ...res.data };
          // setData(res.data);
          setModal(false);

          setsuccessMessage("success");
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(res.data, "res invite sent");
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          setsuccessMessage("");

          console.log(" error projects =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };
  const handleSkillChange = async (e) => {
    if (e.target.name === "skillField") {
      setFormDataSkillField({
        ...formDataSkillField,
        [e.target.name]: e.target.value,
      });
      skillfieldList.map((skill) =>
        skill._id === e.target.value ? setskillList(skill.skill) : ""
      );
    } else {
      // stepformData.skillField = e.target.value;
      setFormDataSkillField({
        ...formDataSkillField,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleStepChange = async (e) => {
    // // console.log(stepType, "stepType");

    let value = e.target.value;
    if (e.target.name === "material") {
      setMaterial(e.target.value);
    }

    setstepFormData({ ...stepformData, [e.target.name]: value });
  };
  const onStepAdd = () => {
    if (material !== "") {
      stepformData.material = material;
    }
    if (
      Object.keys(formDataSkillField).length > 0 &&
      formDataSkillField.skillField !== ""
    ) {
      const skills = {};
      skills.speciality = formDataSkillField.speciality;
      skills.skill = formDataSkillField.skill;
      skills.skillField = formDataSkillField.skillField;
      stepformData.skills = skills;
    }
    setstepArrayData((prevState) => [...prevState, stepformData]);
    setstepFormData(stepData);
    setFormDataSkillField(skillData);
    setstepType("");
  };
  const onStepSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    const newFormData = new FormData();
    newFormData.append("step", JSON.stringify(stepArrayData));
    newFormData.append("id", tempstepId);

    console.log(stepArrayData, "step array data on submit");
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      axios
        .post(
          `http://localhost:3000/api/v1/project/edit-step?id=${props.match.params.id}`,
          { id: tempstepId, step: stepArrayData },
          headers
        )
        .then((res) => {
          setisLoading(false);
          setstepModal(false);
          setError("");
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          // // console.log(res,"res")
        })
        .catch((err) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          if (err.response.data) {
            if (err.response.data.message) {
              setError(err.response.data.message);
            } else {
              setError(err.response.data);
            }
          }
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          // console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };

  const ShowInterest = (id) => {
    if (requestCount >= 0) {
      var headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      // console.log(headers, "asnlnkoasnas");
      try {
        axios
          .post(
            "http://localhost:3000/api/v1/profile/Project-Interest",
            { interest: id },
            headers
          )
          .then((res) => {
            setrequestCount(requestCount + 1);
            // setCategoryList(res.data.category);
            addToast("Success", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            console.log(res, "response interest");
          })
          .catch((err) => {
            setrequestCount(0);

            addToast(`${err.response.data.message}`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
            console.log(" error interest =>", err.response);
          });
      } catch (error) {
        // console.log(error, "error catch");
      }
    } else {
      addToast("You ALready shown interest", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
    }
  };

  const DeleteProject = () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/project/delete-project?id=${props.match.params.id}`,
          {},
          headers
        )
        .then((res) => {
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          setdeleteCheck(true);
          // console.log(res, "res material");
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  };
  const DeletContributor = (stepId) => {
    setstepId(stepId);

    setdeletemodal(!deletemodal);
  };
  const ContributorDelete = (userId) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/project/view-project/delete-contributing-user?id=${props.match.params.id}`,
          { user_id: userId, step_Id: stepId },
          headers
        )
        .then((res) => {
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          setdeletemodal(!deletemodal);

          // console.log(res, "res material");
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
          console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  };
  //***** */
  useEffect(() => {
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // console.log(headers, "asnlnkoasnas");
    try {
      axios
        .get("http://localhost:3000/api/v1/auth/categoryList")
        .then((res) => {
          setCategoryList(res.data.category);
          console.log(res, "response category");
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
    try {
      axios
        .get("http://localhost:3000/api/v1/auth/materialList", headers)
        .then((res) => {
          setMaterialList(res.data.materials);
          // // console.log(res, "res material");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      // // console.log(error, "error catch");
    }
    try {
      axios
        .get("http://localhost:3000/api/v1/auth/skillList")
        .then((res) => {
          setskillFieldList(res.data.skills);
          // // console.log(res, "res skilllist");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }
    try {
      axios
        .get(
          `http://localhost:3000/api/v1/project/view-project?id=${props.match.params.id}`,

          headers
        )
        .then((res) => {
          // setProjectdataList(res.data.ownedProjects);
          // const obj = { ...res.data };

          setData(res.data);

          console.log(res.data, "res project data");
        })
        .catch((err) => {
          console.log(" error projects all =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, []);
  // console.log(skillFieldData, "data skillFieldData");
  useEffect(() => {
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    if (stepType) {
      if (stepType === "Material") {
        try {
          axios
            .get("http://localhost:3000/api/v1/auth/materialList", headers)
            .then((res) => {
              setMaterialList(res.data.materials);
              // // console.log(res, "res material");
            })
            .catch((err) => console.log(" error =>", err));
        } catch (error) {
          // // console.log(error, "error catch");
        }
      } else if (stepType === "Field") {
        try {
          axios
            .get("http://localhost:3000/api/v1/auth/skillList")
            .then((res) => {
              setskillFieldList(res.data.skills);
              // // console.log(res, "res skilllist");
            })
            .catch((err) => console.log(" error =>", err));
        } catch (error) {
          console.log(error, "error catch");
        }
      }
    }
  }, [stepType]);
  if (deleteCheck === true) {
    return <Redirect to="/ProjectList" />;
  } else {
    return (
      <div>
        <DeleteModal
          ContributorDelete={ContributorDelete}
          modal={deletemodal}
          materialList={materialList}
          skillfieldList={skillfieldList}
          toggle={DeletContributor}
          data={data ? data.project.implementation_steps : ""}
        />
        <Modal
          modal={modal}
          id={props.match.params.id}
          sendInvite={sendInvite}
          setsearchBy={setsearchBy}
          SearchBySkills={SearchBySkills}
          InviteId={InviteId}
          SearchByMaterials={SearchByMaterials}
          toggle={toggle}
          materialList={materialList}
          searchBy={searchBy}
          skillFieldData={skillFieldData ? skillFieldData : []}
          MaterialData={MaterialData ? MaterialData : []}
        />
        <ProjectModal
          modal={Profilemodal}
          toggle={Projecttoggle}
          CategoryList={CategoryList}
          formData={formData}
          isLoading={isLoading}
          error={error}
          DefaultImage={DefaultImage}
          setPhoto={setPhoto}
          data={data}
          photo={photo}
          handleChange={handleChange}
          onSubmit={onSubmit}
          data={Object.keys(data).length > 0 ? data : ""}
        />
        <StepModal
          modal={stepmodal}
          toggle={Steptoggle}
          stepformData={stepformData}
          stepType={stepType}
          setstepType={setstepType}
          material={material}
          setmaterialArrayData={setmaterialArrayData}
          handleStepChange={handleStepChange}
          onSubmit={onStepSubmit}
          isLoading={isLoading}
          materialList={materialList}
          onStepAdd={onStepAdd}
          skillfieldList={skillfieldList}
          data={data}
          skillList={skillList}
          formDataSkillField={formDataSkillField}
          handleSkillChange={handleSkillChange}
        />
        <Header />

        {/* start of api integrate */}
        {data ? (
          <div id="services" className="cardsProject">
            <div className="container ">
              <div className="row ">
                <div
                  className=" text-center"
                  style={{
                    width: "20%",
                    background: "#fcfcfc",
                    height: "15.1rem",
                  }}
                >
                  <div
                    style={{
                      paddingRight: "0rem",
                      paddingTop: "0.6rem",
                      paddingLeft: "0rem",
                    }}
                  >
                    <img
                      className="project-image"
                      style={{
                        border: `${
                          data.project.category
                            ? data.project.category.color
                              ? `5px solid ${data.project.category.color}`
                              : ""
                            : ""
                        }`,
                      }}
                      src={
                        data.project.general_photo
                          ? `http://localhost:3000/views/uploads/${data.project.general_photo}`
                          : DefaultImage
                      }
                      alt="alternative"
                    />
                  </div>
                </div>
                <div className="text-left" style={{ width: "55%" }}>
                  <div
                    style={{
                      background: "#fcfcfc",
                      marginLeft: "2rem",
                      paddingBottom: "0.1rem",
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "2rem",
                        paddingBottom: 0,
                        paddingTop: "0.8rem",
                      }}
                    >
                      <p
                        style={{
                          color: `${
                            data.project.category
                              ? data.project.category.color
                                ? ` ${data.project.category.color}`
                                : ""
                              : ""
                          }`,
                          fontWeight: "bold",
                        }}
                      >
                        {data.project.category
                          ? data.project.category.name
                          : ""}
                      </p>
                      <h4
                        style={{
                          marginTop: "-0.5rem",

                          fontWeight: "bold",
                        }}
                      >
                        {data.project.title}
                      </h4>
                      <p>{data.project.general_description}</p>
                    </div>
                    <p style={{ marginLeft: "2rem", marginTop: "4.5rem" }}>
                      {data.project.address ? data.project.address.city : ""}{" "}
                      {`(${
                        data.project.address ? data.project.address.zipCode : ""
                      })`}
                    </p>
                  </div>
                </div>
                <div
                  className="  text-right"
                  style={{
                    width: "25%",
                    background: "#fcfcfc",
                    paddingRight: "1rem",
                    height: "15.2rem",
                    // background: "red",
                  }}
                >
                  {getUser()._id === data.project.project_owner._id ? (
                    <div className="row">
                      <div className="col ">
                        <button
                          onClick={DeleteProject}
                          type="button"
                          className="btn btn-block"
                          style={{ fontSize: "15px", border: 0 }}
                        >
                          Delete Projet
                        </button>
                      </div>

                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-block"
                          style={{ fontSize: "15px", border: 0 }}
                          onClick={Projecttoggle}
                        >
                          MODIFIER
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <p style={{ marginTop: "0.7rem", marginRight: "2.1rem" }}>
                    {like == 1 ? (
                      <i
                        className="fas fa-heart "
                        style={{ color: "red" }}
                        onClick={ProjectLike}
                      />
                    ) : (
                      <i className="fas fa-heart " onClick={ProjectLike} />
                    )}
                    <span
                      style={{
                        marginTop: "-2rem",
                        marginLeft: "0.5rem",
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      {like == 1
                        ? data.project.likedBy.length + like
                        : data.project.likedBy.length}
                    </span>
                    {/* <span class="ml-2 " id="span2" >21%</span> */}
                  </p>
                  <p style={{ marginTop: "8.4rem", marginRight: "1.4rem" }}>
                    <i className="fas fa-circle " />
                    <span
                      style={{
                        marginTop: "-2rem",
                        marginLeft: "0.5rem",
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      {data.project.progress}
                    </span>
                    {/* <span class="ml-2 " id="span2" >21%</span> */}
                  </p>
                </div>
              </div>
              <div
                className="row text-left"
                style={{ marginTop: "1rem", marginLeft: "1rem" }}
              >
                <div
                  className=" text-right"
                  style={{ width: "15%", background: "#fcfcfc" }}
                >
                  <div id="userImage">
                    <img
                      className="proj-img"
                      src={
                        data.project.project_owner
                          ? `http://localhost:3000/views/uploads/${data.project.project_owner.profile_picture}`
                          : DefaultImage
                      }
                      alt="alternative"
                    />
                  </div>
                </div>
                <div className="text-left" style={{ width: "20%" }}>
                  <div id="userDetail">
                    <h5>{data.project.project_owner.username}</h5>
                    <p style={{ marginTop: "1.5rem" }}>
                      <i
                        className="fas fa-phone-volume fa-lg "
                        style={{ color: "#0d2456" }}
                      />
                      <span className="ml-2">
                        {data.project.project_owner.phone}
                      </span>
                    </p>
                    <p style={{ marginTop: "1.5rem" }}>
                      <i
                        className="fas fa-camera fa-lg "
                        style={{ color: "#0d2456" }}
                      />
                      <span className="ml-2">
                        {data.project.project_owner.email}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-left" style={{ width: "65%" }}>
                  <div style={{ marginLeft: "1rem", marginTop: "1.5rem" }}>
                    <Link to={`/profile/${data.project.project_owner._id}`}>
                      <button
                        type="button"
                        id="userButton"
                        className="btn btn-block"
                      >
                        Voir le profil
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* end of col */}
            </div>

            <div className="container">
              <div className="row" style={{ marginTop: "2rem" }}>
                <div
                  className="col-lg-12 text-left  pt-1"
                  style={{
                    background: "#fcfcfc",
                    margin: "auto",
                    position: "relative",
                  }}
                >
                  <h4
                    className=" ml-3 "
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#707070",
                    }}
                  >
                    ETAPES DE REALISATION
                  </h4>
                </div>
              </div>
            </div>
            <div className="container">
              {data.project.implementation_steps
                ? data.project.implementation_steps.map((step) => (
                    <div
                      className="row text-left"
                      style={{ marginTop: "2rem" }}
                      id="projectPage"
                    >
                      <div className=" text-left" style={{ width: "60%" }}>
                        <div style={{ marginLeft: "2rem" }}>
                          <p>
                            <i className="fas fa-circle fa-lg mr-3 text-secondary" />
                            <span
                              style={{
                                fontSize: "16px",
                                color: "#707070",
                              }}
                            >
                              {step.name}
                            </span>
                          </p>
                          <div className="row" style={{ marginTop: "-0.7rem" }}>
                            <p style={{ width: "56%", marginLeft: "3.3rem" }}>
                              {console.log(step.skills, "ste.skills")}
                              {step.skills ? (
                                Object.entries(step.skills).length > 0 ? (
                                  <p
                                    style={{
                                      color: "#707070",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontWeight: "unset",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {" "}
                                      Field
                                    </span>{" "}
                                    :
                                    <span
                                      className="ml-1"
                                      style={{
                                        fontWeight: "unset",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {step.skills.skillField.skillField}
                                    </span>
                                  </p>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                              {step.material ? (
                                Object.entries(step.material).length > 0 ? (
                                  <p
                                    style={{
                                      color: "#707070",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontWeight: "unset",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {" "}
                                      Material
                                    </span>{" "}
                                    :
                                    <span
                                      className="ml-1"
                                      style={{
                                        fontWeight: "unset",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {step.material.name}
                                    </span>
                                  </p>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                              <p
                                style={{
                                  color: "#707070",
                                  marginTop: "-1rem",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "unset",
                                    fontSize: "13px",
                                  }}
                                >
                                  {" "}
                                  Description
                                </span>{" "}
                                :
                                <span
                                  className="ml-1"
                                  style={{
                                    fontWeight: "unset",
                                    fontSize: "12px",
                                  }}
                                >
                                  {step.description}
                                </span>
                              </p>
                            </p>
                            {getUser()._id ===
                            data.project.project_owner._id ? (
                              <p id="entapeSearch">
                                {step.skills &&
                                Object.entries(step.skills).length > 0 ? (
                                  <i
                                    className="fas fa-search fa-lg  text-secondary"
                                    onClick={() =>
                                      toggle(
                                        "skills",
                                        step.skills.skillField._id,
                                        step._id
                                      )
                                    }
                                  />
                                ) : step.material ? (
                                  <i
                                    className="fas fa-search fa-lg  text-secondary"
                                    onClick={() =>
                                      toggle(
                                        "material",
                                        step.material._id,
                                        step._id
                                      )
                                    }
                                  />
                                ) : (
                                  ""
                                )}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="  text-left" style={{ width: "25%" }}>
                        {step.contributing_user ? (
                          <>
                            <p style={{ color: "rgb(112, 112, 112)" }}>
                              Collaborateurs:{" "}
                            </p>

                            <p>
                              {step.contributing_user.map((cont) => (
                                <img
                                  onClick={() => DeletContributor(step._id)}
                                  className="project-image-sm"
                                  src={
                                    cont.profile_picture
                                      ? `http://localhost:3000/views/uploads/${cont.profile_picture}`
                                      : DefaultImage
                                  }
                                  alt="alternative"
                                />
                              ))}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div style={{ width: "15%" }}>
                        {getUser()._id === data.project.project_owner._id ? (
                          <button
                            onClick={() => Steptoggle(step._id)}
                            type="button"
                            // id="modifyButton"
                            style={{ maxWidth: "90%" }}
                            className="btn btn-block ml-1 mt-3"
                          >
                            MODIFIER
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              ShowInterest(data.project.category._id)
                            }
                            type="button"
                            // id="modifyButton"
                            style={{ maxWidth: "80%" }}
                            className="btn btn-block ml-1 mt-3"
                          >
                            Show Interest
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                : ""}

              {/*  */}

              {/*  */}
            </div>
            {/* end of row */}
            {/* end of row */}
            <div className="container">
              <div className="row" style={{ marginTop: "2rem" }}>
                <div
                  className="col-lg-12 text-left  p-1"
                  style={{
                    background: "#fcfcfc",
                    margin: "auto",
                    position: "relative",
                  }}
                >
                  <h4 className="mt-1 ml-3 " style={{ fontWeight: "bold" }}>
                    COMMENTAIRIES
                  </h4>
                </div>
              </div>

              {data.project.comments && data.project.comments.length > 0
                ? data.project.comments.map((comment) => (
                    <div
                      className="row text-left"
                      style={{ marginTop: "2rem" }}
                    >
                      <div className="text-right" style={{ width: "10%" }}>
                        <img
                          className="com-image"
                          src={
                            data.project.project_owner.profile_picture
                              ? `http://localhost:3000/views/uploads/${data.project.project_owner.profile_picture}`
                              : DefaultImage
                          }
                          alt="alternative"
                        />
                      </div>
                      <div className="text-left" style={{ width: "90%" }}>
                        <div style={{ marginLeft: "2rem" }}>
                          <h5>
                            {getUser() ? getUser().username : ""}
                            <small className="ml-2">
                              {
                                new Date(comment.createdAt)
                                  .toString()
                                  .split(" ")[2]
                              }
                              {"/"}
                              {new Date(comment.createdAt).getMonth()}
                              {"/"}
                              {new Date(comment.createdAt).getFullYear()}
                            </small>
                          </h5>
                          <p className="mt-2" style={{ fontWeight: "bold" }}>
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
              {commentArray.length > 0
                ? commentArray.map((comment) => (
                    <div
                      className="row text-left"
                      style={{ marginTop: "2rem" }}
                    >
                      <div className="text-right" style={{ width: "10%" }}>
                        <img
                          className="com-image"
                          src={
                            comment.profile_picture
                              ? `http://localhost:3000/views/uploads/${comment.profile_picture}`
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
                              {new Date(comment.date).toString().split(" ")[2]}
                              {"/"}
                              {new Date(comment.date).getMonth()}
                              {"/"}
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
            </div>
            <div className="container ">
              <div
                className="row"
                style={{ marginTop: "2rem", marginLeft: "3rem" }}
              >
                <div style={{ width: "90%" }} className="text-right">
                  <textarea
                    name="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    cols={110}
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
        ) : (
          <h1 className="text-center">No Project Found</h1>
        )}

        {/* end of row */}
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
  }
}
