import React, { useState, useEffect } from "react";
import "../../Components/UI/Theme/css/main.css";
import axios from "axios";
import Form from "./components/ProjectForm";
import { useToasts } from "react-toast-notifications";
import {
  projectData,
  projectstepData,
  projectskillData,
  projectcityData,
  projectaboutRequired,
  projectstepRequired,
  projectskillRequired,
  cityaboutRequired,
} from "../../shared/Data";
import { useHistory, useParams } from "react-router-dom";
import { url } from "../../urlConfig";

function CreateProject() {
  const { addToast } = useToasts();
  const history = useHistory();

  // formdata  states
  const [formData, setFormData] = useState(projectData);
  const [stepformData, setstepFormData] = useState(projectstepData);
  const [formDataSkillField, setFormDataSkillField] =
    useState(projectskillData);
  const [formDataCity, setFormDataCity] = useState(projectcityData);
  // ********

  // list states
  const [items, setItems] = useState([]);
  const [skillFieldItems, setskillFieldItems] = useState([]);
  const [skillField, setskillField] = useState("");

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
  const [otherMaterial, setotherMaterial] = useState("");

  // **********

  // Required Fields States
  const [aboutRequiredFields, setAboutRequiredFields] =
    useState(projectaboutRequired);
  const [stepRequiredFields, setstepRequiredFields] =
    useState(projectstepRequired);
  const [skillRequiredFields, setskillRequiredFields] =
    useState(projectskillRequired);
  const [cityRequiredFields, setcityRequiredFields] =
    useState(cityaboutRequired);
  const [materialRequiredFields, setmaterialRequiredFields] = useState({
    name: "",
    error: "",
    otherMaterial: "",
  });
  // *************

  // validation start
  const ValidateSkillField = () => {
    // alert(skillformData.skillField);
    if (skillField === "") {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return true;
    } else if (!formDataSkillField.skillField) {
      let msg = "Please select your skill from list";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return false;
    } else {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
      return true;
    }
  };
  const ValidateOtherMaterial = () => {
    if (!otherMaterial) {
      const msg = "Required";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        otherMaterial: msg,
      });
      return false;
    } else {
      const msg = "";
      setmaterialRequiredFields({
        ...materialRequiredFields,
        otherMaterial: msg,
      });
      return true;
    }
  };
  const ValidateSkill = () => {
    if (!formDataSkillField.skill) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, skill: msg });
      return false;
    } else {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, skill: msg });
      return true;
    }
  };
  const ValidateOtherSkill = () => {
    if (!otherSKill) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, otherSKill: msg });
      return false;
    } else {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, otherSKill: msg });
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
  const validateSpeciality = () => {
    if (!formDataSkillField.speciality) {
      const msg = "Required";
      setskillRequiredFields({ ...skillRequiredFields, speciality: msg });
      return false;
    } else {
      const msg = "";
      setskillRequiredFields({ ...skillRequiredFields, speciality: msg });

      return true;
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
  const validateCity = () => {
    // ""
    if (address === "") {
      let msg = "Required";
      setcityRequiredFields({ ...cityRequiredFields, city: msg });

      return false;
    } else if (!formDataCity.city) {
      let msg = "Please select your complete address from list";
      setcityRequiredFields({ ...cityRequiredFields, city: msg });
      return false;
    } else {
      const msg = "";
      setcityRequiredFields({ ...cityRequiredFields, city: msg });
      return true;
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
  const validateStepName = () => {
    if (!stepformData.name.length) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      return false;
    } else if (stepformData && stepformData.name.length > 150) {
      const msg =
        "Step Name needs to be less than or equal to 150 characters long";
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
    } else if (stepformData && stepformData.description.length > 150) {
      const msg =
        "Step description needs to be less than or equal to 150 characters long";
      setstepRequiredFields({ ...stepRequiredFields, description: msg });
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
  const checkValidateForm = () => {
    let obj = {};
    let reqFields = true;
    Object.keys(formData).map((key) => {
      if (formData[key] === "") {
        if (key === "general_photo") {
          obj[key] = "";
        } else {
          obj[key] = "Required";
          reqFields = false;
        }
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
  // console.log(aboutRequiredFields, "obj");
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
  const checkValidateForm3 = () => {
    let obj = {};
    let reqFields = true;
    const vos = ValidateOtherSkill();
    Object.keys(formDataSkillField).map((key) => {
      if (formDataSkillField[key] === "") {
        obj[key] = "Required";
        reqFields = false;
      }
      return obj;
    });

    if (stepArrayData.length >= 0) {
      if (!reqFields || !vos) {
        setskillRequiredFields(obj);
        if (formDataSkillField.skill === "Other") {
          if (otherSKill !== "") {
            obj.skill = "";
            setskillRequiredFields(obj);
            return false;
          } else if (otherSKill == "") {
            obj.otherSKill = "Required";
            setskillRequiredFields(obj);
            return false;
          } else {
            setskillRequiredFields(projectskillRequired);

            return true;
          }
        } else if (formDataSkillField.skill !== "Other") {
          if (!reqFields) {
            setskillRequiredFields(obj);
            return false;
          } else {
            setskillRequiredFields(projectskillRequired);

            return true;
          }
        } else {
          setskillRequiredFields(projectskillRequired);

          return true;
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
    try {
      axios
        .get(`${url}/api/v1/auth/categoryList`)
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
        setFormDataSkillField({
          ...formDataSkillField,
          ["skillField"]: _id,
        });
      }
    }
    skillfieldList.map((skill) =>
      skill._id === _id ? setskillList(skill.skill) : ""
    );
  };
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
    const check = validateCity();

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
    if (check == true) {
      const msg = "";
      setcityRequiredFields({ ...cityRequiredFields, city: msg });
    }
  };
  // get set adress end

  // handle change
  const handleChange = (e) => {
    let value = e.target.value;

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
  };
  const handleStepChange = async (e) => {
    let value = e.target.value;

    setstepFormData({ ...stepformData, [e.target.name]: value });
  };
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
  // handle change end ******************

  // Add Functions start
  const HandleStepDelete = (chipToDelete) => {
    // alert(chipToDelete);
    const ChipsArray = stepArrayData.filter(
      (chip) => chip.name !== chipToDelete
    );
    setstepArrayData(ChipsArray);
  };
  const onAdd = () => {
    // ""
    const stepCheck = checkValidateForm2();

    if (stepType !== "") {
      var stepCheck2 = checkValidateForm3();

      if (stepType === "Field") {
        if (formDataSkillField.skill == "Other") {
          if (otherSKill !== "") {
            formDataSkillField.skill = otherSKill;
          }
        }
      } else {
        if (material == "Other") {
          ValidateOtherMaterial();
        } else {
          validateMaterial();
        }
      }
    }

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
      // ""
      if (stepArrayData && stepArrayData.length > 0) {
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
            skills.intentions = formDataSkillField.intentions;
            stepformData.skills = skills;
            setstepArrayData((prevState) => [...prevState, stepformData]);
            setstepFormData(projectstepData);
            setFormDataSkillField(projectskillData);
            setstepType("");
          } else if (material !== "" && stepCheck === true) {
            if (material == "Other") {
              if (otherMaterial !== "") {
                stepformData.materialName = otherMaterial;
                stepformData.material = "";
                setstepArrayData((prevState) => [...prevState, stepformData]);
                setstepFormData(projectstepData);
                setFormDataSkillField(projectskillData);
                setstepType("");
                setMaterial("");
                setotherMaterial("");
              }
            } else {
              stepformData.material = material;
              setstepArrayData((prevState) => [...prevState, stepformData]);
              setstepFormData(projectstepData);
              setFormDataSkillField(projectskillData);
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
          skills.intentions = formDataSkillField.intentions;
          stepformData.skills = skills;
          setstepArrayData((prevState) => [...prevState, stepformData]);
          setstepFormData(projectstepData);
          setFormDataSkillField(projectskillData);
          setstepType("");
        } else if (material !== "" && stepCheck === true) {
          if (material == "Other") {
            if (otherMaterial !== "") {
              stepformData.materialName = otherMaterial;
              stepformData.material = "";

              setstepArrayData((prevState) => [...prevState, stepformData]);
              setstepFormData(projectstepData);
              setFormDataSkillField(projectskillData);
              setstepType("");
              setMaterial("");
              setotherMaterial("");
            }
          } else {
            stepformData.material = material;
            setstepArrayData((prevState) => [...prevState, stepformData]);
            setstepFormData(projectstepData);
            setFormDataSkillField(projectskillData);
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
  // onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    checkValidateForm();

    validateCity();

    // validateCity();
    setstepRequiredFields(projectstepRequired);
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
      let response = await axios.post(
        `${url}/api/v1/project/CreateProject`,
        newFormData,
        headers
      );
      setisLoading(false);
      setFormData(projectData);
      setPhoto("");
      setFormDataCity(projectcityData);
      setstepArrayData([]);
      setAddress("");
      history.push("ProjectList");
      addToast(response.data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
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
          validateMaterial={validateMaterial}
          ValidateSkillField={ValidateSkillField}
          ValidateSkill={ValidateSkill}
          ValidateOtherSkill={ValidateOtherSkill}
          ValidateOtherMaterial={ValidateOtherMaterial}
          addToast={addToast}
          skillFieldItems={skillFieldItems}
          // ***********
          // Required Fields
          stepRequiredFields={stepRequiredFields}
          aboutRequiredFields={aboutRequiredFields}
          skillRequiredFields={skillRequiredFields}
          cityRequiredFields={cityRequiredFields}
          materialRequiredFields={materialRequiredFields}
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
          getSkillField={getSkillField}
          SetSkillFieldAddress={SetSkillFieldAddress}
          skillField={skillField}
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
          setotherMaterial={setotherMaterial}
          otherMaterial={otherMaterial}
          stepType={stepType}
          setstepType={setstepType}
          getAddress={getAddress}
          SetAddress={SetAddress}
          setPhoto={setPhoto}
          isLoading={isLoading}
          otherSKill={otherSKill}
          setotherSkill={setotherSkill}
          projectskillData={projectskillData}
          setFormDataSkillField={setFormDataSkillField}
          setMaterial={setMaterial}
          onMaterialChange={onMaterialChange}
          // *******
          // Actions
          onAdd={onAdd}
          onSubmit={onSubmit}
          HandleStepDelete={HandleStepDelete}
          //*** */
        />
      </div>
    </div>
  );
}

export default CreateProject;
