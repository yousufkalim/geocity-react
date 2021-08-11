import React, { useEffect, useState } from "react";
// import "../../Components/UI/Theme/css/project.css";
import Header from "../../Components/Header/header";
import Footer from "../../Components/footer";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useStyles } from "../../Components/UI/Theme/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { getUser, isAuthenticated } from "../../Auth/Index";
import DefaultImage from "../../Components/UI/Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.jpg";
import { Link, Redirect } from "react-router-dom";
import Modal from "../../Components/UI/Modals/Modal";
import ProjectModal from "../../Components/UI/Modals/ProjectModal";
import SuggestModal from "../../Components/UI/Modals/suggestModal";
import { url } from "../../urlConfig";

import StepModal from "../../Components/UI/Modals/StepModal";
import AddStepModal from "../../Components/UI/Modals/AddStepModal";
import DefaultuserImage from "../../Components/UI/Theme/images/men.png";
import AutorenewIcon from "../../Components/UI/Theme/images/geocity/Group 3.png";
import Image46 from "../../Components/UI/Theme/images/geocity/Image 46.png";
import Image47 from "../../Components/UI/Theme/images/geocity/Image 47.png";
import {
  projectaboutRequired,
  projectstepRequired,
  projectskillRequired,
} from "../../shared/Data";
import CommentsFromDB from "../../Components/CommentsFromDB";
import Comments from "../../Components/Comments";
import ImplementationStep from "../../Components/ImpementationStep";
import LoadedClients from "../../shared/Loaders";
import io from "socket.io-client";
import { useHistory, useParams } from "react-router-dom";

