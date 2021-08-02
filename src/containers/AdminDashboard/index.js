import React, { useState, useEffect } from "react";
import { Nav, Row, Col, Tab, Container } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { url } from "../../urlConfig";

import {
  signupskillRequired,
  editProfileRequired,
  editProfileData,
  signupstepData,
} from "../../shared/Data";
import Header from "../../Components/header";
import axios from "axios";
import ListOfUser from "../../Components/ListOfUser";
import ListOfProjects from "../../Components/listOfProjects";
import ListOfSkills from "../../Components/listOfSkills";
import ListOfMaterials from "../../Components/ListOfMaterials";
import ListOfCategories from "../../Components/ListOfCategories";

import EditSkillModal from "../../Components/UI/Modals/EditSkillModal";
import EditMaterialModal from "../../Components/UI/Modals/EditMaterialModal";
import EditCategoryModal from "../../Components/UI/Modals/EditCategoryModal";
import AddCategoryModal from "../../Components/UI/Modals/AddCategoryModal";

import AddSKillModal from "../../Components/UI/Modals/AddSKillModal";
import AddMaterialModal from "../../Components/UI/Modals/AddMaterialModal";
import DropDown from "../../shared/DropdownMenu";
import NotificationMenu from "../../shared/NotificationMenu";
import SkillsModal from "../../shared/SkillsModal";
export default function UserDashboard(props) {
  const { addToast } = useToasts();
  const { notificationsData } = props;
  // states start ************************************
  const [skillformData, setskillFormData] = useState(signupstepData);

  const [formData, setFormData] = useState({ skill: "", skillField: "" });
  const [editformData, seteditFormData] = useState({
    skill: "",
    skillField: "",
  });

  const [userdata, setuserData] = useState([]);
  const [projectdata, setprojectData] = useState([]);
  const [skillFieldList, setskillFieldList] = useState([]);

  const [ProjectdataList, setProjectdataList] = useState([]);
  const [profilemodal, setprofileModal] = useState(false);
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [photo, setPhoto] = useState("");
  const [editcheck, seteditcheck] = useState(false);

  const [skillArrayData, setskillArrayData] = useState([]);

  const [editskillArrayData, seteditskillArrayData] = useState("");

  const [materialArrayData, setmaterialArrayData] = useState([]);
  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    skill: "",
    skillField: "",
    error: "",
    editSkillField: "",
    editSkill: "",
  });
  const [materialRequiredFields, setmaterialRequiredFields] = useState({
    name: "",
    addcategory: "",
    error: "",
    editname: "",
    color: "",
    editcategory: "",
    editcolor: "",
  });
  const [categoryRequiredFields, setcategoryRequiredFields] = useState({
    category: "",
    color: "",
  });
  const [skillRequiredFields, setskillRequiredFields] =
    useState(signupskillRequired);
  const [materialList, setMaterialList] = useState([]);
  const [skillList, setskillList] = useState("");
  const [material, setMaterial] = useState("");
  const [addcategory, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [categoryData, setCategoryData] = useState({ category: "", color: "" });

  const [editcategory, seteditCategory] = useState("");
  const [editcolor, seteditColor] = useState("");

  const [editmaterial, seteditMaterial] = useState("");

  const [editskill, seteditskill] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [CategoryList, setCategoryList] = useState("");
  const [key, setKey] = useState("first");
  const [invitationData, setinvitationData] = useState("");
  const [editskillmodal, seteditskillmodal] = useState(false);
  const [addcategorymodal, setaddcategorymodal] = useState(false);

  const [addskillmodal, setaddskillmodal] = useState(false);
  const [materialmodal, setmaterialmodal] = useState(false);
  const [editmaterialmodal, seteditmaterialmodal] = useState(false);
  const [editcategorymodal, seteditcategorymodal] = useState(false);

  const [skillFieldId, setskillFieldId] = useState("");
  const [materialId, setmaterialId] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [index, setIndex] = useState("");

  // functions

  const handleCategoryChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };
  const handleEditCategory = (e) => {
    seteditCategory(e.target.value);
  };
  const handleEditColor = (e) => {
    seteditColor(e.target.value);
  };
  const HandleEditSkill = (e) => {
    seteditskill(e.target.value);
  };
  const UpdateSkill = () => {
    seteditcheck(!editcheck);

    editformData.skill.splice(index, 1, editskill);

    // seteditskill("");
  };
  const AddEditSkill = (e) => {
    // alert("hello");
  };
  const AddCategorySubmit = (e) => {
    setisLoading(true);
    const check = checkValidateForm();
    if (check == true) {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      try {
        axios
          .post(
            `${url}/api/v1/admin/create-category`,
            { name: categoryData.category, color: categoryData.color },
            headers
          )
          .then((res) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);

            addToast("Category added successfully", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            const msg = "";
            setmaterialRequiredFields({
              ...materialRequiredFields,
              error: msg,
            });
            setaddcategorymodal(!addcategorymodal);
            setMaterial("");
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
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1500);
    }
  };
  const EditCategorySubmit = (e) => {
    setisLoading(true);
    const check = ValidateEditCategory();
    const check1 = ValidateEditColor();

    if (check == true && check1 == true) {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      try {
        axios
          .post(
            `${url}/api/v1/admin/edit-category?id=${categoryId}`,
            { name: editcategory, color: editcolor },
            headers
          )
          .then((res) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);

            addToast("Category updated successfully", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
            const msg = "";
            setmaterialRequiredFields({
              ...materialRequiredFields,
              error: msg,
            });
            seteditcategorymodal(!editcategorymodal);
            setMaterial("");
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
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1500);
    }
  };

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
            `${url}/api/v1/admin/create-material`,
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
      }
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1500);
    }
  };
  const EditMaterialSubmit = () => {
    setisLoading(true);
    const check = ValidateEditMaterial();

    if (check == true) {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      try {
        axios
          .post(
            `${url}/api/v1/admin/edit-material?id=${materialId}`,
            { name: editmaterial },
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
            seteditmaterialmodal(!editmaterialmodal);
            setMaterial("");
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
  const handleEditMaterial = (e) => {
    seteditMaterial(e.target.value);
  };
  const EditCategoryToggle = (categoryId) => {
    if (editcategorymodal === false) {
      const fill = CategoryList.filter((cat) => cat._id === categoryId);
      seteditCategory(fill[0].name);
      seteditColor(fill[0].color);

      setcategoryId(categoryId);
    }
    seteditcategorymodal(!editcategorymodal);
  };

  const AddCategoryToggle = () => {
    setCategory("");
    setColor("");
    setmaterialRequiredFields({
      name: "",
      addcategory: "",
      error: "",
      editname: "",
      color: "",
      editcategory: "",
      editcolor: "",
    });
    setaddcategorymodal(!addcategorymodal);
  };

  const MaterialToggle = () => {
    setMaterial("");
    setmaterialmodal(!materialmodal);
  };
  const EditMaterialToggle = (materialId) => {
    if (editmaterialmodal === false) {
      const filter = materialList.filter((dt) => dt._id === materialId);

      seteditMaterial(filter[0].name);
      setmaterialId(materialId);
    }
    seteditmaterialmodal(!editmaterialmodal);
  };

  const EditSkillSubmit = () => {
    setisLoading(true);
    ValidateSkillField();

    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(
          `${url}/api/v1/admin/edit-skillField?id=${skillFieldId}`,
          {
            skillField: editformData.skillField,
            skills: editformData.skill,
          },
          headers
        )
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          seteditskillmodal(!editskillmodal);
          addToast("skill updated successfully", {
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
          const array = [];
          array.push(formData.skill);
          setskillArrayData((prevState) => [...prevState, formData.skill]);
          setFormData({ ...formData, ["skill"]: "" });
        } else {
        }
      }
    }
  };

  const AddSkillSubmit = () => {
    setisLoading(true);
    const check = ValidateSkillField();

    if (skillArrayData.length > 0) {
      if (check === true) {
        const headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        };
        try {
          axios
            .post(
              `${url}/api/v1/admin/create-skillField`,
              { skillField: formData.skillField, skills: skillArrayData },
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
              setskillArrayData("");
              setFormData({ ...formData, ["skillField"]: "" });
              setaddskillmodal(!addskillmodal);
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
      } else {
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
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
    // alert(skillId);

    if (editskillmodal === false) {
      const filter = skillFieldList.filter((skill) => skill._id == skillId);
      seteditskillArrayData(filter[0]);
      const obj = {
        skillField: filter[0].skillField,
        skill: filter[0].skill,
      };
      seteditFormData(obj);
      setskillFieldId(skillId);
    }

    seteditskillmodal(!editskillmodal);
  };
  const Addtoggle = () => {
    setFormData({
      skill: "",
      skillField: "",
    });
    setaddskillmodal(!addskillmodal);
  };
  const handleChange = (e) => {
    let value = e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleChangeEdit = (e) => {
    let value = e.target.value;

    seteditFormData({ ...editformData, [e.target.name]: value });
  };
  // *******************
  // Validations
  const checkValidateForm = () => {
    let obj = {};
    let reqFields = true;

    Object.keys(categoryData).map((key) => {
      if (categoryData[key] === "") {
        obj[key] = "Required";
        reqFields = false;
      }
      return obj;
    });

    setcategoryRequiredFields(obj);
    if (!reqFields) {
      const msg = "Required";
      return false;
    } else {
      return true;
    }
  };
  const ValidateCategory = () => {
    if (categoryData.category === "" || !categoryData.category) {
      const msg = "Required";
      setcategoryRequiredFields({
        ...categoryRequiredFields,
        category: msg,
      });
      return false;
    } else {
      const msg = "";
      setcategoryRequiredFields({
        ...categoryRequiredFields,
        category: msg,
      });
      return true;
    }
  };

  const ValidateColor = () => {
    if (!categoryData.color) {
      const msg = "Required";
      setcategoryRequiredFields({
        ...categoryRequiredFields,
        color: msg,
      });
      return false;
    } else {
      const msg = "";
      setcategoryRequiredFields({
        ...categoryRequiredFields,
        color: msg,
      });
      return true;
    }
  };
  const ValidateEditCategory = () => {
    if (!editcategory) {
      const msg = "Required";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        editcategory: msg,
        error: "",
      });
      return false;
    } else {
      const msg = "";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        editcategory: msg,
        error: msg,
      });

      return true;
    }
  };
  const ValidateEditColor = () => {
    if (!editcolor) {
      const msg = "Required";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        editcolor: msg,
        error: "",
      });
      return false;
    } else {
      const msg = "";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        editcolor: msg,
        error: msg,
      });

      return true;
    }
  };

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
  const ValidateEditMaterial = () => {
    if (!editmaterial) {
      const msg = "Required";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        editname: msg,
      });
      return false;
    } else {
      const msg = "";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        editname: msg,
        error: msg,
      });

      return true;
    }
  };
  const ValidateEditSkillField = () => {
    if (!editformData.skillField) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        editSkillField: msg,
      });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        editSkillField: msg,
      });

      return true;
    }
  };
  const ValidateEditSkill = () => {
    if (!editskill) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        editSkill: msg,
      });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        editSkill: msg,
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
        .get(`${url}/api/v1/auth/materialList`)
        .then((res) => {
          setMaterialList(res.data.materials);
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {}

    try {
      axios
        .get(`${url}/api/v1/auth/skillList`)
        .then((res) => {
          setskillFieldList(res.data.skills);
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {}
    try {
      axios
        .get(`${url}/api/v1/auth/categoryList`)
        .then((res) => {
          setCategoryList(res.data.category);
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {}

    try {
      axios
        .get(`${url}/api/v1/admin/userslist`, headers)
        .then((res) => {
          const filter = res.data.users.filter((dt) => dt.role !== "admin");
          setuserData(filter);
        })
        .catch((err) => {});
    } catch (error) {}

    // fecth all projects
    try {
      axios
        .get(`${url}/api/v1/admin/projectslist`, headers)
        .then((res) => {
          setprojectData(res.data.projects);
        })
        .catch((err) => {});
    } catch (error) {}
  }, [
    key,
    addcategorymodal,
    materialmodal,
    editcategorymodal,
    editmaterialmodal,
    editskillmodal,
    addskillmodal,
  ]);

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
        .post(`${url}/api/v1/admin/delete-user?id=${id}`, {}, headers)
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
        .post(`${url}/api/v1/admin//delete-project?id=${id}`, {}, headers)
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
        .post(`${url}/api/v1/admin/delete-material?id=${id}`, {}, headers)
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
        .post(`${url}/api/v1/admin/delete-skillField?id=${id}`, {}, headers)
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
  };
  const DeleteCategory = (id) => {
    setisLoading(true);
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .post(`${url}/api/v1/admin/delete-category?id=${id}`, {}, headers)
        .then((res) => {
          setTimeout(() => {
            setisLoading(false);
          }, 2000);
          const filter = CategoryList.filter((dt) => dt._id !== id);
          setCategoryList(filter);
          addToast("Category has been deleted Successfully", {
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
  };
  // ****
  // Edit Skill

  // show skills
  const [showsSkills, setShowsSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const seeSkills = (id) => {
    const userData = userdata.filter((x) => x._id === id);
    setShowsSkills(true);
    setSkills(userData[0].skills);
  };
  return (
    <div>
      <SkillsModal data={skills} show={showsSkills} setShow={setShowsSkills} />
      <Header data={notificationsData} />
      <EditSkillModal
        modal={editskillmodal}
        toggle={Edittoggle}
        isLoading={isLoading}
        editformData={editformData}
        aboutRequiredFields={aboutRequiredFields}
        ValidateSkill={ValidateSkill}
        ValidateSkillField={ValidateSkillField}
        EditSkillSubmit={EditSkillSubmit}
        AddSkill={AddSkill}
        AddSkillSubmit={AddSkillSubmit}
        handleChangeEdit={handleChangeEdit}
        editskillArrayData={editskillArrayData}
        seteditFormData={seteditFormData}
        ValidateEditSkillField={ValidateEditSkillField}
        seteditskillArrayData={seteditskillArrayData}
        skillFieldList={skillFieldList}
        ValidateEditSkill={ValidateEditSkill}
        HandleEditSkill={HandleEditSkill}
        AddEditSkill={AddEditSkill}
        editskill={editskill}
        seteditskill={seteditskill}
        editcheck={editcheck}
        seteditcheck={seteditcheck}
        UpdateSkill={UpdateSkill}
        setIndex={setIndex}
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
      <EditMaterialModal
        modal={editmaterialmodal}
        toggle={EditMaterialToggle}
        isLoading={isLoading}
        handleMaterial={handleEditMaterial}
        materialRequiredFields={materialRequiredFields}
        ValidateMaterial={ValidateEditMaterial}
        material={editmaterial}
        AddMaterialSubmit={EditMaterialSubmit}
      />
      <EditCategoryModal
        modal={editcategorymodal}
        toggle={EditCategoryToggle}
        isLoading={isLoading}
        handleEditCategory={handleEditCategory}
        materialRequiredFields={materialRequiredFields}
        ValidateEditCategory={ValidateEditCategory}
        editcategory={editcategory}
        EditCategorySubmit={EditCategorySubmit}
        handleEditColor={handleEditColor}
        editcolor={editcolor}
        ValidateEditColor={ValidateEditColor}
      />
      <AddCategoryModal
        modal={addcategorymodal}
        toggle={AddCategoryToggle}
        isLoading={isLoading}
        categoryRequiredFields={categoryRequiredFields}
        ValidateCategory={ValidateCategory}
        AddCategorySubmit={AddCategorySubmit}
        handleCategoryChange={handleCategoryChange}
        ValidateColor={ValidateColor}
        categoryData={categoryData}
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
                    className="btn btn-primary text-white  "
                  >
                    Add Skill
                  </button>
                ) : key == "fourth" ? (
                  <button
                    onClick={MaterialToggle}
                    type="button"
                    id="modalButton1"
                    className="btn btn-primary text-white  "
                  >
                    Add Material
                  </button>
                ) : key == "fifth" ? (
                  <button
                    onClick={AddCategoryToggle}
                    type="button"
                    id="modalButton1"
                    className="btn btn-primary text-white  "
                  >
                    Add Category
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
                      <Nav.Item>
                        <Nav.Link eventKey="fifth"> Category List </Nav.Link>
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
                          seeSkills={seeSkills}
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
                          Edittoggle={EditMaterialToggle}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        <ListOfCategories
                          addToast={addToast}
                          CategoryList={CategoryList}
                          DeleteCategory={DeleteCategory}
                          EditCategoryToggle={EditCategoryToggle}
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
