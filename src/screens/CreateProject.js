import React, { useState, useEffect } from "react";
import "../Theme/css/main.css";
import axios from "axios";
import Form from "../Components/ProjectForm";
import { useToasts } from "react-toast-notifications";
import {
  projectData,
  projectstepData,
  projectskillData,
  projectcityData,
  projectaboutRequired,
  projectstepRequired,
  projectskillRequired,
} from "../shared/Data";
function CreateProject() {
  const { addToast } = useToasts();
  // formdata  states
  const [formData, setFormData] = useState(projectData);
  const [stepformData, setstepFormData] = useState(projectstepData);
  const [formDataSkillField, setFormDataSkillField] = useState(
    projectskillData
  );
  const [formDataCity, setFormDataCity] = useState(projectcityData);
  // ********

  // list states
  const [items, setItems] = useState([]);
  const [CategoryList, setCategoryList] = useState("");
  const [materialList, setMaterialList] = useState("");
  const [skillfieldList, setskillFieldList] = useState("");
  const [skillList, setskillList] = useState("");
  // ************

  // array data states
  const [materialArrayData, setmaterialArrayData] = useState([]);
  const [stepArrayData, setstepArrayData] = useState([]);
  // ************

  // Single Statess
  const [address, setAddress] = useState("");
  const [material, setMaterial] = useState("");
  const [stepType, setstepType] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [otherSKill, setotherSkill] = useState("");

  // **********

  // Required Fields States
  const [aboutRequiredFields, setAboutRequiredFields] = useState(
    projectaboutRequired
  );
  const [stepRequiredFields, setstepRequiredFields] = useState(
    projectstepRequired
  );
  const [skillRequiredFields, setskillRequiredFields] = useState(
    projectskillRequired
  );
  // *************

  // validation start
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
  const validateStepType = () => {
    if (stepType) {
      const msg = "";

      setstepRequiredFields({ ...stepRequiredFields, stepType: msg });

      return true;
    } else if (!stepType) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, stepType: msg });
      return false;
    }
  };
  const validateMaterial = () => {
    if (material) {
      const msg = "";
      setstepRequiredFields({ ...stepRequiredFields, material: msg });

      return true;
    } else if (!material) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, material: msg });
      return false;
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
    if (stepformData.status) {
      setstepRequiredFields({ ...stepRequiredFields, status: "" });

      return true;
    } else if (!stepformData.status) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, status: msg });
      return false;
    }
  };
  const validateGenralDesc = () => {
    if (formData.general_description) {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        general_description: msg,
      });

      return true;
    } else if (!formData.general_description) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        general_description: msg,
      });
      return false;
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
  const validatePhoto = (file) => {
    if (file) {
      const msg = "";

      setAboutRequiredFields({ ...aboutRequiredFields, general_photo: msg });

      return true;
    } else if (!file) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, general_photo: msg });
      return false;
    }
  };
  const validateCity = () => {
    if (formDataCity.city) {
      const msg = "";

      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    } else if (!formDataCity.city) {
      let msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    }
  };

  const validateCategory = () => {
    if (formData.category) {
      setAboutRequiredFields({ ...aboutRequiredFields, category: "" });

      return true;
    } else if (!formData.category) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, category: msg });
      return false;
    }
  };

  const validateTitle = () => {
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(formData.title);
    if (formData.title.length >= 4 && formData.title.length < 20) {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      setFormData({ ...formData, title: formData.title.trim() });
      return true;
    } else if (formData.title.trim() && !isValid) {
      const msg = "Title should not contain any digit or special characters";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      return false;
    } else if (formData.title.trim().length < 5) {
      const msg = "Title needs to be at least 5 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      return false;
    } else if (formData.title.trim().length > 20) {
      const msg = "Title needs to be less than  20 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      return false;
    } else if (!formData.title.length) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      return false;
    }
  };
  const validateStepName = () => {
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
      stepformData.name.trim()
    );
    if (stepformData.name.length >= 4 && stepformData.name.length < 20) {
      const msg = "";

      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      setstepFormData({ ...stepformData, name: stepformData.name.trim() });
      return true;
    } else if (stepformData.name.trim() && !isValid) {
      const msg = "Name should not contain any digit or special characters";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      return false;
    } else if (stepformData.name.trim().length > 20) {
      const msg = "Name needs to be less than  20 characters long";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      return false;
    } else if (!stepformData.name.length) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      return false;
    }
  };

  const validateDescription = () => {
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
      stepformData.description.trim()
    );
    if (
      stepformData.description.length >= 4 &&
      stepformData.description.length < 150
    ) {
      setstepRequiredFields({ ...stepRequiredFields, description: "" });
      setstepFormData({
        ...stepformData,
        description: stepformData.description.trim(),
      });
      return true;
    } else if (stepformData.description.trim() && !isValid) {
      const msg =
        "description should not contain any digit or special characters";
      setstepRequiredFields({ ...stepRequiredFields, description: msg });
      return false;
    } else if (stepformData.description.trim().length > 150) {
      const msg = "description needs to be less than 150 characters";
      setstepRequiredFields({ ...stepRequiredFields, description: msg });
      return false;
    } else if (!stepformData.description.length) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, description: msg });
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
    if (!reqFields || stepType === "") {
      obj.stepType = "Required";
      setstepRequiredFields(obj);
      return false;
    } else {
      setstepRequiredFields(projectstepRequired);

      return true;
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
    // debugger;
    if (!reqFields) {
      if (otherSKill !== "") {
        obj.skill = "";
        setstepRequiredFields(obj);
        return false;
      } else {
        obj.speciality = "";

        setstepRequiredFields(obj);
      }
      // console.log(obj, "validate 2 check");

      return false;
    } else {
      setskillRequiredFields(projectskillRequired);

      return true;
    }
  };

  // validation end************************************

  // useEffect
  useEffect(() => {
    const headers = {
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
    try {
      axios
        .get("http://localhost:3000/api/v1/auth/categoryList")
        .then((res) => {
          setCategoryList(res.data.category);
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }
  }, [stepType]);
  // useEffect end *********************
  // get set address

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
        setAboutRequiredFields({ ...aboutRequiredFields, address: msg });
        var addressToSet = [];
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
      .catch((error) => {});
  };
  const SetAddress = (item) => {
    setAddress(item);
    for (let i = 0; i < items.length; i++) {
      if (items[i].label === item) {
        var city = items[i].city;
        var zipCode = items[i].PostalCode;
        var lat = items[i].lat.toString();
        var lng = items[i].lng.toString();

        setFormDataCity({
          zipCode: zipCode,
          city: city,
          latitude: lat,
          longitude: lng,
        });
        setFormData({
          title: formData.title,
          type: formData.type,
          general_photo: formData.general_photo,
          general_description: formData.general_description,
          category: formData.category,
        });
      }
    }
  };

  // get set adress end

  // handle change
  const handleChange = (e) => {
    let value = e.target.value;
    switch (e.target.name) {
      case "title":
        validateTitle();
        break;
      case "type":
        validateProjectType();
        break;
      case "address":
        validateCity();
        break;

      case "general_description":
        validateGenralDesc();
        break;
      case "category":
        validateCategory();
        break;
      default:
        break;
    }
    setFormData({ ...formData, [e.target.name]: value });
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
      setFormDataSkillField({
        ...formDataSkillField,
        [e.target.name]: e.target.value,
      });
    }
    switch (e.target.name) {
      case "skillField":
        ValidateSkillField();
        break;
      case "skill":
        ValidateSkill();
        break;

      case "status":
        validateStatus();
        break;

      default:
        break;
    }
  };
  const handleStepChange = async (e) => {
    let value = e.target.value;
    if (e.target.name === "material") {
      setMaterial(e.target.value);
    }
    switch (e.target.name) {
      case "name":
        validateStepName();
        break;
      case "skillField":
        validateStepType();
        break;
      case "material":
        validateMaterial();
        break;
      case "description":
        validateDescription();
        break;
      case "status":
        validateStatus();
        break;
      case "speciality":
        validateSpeciality();
        break;

      default:
        break;
    }
    setstepFormData({ ...stepformData, [e.target.name]: value });
  };
  // handle change end ******************

  // Add Functions start
  const onAdd = () => {
    if (otherSKill !== "") {
      formDataSkillField.skill = otherSKill;
    }
    if (stepType !== "") {
      checkValidateForm3();
    }
    checkValidateForm2();

    const check = Object.values(stepformData).map((obj) => {
      if (obj !== "") {
        return true;
      } else {
        return false;
      }
    });
    // console.log(check[0], "check on Add");
    if (check[0] === true) {
      const formObj = Object.values(formDataSkillField).map((obj) => {
        if (obj !== "") {
          return true;
        } else {
          return false;
        }
      });
      if (formObj[0] === true && formObj[2] === true) {
        const skills = {};
        skills.speciality = formDataSkillField.speciality;
        skills.skill = formDataSkillField.skill;
        skills.skillField = formDataSkillField.skillField;
        stepformData.skills = skills;
        setstepArrayData((prevState) => [...prevState, stepformData]);
        setstepFormData(projectstepData);
        setFormDataSkillField(projectskillData);
        setstepType("");
      } else if (material !== "") {
        stepformData.material = material;
        setstepArrayData((prevState) => [...prevState, stepformData]);
        setstepFormData(projectstepData);
        setFormDataSkillField(projectskillData);
        setstepType("");
      } else {
        addToast(`Please add All step fields`, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 1000,
        });
      }
    }
  };
  console.log(stepArrayData, "stepArrayData");
  // onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    checkValidateForm();
    console.log(photo, "photo");
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("type", formData.type);
    newFormData.append("general_photo", photo);
    newFormData.append("general_description", formData.general_description);
    newFormData.append("category", formData.category);
    newFormData.append("address", JSON.stringify(formDataCity));
    newFormData.append("implementation_steps", JSON.stringify(stepArrayData));
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          "http://localhost:3000/api/v1/project/CreateProject",
          newFormData,
          headers
        )
        .then((response) => {
          setisLoading(false);
          setFormData(projectData);
          setPhoto("");
          setAddress("");
          addToast(`Project created Successfully`, {
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
        });
    } catch (error) {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  };
  // *****************
  return (
    <div className="main">
      <div className="containerProject">
        <Form
          // validator
          validateStepName={validateStepName}
          validateTitle={validateTitle}
          validateStatus={validateStatus}
          validateSpeciality={validateSpeciality}
          validateDescription={validateDescription}
          validateStepType={validateStepType}
          validateCity={validateCity}
          validateCategory={validateCategory}
          validateGenralDesc={validateGenralDesc}
          validateProjectType={validateProjectType}
          validatePhoto={validatePhoto}
          validateMaterial={validateMaterial}
          ValidateSkillField={ValidateSkillField}
          ValidateSkill={ValidateSkill}
          ValidateOtherSkill={ValidateOtherSkill}
          // ***********
          // Required Fields
          stepRequiredFields={stepRequiredFields}
          aboutRequiredFields={aboutRequiredFields}
          skillRequiredFields={skillRequiredFields}
          // Array Data
          formData={formData}
          materialArrayData={materialArrayData}
          setmaterialArrayData={setmaterialArrayData}
          stepArrayData={stepArrayData}
          // *************
          items={items}
          CategoryList={CategoryList}
          formDataCity={formDataCity}
          stepformData={stepformData}
          // on chnage
          handleStepChange={handleStepChange}
          handleChange={handleChange}
          handleSkillChange={handleSkillChange}
          // **********
          // list
          materialList={materialList}
          skillfieldList={skillfieldList}
          skillList={skillList}
          // ***********
          address={address}
          formDataSkillField={formDataSkillField}
          setMaterial={setMaterial}
          material={material}
          stepType={stepType}
          setstepType={setstepType}
          getAddress={getAddress}
          SetAddress={SetAddress}
          setPhoto={setPhoto}
          isLoading={isLoading}
          otherSKill={otherSKill}
          setotherSkill={setotherSkill}
          // *******
          // Actions
          onAdd={onAdd}
          onSubmit={onSubmit}
          //*** */
        />
      </div>
    </div>
  );
}

export default CreateProject;