export default function Project(props) {
  const { notificationsData, setdata } = props;
  const params = useParams();

  const { addToast } = useToasts();
  useEffect(() => {
    window.socket = io(process.env.REACT_APP_SOCKET_URL || url, {
      query: `userConnectionId=${getUser()._id}`,
    });
    if (window.socket) {
      window.socket.on(`recieveNotification${getUser()._id}`, (datas) => {
        setdata([...notificationsData, datas]);
        console.log(datas, "datas");
        addToast(datas.title, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      });
    }
    // return () => {
    //   io.socket.off();
    // };
  }, []);
  const stepData = {
    name: "",
    description: "",
    status: "NoProgress",
  };
  const skillData = {
    skillField: "",
    speciality: "",
    skill: "",
    intentions: "",
  };
  const projectData = {
    title: "",
    type: "",
    general_photo: "",
    general_description: "",
    category: "",
  };
  const [data, setData] = useState("");
  const [isPending, setisPending] = useState("");

  const [comment, setComment] = useState("");
  const [CheckStep, setCheckStep] = useState("");
  const [commentError, setCommentError] = useState("");
  const [skillFieldData, setSkillFieldData] = useState("");
  const [intentionData, setIntentionData] = useState("");
  const [implementationstepData, setimplementationstepData] = useState([]);

  const [MaterialData, setMaterialData] = useState("");
  const [otherSKill, setotherSkill] = useState("");

  const [like, setlike] = useState(0);
  const [searchBy, setsearchBy] = useState("");
  const [InviteId, setInviteId] = useState("");
  const [request, setRequest] = useState(false);

  const [commentArray, setCommentArray] = useState([]);
  const [tempcommentArray, settempCommentArray] = useState([]);

  const [singleStep, setSingleStep] = useState("");

  // modal states
  const [modal, setModal] = useState(false);
  const [Profilemodal, setProfileModal] = useState(false);
  const [suggestModal, setsuggestModal] = useState(false);

  const [stepmodal, setstepModal] = useState(false);
  const [addstepmodal, setaddstepModal] = useState(false);

  // ***

  const [isLoading, setisLoading] = useState(false);

  const [CategoryList, setCategoryList] = useState("");
  const [stepId, setstepId] = useState("");
  const [photo, setPhoto] = useState("");

  // toast
  const [deleteCheck, setdeleteCheck] = useState(false);

  // toast end

  // Edit step states*******************************************
  const [formData, setFormData] = useState(projectData);

  const [stepformData, setstepFormData] = useState(stepData);
  const [formDataSkillField, setFormDataSkillField] = useState(skillData);

  const [stepType, setstepType] = useState("");
  const [material, setMaterial] = useState("");
  const [materialList, setMaterialList] = useState("");
  const [skillfieldList, setskillFieldList] = useState("");
  const [skillList, setskillList] = useState("");
  const [stepArrayData, setstepArrayData] = useState([]);
  const [tempstepId, settempstepId] = useState("");
  const [otherMaterial, setotherMaterial] = useState("");

  const [aboutRequiredFields, setAboutRequiredFields] =
    useState(projectaboutRequired);
  const [stepRequiredFields, setstepRequiredFields] =
    useState(projectstepRequired);
  const [skillRequiredFields, setskillRequiredFields] =
    useState(projectskillRequired);
  const [materialRequiredFields, setmaterialRequiredFields] = useState({
    name: "",
    error: "",
    otherMaterial: "",
  });
  // ***********************************************
  const HandleStepDelete = (chipToDelete) => {
    // alert(chipToDelete);
    const ChipsArray = stepArrayData.filter(
      (chip) => chip.name !== chipToDelete
    );
    // console.log(ChipsArray, "chipsArray");
    setstepArrayData(ChipsArray);
  };
  const validateMaterial = () => {
    if (!material) {
      const msg = "Required";
      setmaterialRequiredFields({ ...materialRequiredFields, name: msg });
      return false;
    } else {
      const msg = "";
      setmaterialRequiredFields({ ...materialRequiredFields, name: msg });

      return true;
    }
  };
  const ValidateOtherMaterial = () => {
    if (!otherMaterial) {
      const msg = "Required";
      setmaterialRequiredFields({ ...skillRequiredFields, otherMaterial: msg });
      return false;
    } else {
      const msg = "";
      setmaterialRequiredFields({ ...skillRequiredFields, otherMaterial: msg });
      return true;
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
  const checkValidateForm3 = () => {
    let obj = {};
    let reqFields = true;
    Object.keys(formDataSkillField).map((key) => {
      if (formDataSkillField[key] === "") {
        obj[key] = "Required";
        reqFields = false;
      }
      return obj;
    });
    if (stepArrayData.length >= 0) {
      // ""
      if (!reqFields) {
        if (otherSKill !== "") {
          obj.skill = "";
          setskillRequiredFields(obj);
          return false;
        } else {
          setskillRequiredFields(obj);
          return false;
        }

        // console.log(obj, "validate 2 check");
      } else {
        setskillRequiredFields(projectskillRequired);

        return true;
      }
    } else {
      setskillRequiredFields(projectskillRequired);

      return true;
    }
  };

  const validateComment = () => {
    if (!comment) {
      setCommentError("Required");
      return false;
    } else {
      setCommentError("");
      return true;
    }
  };
  const onAdd = async () => {
    // setCommentArray([...commentArray, comment]);
    const tempCheck = validateComment();
    if (tempCheck == true) {
      setCommentError("");
      const date = new Date();
      const obj = {};
      obj.comment = comment;
      obj.date = date;
      obj.profile_picture = getUser().profile_picture;
      settempCommentArray([...tempcommentArray, obj]);
      try {
        const headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        };

        await axios
          .post(
            `${url}/api/v1/project/view-project/comment?id=${props.match.params.id}`,
            { comment: comment },
            headers
          )
          .then((res) => {
            setComment("");
            addToast("Comment Added Successfully", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            setisLoading(false);
          })
          .catch((err) => {
            setComment("");

            setTimeout(() => {
              setisLoading(false);
            }, 1000);
            addToast("Error", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            // console.log(" error =>", err);
          });
      } catch (error) {
        // console.log(error, "error catch");
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      }
    } else {
      setCommentError("Required");
    }
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const DeleteStep = async (id) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      await axios
        .post(
          `${url}/api/v1/project/delete-step?id=${props.match.params.id}`,
          { id: id },
          headers
        )
        .then((res) => {
          // setComment("");
          addToast("Step  Deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          const fil = implementationstepData.filter((con) => con._id !== id);
          setimplementationstepData(fil);
          setCheckStep(true);
          setisLoading(false);
          try {
            axios
              .get(
                `${url}/api/v1/project/view-project?id=${props.match.params.id}`,

                headers
              )
              .then((res) => {
                // setProjectdataList(res.data.ownedProjects);
                // const obj = { ...res.data };
                setimplementationstepData(
                  res.data.project.implementation_steps
                );
                setData(res.data);
                setCommentArray(res.data.project.comments);

                // console.log(res.data, "res project data");
              })
              .catch((err) => {
                // console.log(" error projects all =>", err.response.data);
              });
          } catch (error) {
            // console.log(error, "error catch");
          }
        })
        .catch((err) => {
          // setTimeout(() => {
          //   setisLoading(false);
          // }, 1000);
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          // console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
      // setTimeout(() => {
      //   setisLoading(false);
      // }, 1000);
    }
  };
  const DeleteComment = async (commentId) => {
    if (data.project && data.project.comments) {
      var array = data.project.comments.filter((com) => com._id !== commentId);
      // console.log(array, "array main");
      setCommentArray(array);
    }
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      await axios
        .post(
          `${url}/api/v1/project/view-project/delete-comment?id=${props.match.params.id}`,
          { commentId: commentId },
          headers
        )
        .then((res) => {
          // setComment("");
          addToast("Comment Deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
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
            autoDismissTimeout: 3000,
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

  const handleChange = (e) => {
    let value = e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };
  // validation

  const validateTitle = () => {
    if (!formData.title) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        title: msg,
      });
      return false;
    } else if (formData.title.length < 5) {
      const msg = "Title  needs to be atleast  5 characters long";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        title: msg,
      });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        title: msg,
      });
      return true;
    }
  };
  const validateGenralDesc = () => {
    if (!formData.general_description) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        general_description: msg,
      });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        general_description: msg,
      });

      return true;
    }
  };
  const validateProjectType = () => {
    if (formData.type) {
      setAboutRequiredFields({ ...aboutRequiredFields, type: "" });

      return true;
    } else if (!formData.type) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, type: msg });
      return false;
    }
  };

  const validateCategory = () => {
    if (!formData.category) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, category: msg });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, category: msg });
      return true;
    }
  };
  const validateStepName = () => {
    if (!stepformData.name.length) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      return false;
    } else {
      const msg = "";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      return true;
    }
  };

  const validateDescription = () => {
    if (!stepformData.description) {
      const msg = "Required";
      setstepRequiredFields({
        ...stepRequiredFields,
        description: msg,
      });
      return false;
    } else {
      const msg = "";
      setstepRequiredFields({
        ...stepRequiredFields,
        description: msg,
      });

      return true;
    }
  };
  const validateSpeciality = () => {
    if (formDataSkillField.speciality) {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, speciality: msg });

      return true;
    } else if (!formDataSkillField.speciality) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, speciality: msg });
      return false;
    }
  };
  const validateStatus = () => {
    if (!stepformData.status) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, status: msg });
      return false;
    } else if (stepformData.status) {
      setstepRequiredFields({ ...stepRequiredFields, status: "" });

      return true;
    }
  };
  const validateStepType = () => {
    if (!stepType) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, stepType: msg });
      return false;
    } else {
      const msg = "";

      setstepRequiredFields({ ...stepRequiredFields, stepType: msg });

      return true;
    }
  };
  const ValidateSkillField = () => {
    if (formDataSkillField.skillField) {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return true;
    } else if (!formDataSkillField.skillField) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return false;
    }
  };

  const ValidateSkill = () => {
    if (formDataSkillField.skill) {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, skill: msg });
      return true;
    } else if (!formDataSkillField.skill) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, skill: msg });
      return false;
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
    // ""
    if (!reqFields) {
      setAboutRequiredFields(obj);

      return false;
    } else {
      setAboutRequiredFields(projectaboutRequired);

      return true;
    }
  };
  const checkValidateForm2 = () => {
    let obj = {};
    let reqFields = true;
    Object.keys(stepformData).map((key) => {
      if (stepformData[key] === "") {
        obj[key] = "Required";
        reqFields = false;
      }
      return obj;
    });

    if (stepArrayData.length >= 0) {
      if (!reqFields) {
        if (stepType === "") {
          obj.stepType = "Required";
          setstepRequiredFields(obj);
          return false;
        } else {
          setstepRequiredFields(obj);
          return false;
        }
        // return false;
      } else {
        setstepRequiredFields(projectstepRequired);

        return true;
      }
    } else {
      setstepRequiredFields(projectstepRequired);

      return true;
    }
  };
  // console.log(stepRequiredFields, "stepRequired fields");
  // ***
  const onSubmit = async (e) => {
    e.preventDefault();
    checkValidateForm();
    setisLoading(true);
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("type", formData.type);
    newFormData.append("general_photo", photo);
    newFormData.append("general_description", formData.general_description);
    newFormData.append("category", formData.category);
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
          `${url}/api/v1/project/editProject?id=${props.match.params.id}`,
          newFormData,
          headers
        )
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          setFormData(projectData);
          setProfileModal(false);
          addToast("Project updated sucessfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
            placement: "bottom-right",
          });
          // console.log(res,"res")
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

          console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  const onAddStepSubmit = async (e) => {
    // console.log(stepformData, "stepFormData");

    e.preventDefault();
    setisLoading(true);
    if (otherSKill !== "") {
      formDataSkillField.skill = otherSKill;
    }
    if (material == "Other") {
      var materialcheck = ValidateOtherMaterial();
    }
    // ""

    if (stepType !== "") {
      if (stepType === "Field") {
        var stepCheck2 = checkValidateForm3();
      } else {
        validateMaterial();
      }
    }
    const stepCheck = checkValidateForm2();

    const check = Object.values(stepformData).map((obj) => {
      if (obj !== "") {
        return true;
      } else {
        return false;
      }
    });
    if (check[0] === true) {
      const formObj = Object.values(formDataSkillField).map((obj) => {
        if (obj !== "") {
          return true;
        } else {
          return false;
        }
      });
      // console.log(photo, "photo");
      if (stepCheck2 == true && stepCheck === true) {
        const skills = {};
        skills.speciality = formDataSkillField.speciality;
        skills.skill = formDataSkillField.skill;
        skills.skillField = formDataSkillField.skillField;
        stepformData.skills = skills;
        try {
          const headers = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          };
          await axios
            .post(
              `${url}/api/v1/project/add-step?id=${props.match.params.id}`,
              { step: stepformData },
              headers
            )
            .then((response) => {
              setisLoading(false);

              setPhoto("");
              setstepArrayData([]);
              setaddstepModal(!addstepmodal);
              addToast(`Step created Successfully`, {
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
            });
        } catch (error) {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
        }
        // setstepArrayData((prevState) => [...prevState, stepformData]);
        setstepFormData(stepData);
        setFormDataSkillField(skillData);
        setstepType("");
      } else if (material !== "" && stepCheck === true) {
        if (material == "Other") {
          if (materialcheck === true) {
            stepformData.materialName = otherMaterial;
            stepformData.material = "";

            try {
              const headers = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              };
              await axios
                .post(
                  `${url}/api/v1/project/add-step?id=${props.match.params.id}`,
                  { step: stepformData },
                  headers
                )
                .then((response) => {
                  setisLoading(false);

                  setPhoto("");
                  setstepArrayData([]);
                  setaddstepModal(!addstepmodal);
                  addToast(`Step created Successfully`, {
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
                });
            } catch (error) {
              setTimeout(() => {
                setisLoading(false);
              }, 1000);
            }
            setstepFormData(stepData);
            setFormDataSkillField(skillData);
            setstepType("");
            setMaterial("");
            setotherMaterial("");
          }
        } else {
          stepformData.material = material;
          try {
            const headers = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            };
            await axios
              .post(
                `${url}/api/v1/project/add-step?id=${props.match.params.id}`,
                { step: stepformData },
                headers
              )
              .then((response) => {
                setisLoading(false);

                setPhoto("");
                setstepArrayData([]);
                setaddstepModal(!addstepmodal);
                addToast(`Step created Successfully`, {
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
              });
          } catch (error) {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);
          }
          setstepFormData(stepData);
          setFormDataSkillField(skillData);
          setstepType("");
          setMaterial("");
          setotherMaterial("");
        }
      } else {
        addToast(`Please add All step fields`, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 1000,
        });
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
    // alert("hello");
  };
  // modal dialoge
  const addStepToggle = () => {
    // if (addstepmodal === false) {
    //   settempstepId(id);
    // }

    setstepArrayData([]);
    setstepFormData(stepData);
    setFormDataSkillField(skillData);
    setMaterial("");
    setstepType("");
    setaddstepModal(!addstepmodal);
  };
  const Steptoggle = (id) => {
    // ""
    if (stepmodal === false) {
      settempstepId(id);
      const stepIndex = data.project.implementation_steps.findIndex(
        (step) => step._id === id
      );
      const step = data.project.implementation_steps[stepIndex];
      if (step.skills) {
        setstepType("Field");
        const skillData = {
          skillField: step.skills.skillField._id,
          speciality: step.skills.speciality,
          intentions: step.skills.intentions,
          skill: step.skills.skill,
        };
        skillfieldList.map((skill) =>
          skill._id === step.skills.skillField._id
            ? setskillList(skill.skill)
            : ""
        );
        setFormDataSkillField(skillData);
        const stepData = {
          name: step.name,
          description: step.description,
          status: step.status,
        };

        setstepFormData(stepData);
      } else if (step.material) {
        setstepType("Material");
        const stepData = {
          name: step.name,
          description: step.description,
          status: step.status,
          material: step.material._id,
        };
        setMaterial(step.material._id);
        setstepFormData(stepData);
      }
    }
    setstepModal(!stepmodal);
  };
  // console.log(stepformData, "step form data");onSte

  // searchby functions
  const SearchBySkills = async (skill, id) => {
    setsearchBy(skill);
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    await axios
      .post(
        `${url}/api/v1/project/SearchCollaboratorsBySkill`,
        { skill: id },
        headers
      )
      .then((res) => {
        const filter = res.data.filter(
          (dt) =>
            dt._id !== data.project.project_owner._id && dt.role !== "admin"
        );
        setSkillFieldData(filter);
      })
      .catch((err) => {
        // console.log(" error searchbyskill =>", err);
      });
  };
  // search by intention
  const SearchByintentions = async (skill, intention) => {
    // console.log(skill, intention);
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    await axios
      .post(
        `${url}/api/v1/project/SearchCollaboratorsByintention`,
        { intention: intention },
        headers
      )
      .then((res) => {
        if (res.data) {
          const filter = res.data.filter(
            (dt) =>
              dt._id !== data.project.project_owner._id && dt.role !== "admin"
          );
          console.log(filter, "filter");
          setIntentionData(filter);
        }
      })
      .catch((err) => {
        // console.log(" error searchbyskill =>", err);
      });
  };
  // search by intention
  const SearchByMaterials = (skill, id) => {
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // console.log(headers, "asnlnkoasnas");
    try {
      axios
        .post(
          `${url}/api/v1/project/SearchCollaboratorsByMaterial`,
          { material: id },
          headers
        )
        .then((res) => {
          // setProjectdataList(res.data.ownedProjects);
          const filter = res.data.users.filter(
            (dt) =>
              dt._id !== data.project.project_owner._id && dt.role !== "admin"
          );

          setMaterialData(filter);
          // addToast("Success", {
          //   appearance: "success",
          //   autoDismiss: true,
          //   autoDismissTimeout: 3000,
          // });
          // console.log(res.data, "res material search data");
        })
        .catch((err) => {
          // console.log(" error projects =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  };

  // ************
  const toggle = (skill, id, stepId) => {
    setsearchBy(skill);
    setstepId(stepId);
    setInviteId(id);
    const fil = implementationstepData.find((el) => el._id == stepId);
    setSingleStep(fil);
    if (modal === false && skill === "skills") {
      SearchBySkills(skill, id);
    } else if (modal === false && skill === "material") {
      SearchByMaterials(skill, id);
    } else if (modal === false && skill === "Intention") {
      SearchByintentions(skill, id);
    }
    setModal(!modal);
  };

  // profile toggle
  // project Like
  const ProjectLike = (likedBy) => {
    // ""
    // alert(like);
    if (!isAuthenticated()) {
      setRequest(true);
      addToast("Please login", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
    } else {
      // ""
      if (likedBy.length > 0) {
        const fil = likedBy.indexOf(getUser()._id);
        if (fil == -1) {
          var headers = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          };

          try {
            axios
              .post(
                `${url}/api/v1/project//view-project/likedBy?id=${props.match.params.id}`,
                {},
                headers
              )
              .then((res) => {
                setlike(like + 1);

                addToast("Project like successfully", {
                  appearance: "success",
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });

                // setProjectdataList(res.data.ownedProjects);
              })
              .catch((err) => {
                setlike(0);
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
                      autoDismissTimeout: 1000,
                    });
                  }
                }
              });
          } catch (error) {}
        } else {
          setlike(like + 1);
        }
      } else {
        var headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        };
        try {
          axios
            .post(
              `${url}/api/v1/project//view-project/likedBy?id=${props.match.params.id}`,
              {},
              headers
            )
            .then((res) => {
              setlike(like + 1);

              addToast("Project like successfully", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
            })
            .catch((err) => {
              // setlike(0);
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
                    autoDismissTimeout: 1000,
                  });
                }
              }
            });
        } catch (error) {}
      }
    }
  };
  const ProjectunLike = () => {
    // ""
    if (!isAuthenticated()) {
      setRequest(true);
      addToast("Please login", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
    } else {
      var headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      try {
        axios
          .post(
            `${url}/api/v1/project//view-project/unlike?id=${props.match.params.id}`,
            {},
            headers
          )
          .then((res) => {
            setlike(like - 1);
            // addToast("Project like successfully", {
            //   appearance: "success",
            //   autoDismiss: true,
            //   autoDismissTimeout: 3000,
            // });
            // setProjectdataList(res.data.ownedProjects);
          })
          .catch((err) => {
            // setlike(0);
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
                  autoDismissTimeout: 1000,
                });
              }
            }
            // console.log(" error projects =>", err);
          });
      } catch (error) {
        // console.log(error, "error catch");
      }
    }
  };
  const Suggesttoggle = () => {
    setsuggestModal(!suggestModal);
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
      setPhoto(data.project.general_photo);
      // setPhoto(data.project.general_photo);
      setFormData({ ...projectData });
    }
    setProfileModal(!Profilemodal);
  };
  // console.log(formData, "project in profile toggle");
  const sendInvite = (receiver) => {
    // setrecieverId(receiver);
    setModal(!modal);

    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    axios
      .post(
        `${url}/api/v1/project/view-project/send-invite?id=${props.match.params.id}`,
        { receiver: receiver, skills: InviteId, stepID: stepId },
        headers
      )
      .then((res) => {
        // setProjectdataList(res.data.ownedProjects);
        // const obj = { ...res.data };
        // setData(res.data);
        setModal(!modal);

        addToast("Invitation sent successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        // console.log(res.data, "res invite sent");
      })
      .catch((err) => {
        setModal(!modal);

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

        // console.log(" error projects =>", err);
      });

    // } else {
    //   addToast("You already sent invite to this user", {
    //     appearance: "error",
    //     autoDismiss: true,
    //     autoDismissTimeout: 1000,
    //   });
    // }
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
  // console.log(stepArrayData, "stepArrayData on Add");

  const onStepAdd = () => {
    if (otherSKill !== "") {
      formDataSkillField.skill = otherSKill;
    }
    if (material == "Other") {
      var materialcheck = ValidateOtherMaterial();
    }
    // ""

    if (stepType !== "") {
      if (stepType === "Field") {
        var stepCheck2 = checkValidateForm3();
      } else {
        validateMaterial();
      }
    }
    const stepCheck = checkValidateForm2();

    const check = Object.values(stepformData).map((obj) => {
      if (obj !== "") {
        return true;
      } else {
        return false;
      }
    });
    // console.log(stepformData, "stepformData on Add");
    if (check[0] === true) {
      const formObj = Object.values(formDataSkillField).map((obj) => {
        if (obj !== "") {
          return true;
        } else {
          return false;
        }
      });
      // ""
      if (stepArrayData.length > 0) {
        const tempCheck = stepArrayData.find(
          (cont) => cont.name === stepformData.name
        );

        if (tempCheck && stepCheck == true) {
          addToast("Step already existed", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        } else {
          if (stepCheck2 == true && stepCheck === true) {
            const skills = {};
            skills.speciality = formDataSkillField.speciality;
            skills.skill = formDataSkillField.skill;
            skills.skillField = formDataSkillField.skillField;
            stepformData.skills = skills;
            setstepArrayData((prevState) => [...prevState, stepformData]);
            setstepFormData(stepData);
            setFormDataSkillField(skillData);
            setstepType("");
          } else if (material !== "" && stepCheck === true) {
            if (material == "Other") {
              if (materialcheck === true) {
                stepformData.materialName = otherMaterial;
                stepformData.material = "";
                setstepArrayData((prevState) => [...prevState, stepformData]);
                setstepFormData(stepData);
                setFormDataSkillField(skillData);
                setstepType("");
                setMaterial("");
                setotherMaterial("");
              }
            } else {
              stepformData.material = material;
              setstepArrayData((prevState) => [...prevState, stepformData]);
              setstepFormData(stepData);
              setFormDataSkillField(skillData);
              setstepType("");
              setMaterial("");
              setotherMaterial("");
            }
          } else {
            addToast(`Please add All step fields`, {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          }
        }
      } else {
        if (stepCheck2 == true && stepCheck === true) {
          const skills = {};
          skills.speciality = formDataSkillField.speciality;
          skills.skill = formDataSkillField.skill;
          skills.skillField = formDataSkillField.skillField;
          stepformData.skills = skills;
          setstepArrayData((prevState) => [...prevState, stepformData]);
          setstepFormData(stepData);
          setFormDataSkillField(skillData);
          setstepType("");
        } else if (material !== "" && stepCheck === true) {
          if (material == "Other") {
            if (materialcheck === true) {
              stepformData.materialName = otherMaterial;
              stepformData.material = "";

              setstepArrayData((prevState) => [...prevState, stepformData]);
              setstepFormData(stepData);
              setFormDataSkillField(skillData);
              setstepType("");
              setMaterial("");
              setotherMaterial("");
            }
          } else {
            stepformData.material = material;
            setstepArrayData((prevState) => [...prevState, stepformData]);
            setstepFormData(stepData);
            setFormDataSkillField(skillData);
            setstepType("");
            setMaterial("");
            setotherMaterial("");
          }
        } else {
          addToast(`Please add All step fields`, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
          });
        }
      }
    }
  };

  const onStepSubmit = (e) => {
    e.preventDefault();
    const checkForm = checkValidateForm2();
    if (checkForm == true) {
      setisLoading(true);
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      // ""
      if (
        Object.keys(stepformData).length > 0 &&
        stepformData.material === undefined &&
        Object.keys(formDataSkillField).length > 0
      ) {
        const formObj = Object.values(formDataSkillField).map((obj) => {
          if (obj !== "") {
            return true;
          } else {
            return false;
          }
        });
        if (formObj[0] === true && formObj[2] === true) {
          // alert("hello");
          let array = [];
          const obj1 = { ...formDataSkillField };
          const obj2 = { ...stepformData };
          obj2.skills = obj1;
          const fil = data.project.implementation_steps.find(
            (el) => el._id == tempstepId
          );
          obj2.contributing_user = fil.contributing_user;
          // console.log(fil, "fil oy");
          // stepformData.skills = formDataSkillField;
          // let merge = { ...stepformData, ...formDataSkillField };

          array.push(obj2);
          // console.log(array, "array on submit");
          axios
            .post(
              `${url}/api/v1/project/edit-step?id=${props.match.params.id}`,
              { id: tempstepId, step: obj2 },
              headers
            )
            .then((res) => {
              setisLoading(false);
              setstepModal(false);

              addToast("Step Update Successfully", {
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
              // console.log(" error =>", err);
            });
        }
      } else if (stepformData.material !== "") {
        // alert("oy hoy");
        // console.log(stepformData, "stepformdata");
        const fil = data.project.implementation_steps.find(
          (el) => el._id == tempstepId
        );
        stepformData.contributing_user = fil.contributing_user;
        // console.log(fil, "fil oy");
        axios
          .post(
            `${url}/api/v1/project/edit-step?id=${props.match.params.id}`,
            { id: tempstepId, step: stepformData },
            headers
          )
          .then((res) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);
            setstepModal(false);
            addToast("Step updated Successfully", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            // // console.log(res,"res")
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
            // console.log(" error =>", err);
          });
      } else {
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
    // console.log(merge, "merge object");
  };

  const ShowInterest = (id, setisShown) => {
    setisShown(true);
    setisPending(true);
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    // console.log(headers, "asnlnkoasnas");
    try {
      axios
        .post(
          `${url}/api/v1/project/view-project/sendInviteToCollaborateByUser?id=${props.match.params.id}`,
          { stepID: id },
          headers
        )
        .then((res) => {
          setTimeout(() => {
            setisShown(false);
          }, 1000);

          // setCategoryList(res.data.category);
          addToast("You have successfully shown interest ", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          // console.log(res, "response interest");
        })
        .catch((err) => {
          addToast(`${err.response.data.message}`, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setTimeout(() => {
            setisShown(false);
          }, 1000);
          console.log(" error interest =>", err.response);
        });
    } catch (error) {
      setTimeout(() => {
        setisShown(false);
      }, 1000);
      // console.log(error, "error catch");
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
          `${url}/api/v1/project/delete-project?id=${props.match.params.id}`,
          {},
          headers
        )
        .then((res) => {
          addToast("Success", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setdeleteCheck(true);
          // console.log(res, "res material");
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          console.log(" error =>", err);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  };
  useEffect(() => {
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        .get(`${url}/api/v1/auth/materialList`, headers)
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
        .get(`${url}/api/v1/auth/skillList`)
        .then((res) => {
          setskillFieldList(res.data.skills);
          // // console.log(res, "res skilllist");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }
  }, []);
  //***** */
  useEffect(() => {
    // alert("props.match.params.id");
    var headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // console.log(headers, "asnlnkoasnas");

    try {
      axios
        .get(
          `${url}/api/v1/project/view-project?id=${props.match.params.id}`,

          headers
        )
        .then((res) => {
          // setProjectdataList(res.data.ownedProjects);
          // const obj = { ...res.data };
          setimplementationstepData(res.data.project.implementation_steps);
          setData(res.data);
          setCommentArray(res.data.project.comments);

          console.log(res.data, "res project data");
        })
        .catch((err) => {
          // console.log(" error projects all =>", err.response.data);
        });
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, [
    Profilemodal,
    modal,
    stepmodal,
    CheckStep,
    addstepmodal,
    setComment,
    comment,
    setisPending,
    isPending,
    // setimplementationstepData,
    // implementationstepData,
  ]);
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
            .get(`${url}/api/v1/auth/materialList`, headers)
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
            .get(`${url}/api/v1/auth/skillList`)
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
  // console.log(data, "data project");
  if (request === false) {
    if (deleteCheck === true) {
      return <Redirect to="/ProjectList" />;
    } else {
      return (
        <div>
          <Modal
            modal={modal}
            id={props.match.params.id}
            sendInvite={sendInvite}
            setsearchBy={setsearchBy}
            SearchBySkills={SearchBySkills}
            InviteId={InviteId}
            SearchByMaterials={SearchByMaterials}
            toggle={toggle}
            SearchByintentions={SearchByintentions}
            materialList={materialList}
            searchBy={searchBy}
            data={data}
            singleStep={singleStep}
            skillFieldData={skillFieldData ? skillFieldData : []}
            intentionData={intentionData ? intentionData : []}
            MaterialData={MaterialData ? MaterialData : []}
          />
          <SuggestModal
            modal={suggestModal}
            toggle={Suggesttoggle}
            addToast={addToast}
            email={data?.project?.project_owner?.email}
          />
          <ProjectModal
            modal={Profilemodal}
            toggle={Projecttoggle}
            addToast={addToast}
            CategoryList={CategoryList}
            aboutRequiredFields={aboutRequiredFields}
            validateCategory={validateCategory}
            validateGenralDesc={validateGenralDesc}
            validateProjectType={validateProjectType}
            validateTitle={validateTitle}
            formData={formData}
            isLoading={isLoading}
            DefaultImage={DefaultImage}
            addToast={addToast}
            setPhoto={setPhoto}
            data={data}
            photo={photo}
            handleChange={handleChange}
            onSubmit={onSubmit}
            data={Object.keys(data).length > 0 ? data : ""}
          />
          <AddStepModal
            modal={addstepmodal}
            otherMaterial={otherMaterial}
            setotherMaterial={setotherMaterial}
            toggle={addStepToggle}
            stepformData={stepformData}
            stepType={stepType}
            setstepType={setstepType}
            material={material}
            handleStepChange={handleStepChange}
            onAddStepSubmit={onAddStepSubmit}
            isLoading={isLoading}
            materialList={materialList}
            onStepAdd={onStepAdd}
            skillfieldList={skillfieldList}
            tempstepId={tempstepId}
            data={data ? data.project.implementation_steps : ""}
            skillList={skillList}
            formDataSkillField={formDataSkillField}
            handleSkillChange={handleSkillChange}
            stepArrayData={stepArrayData}
            HandleStepDelete={HandleStepDelete}
            stepRequiredFields={stepRequiredFields}
            materialRequiredFields={materialRequiredFields}
            skillRequiredFields={skillRequiredFields}
            ValidateSkillField={ValidateSkillField}
            ValidateSkill={ValidateSkill}
            validateStatus={validateStatus}
            validateSpeciality={validateSpeciality}
            validateDescription={validateDescription}
            validateStepType={validateStepType}
            setFormDataSkillField={setFormDataSkillField}
            skillData={skillData}
            setMaterial={setMaterial}
            validateStepName={validateStepName}
            validateMaterial={validateMaterial}
            otherSKill={otherSKill}
            setotherSkill={setotherSkill}
            ValidateOtherSkill={ValidateOtherSkill}
            ValidateOtherMaterial={ValidateOtherMaterial}
          />
          <StepModal
            modal={stepmodal}
            toggle={Steptoggle}
            stepformData={stepformData}
            stepType={stepType}
            setstepType={setstepType}
            material={material}
            handleStepChange={handleStepChange}
            onSubmit={onStepSubmit}
            isLoading={isLoading}
            materialList={materialList}
            onStepAdd={onStepAdd}
            skillfieldList={skillfieldList}
            tempstepId={tempstepId}
            data={data ? data.project.implementation_steps : ""}
            skillList={skillList}
            formDataSkillField={formDataSkillField}
            handleSkillChange={handleSkillChange}
            ValidateSkillField={ValidateSkillField}
            ValidateSkill={ValidateSkill}
            validateStatus={validateStatus}
            validateSpeciality={validateSpeciality}
            validateDescription={validateDescription}
            validateStepType={validateStepType}
            validateStepName={validateStepName}
            stepRequiredFields={stepRequiredFields}
            skillRequiredFields={skillRequiredFields}
          />
          <Header notificationsData={notificationsData} />

          {/* start of api integrate */}
          {data ? (
            <div id="services" className="cardsProject">
              <div className="container ">
                <div className="row ">
                  <div
                    className=" col-lg-3 col-md-12 col-sm-12 col-xs-12 text-center"
                    style={{
                      background: "#f7f7f7",
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
                          data.project.general_photo == "default.png"
                            ? DefaultImage
                            : `${url}/views/uploads/${data.project.general_photo}`
                        }
                        alt="alternative"
                      />
                    </div>
                  </div>
                  <div className=" col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    <div style={{ background: "#f7f7f7", padding: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          background: "#f7f7f7",
                          justifyContent: "flex-end",

                          paddingRight: "10px",
                        }}
                      >
                        {getUser()._id === data.project.project_owner._id ? (
                          <div className="row buttonBox ">
                            <div>
                              <button
                                onClick={DeleteProject}
                                type="button"
                                className="btn btn-block"
                              >
                                Delete Projet
                              </button>
                            </div>

                            <div>
                              <button
                                type="button"
                                className="btn ml-3 btn-block"
                                onClick={Projecttoggle}
                              >
                                Modifier
                              </button>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <div className="projectSection1  text-left">
                          <div>
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
                            <div
                              style={{
                                display: "flex",
                                background: "#f7f7f7",
                                justifyContent: "space-between",
                              }}
                            >
                              <h4
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                {data.project.title}
                              </h4>

                              <p>
                                {like >= 1 ? (
                                  <i
                                    className="fas fa-heart "
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={ProjectunLike}
                                  />
                                ) : (
                                  <i
                                    className="fas fa-heart "
                                    onClick={() =>
                                      ProjectLike(data.project.likedBy)
                                    }
                                  />
                                )}
                                <span
                                  style={{
                                    marginTop: "-2rem",
                                    marginLeft: "0.5rem",
                                    fontFamily: "Arial, Helvetica, sans-serif",
                                  }}
                                >
                                  {data.project.likedBy.length + like}
                                </span>
                                {/* <span class="ml-2 " id="span2" >21%</span> */}
                              </p>
                            </div>
                            <p className="project-desc">
                              {data.project.general_description.substring(
                                0,
                                50
                              )}
                            </p>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              background: "#f7f7f7",
                              marginTop: "4rem",
                              justifyContent: "space-between",
                            }}
                          >
                            <p>
                              {data.project.address
                                ? data.project.address.city
                                : ""}{" "}
                              {`(${
                                data.project.address
                                  ? data.project.address.zipCode
                                  : ""
                              })`}
                            </p>

                            <p>
                              <img
                                src={AutorenewIcon}
                                style={{ height: "20px" }}
                              />
                              <span
                                style={{
                                  marginTop: "-2rem",
                                  marginLeft: "0.3rem",
                                  fontFamily: "Arial, Helvetica, sans-serif",
                                  // marginRight: "-17px",
                                }}
                              >
                                {parseInt(data.project.progress)}%
                              </span>
                              {/* <span class="ml-2 " id="span2" >21%</span> */}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row text-left"
                  style={{ marginTop: "1rem", marginLeft: "1rem" }}
                >
                  <div
                    className="col-lg-3 col-md-3 col-sm-12  userImageSection"
                    style={{ background: "#f7f7f7" }}
                  >
                    <div id="userImage">
                      <img
                        className="proj-img"
                        src={
                          data.project.project_owner.profile_picture ==
                          "default.png"
                            ? DefaultuserImage
                            : `${url}/views/uploads/${data.project.project_owner.profile_picture}`
                        }
                        alt="alternative"
                      />
                    </div>
                  </div>
                  <div className="text-left col-lg-5 col-md-7 col-sm-10 ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 0,
                      }}
                    >
                      <div id="userDetail">
                        <h5 className="ml-3 text-capitalize ">
                          <b>{data.project.project_owner.firstName}</b>
                        </h5>
                        <p style={{ marginTop: "1.5rem" }}>
                          <img src={Image46} style={{ height: "23px" }} />

                          <span className="ml-2">
                            {data.project.project_owner.phone}
                          </span>
                        </p>
                        <p style={{ marginTop: "1.5rem" }}>
                          <img src={Image47} style={{ height: "23px" }} />

                          <span className="ml-2">
                            {data.project.project_owner.email}
                          </span>
                        </p>
                      </div>
                      <div className="btnProfileSection">
                        <Link to={`/profile/${data.project.project_owner._id}`}>
                          <button
                            type="button"
                            id="ButtonUser"
                            className="btn  "
                          >
                            Voir le profil
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-2 col-sm-2"></div>
                {/* end of col */}
              </div>

              <div className="container">
                <div className="row" style={{ marginTop: "2rem" }}>
                  <div
                    className="col-lg-12  text-left  pt-1"
                    style={{
                      background: "#f7f7f7",
                      margin: "auto",
                      padding: "12px",
                      position: "relative",
                    }}
                  >
                    <div
                      className=" mainstepSection"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h4 className=" ml-3  ">ETAPES DE REALISATION</h4>
                      </div>
                      <div>
                        {getUser()._id === data.project.project_owner._id ? (
                          <button
                            type="button"
                            onClick={addStepToggle}
                            // id="userButton"
                            id="AddmodalButton"
                            style={
                              {
                                // marginTop: "0.7rem",
                                // marginLeft: "1rem",
                              }
                            }
                            className="btn block"
                          >
                            Add Step
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                {implementationstepData
                  ? implementationstepData.map((step) => (
                      <ImplementationStep
                        step={step}
                        paramID={params.id}
                        getUser={getUser}
                        DeleteStep={DeleteStep}
                        data={data}
                        DefaultImage={DefaultImage}
                        Steptoggle={Steptoggle}
                        ShowInterest={ShowInterest}
                        toggle={toggle}
                        CircularProgress={CircularProgress}
                        useStyles={useStyles}
                      />
                    ))
                  : ""}

                {/*  */}

                {/*  */}
                <div className="col-lg-6 text-left">
                  {getUser()._id === data.project.project_owner._id ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      className="btn mt-4 ml-2"
                      onClick={Suggesttoggle}
                    >
                      Suggest a new step
                    </button>
                  )}
                </div>
              </div>
              {/* end of row */}
              {/* end of row */}
              <div className="container">
                <div className="row" style={{ marginTop: "2rem" }}>
                  <div
                    className="col-lg-12 text-left  p-1"
                    style={{
                      background: "#f7f7f7",
                      margin: "auto",
                      position: "relative",
                    }}
                  >
                    <h4 className="mt-1 ml-3 " style={{ fontWeight: "bold" }}>
                      COMMENTAIRIES
                    </h4>
                  </div>
                </div>

                {commentArray.length > 0
                  ? commentArray.map((comment) => (
                      <CommentsFromDB
                        comment={comment}
                        data={data}
                        DefaultImage={DefaultImage}
                        DeleteComment={DeleteComment}
                        ClearOutlinedIcon={ClearOutlinedIcon}
                        getUser={getUser}
                      />
                    ))
                  : ""}
                {/* {tempcommentArray.length > 0
                  ? tempcommentArray.map((comment) => (
                      <Comments
                        comment={comment}
                        getUser={getUser}
                        data={data}
                        DefaultImage={DefaultImage}
                        DeleteComment={DeleteComment}
                        ClearOutlinedIcon={ClearOutlinedIcon}
                      />
                    ))
                  : ""} */}
              </div>
              {getUser()._id == data.project.project_owner._id ? (
                ""
              ) : (
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
                        onBlur={validateComment}
                      />
                      {commentError !== "" ? (
                        <p
                          className="error text-left"
                          style={{ marginLeft: "7rem" }}
                        >
                          {" "}
                          {commentError}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div style={{ width: "10%" }} className="text-center">
                      {isLoading === true ? (
                        <center>
                          <div className={useStyles.root}>
                            <CircularProgress disableShrink />
                          </div>
                        </center>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-block mt-4 ml-2"
                          style={{ maxWidth: "80%", padding: "6px 16px" }}
                          onClick={onAdd}
                        >
                          SEND
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <LoadedClients />
          )}

          {/* Footer */}
          <Footer />
        </div>
      );
    }
  } else {
    return <Redirect to="/Login" />;
  }
}
