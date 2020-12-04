import React, { useState, useEffect } from "react";
import "../Theme/css/main.css";
import axios from "axios";
import Form from "../Components/ProjectForm";

function CreateProject() {
  const projectData = {
    title: "",
    type: "",
    general_photo: "",
    general_description: "",
    category: "",

    // implementation_steps: "",
    // progress: "",
  };
  const cityData = {
    // address: "",
    zipCode: "",
    city: "",
    latitude: "",
    longitude: "",
    street: "",
  };
  const stepData = {
    name: "",
    // skillField: "",
    description: "",
    // StepsType: "",
    // Steps: "",
    status: "NoProgress",
  };
  const skillData = {
    skillField: "",
    speciality: "",
    skill: "",
    // StepsType: "",
    // Steps: "",
  };
  const [formData, setFormData] = useState(projectData);
  const [stepformData, setstepFormData] = useState(stepData);
  const [formDataSkillField, setFormDataSkillField] = useState(skillData);

  const [formDataCity, setFormDataCity] = useState(cityData);

  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [CategoryList, setCategoryList] = useState("");
  const [materialList, setMaterialList] = useState("");
  const [skillfieldList, setskillFieldList] = useState("");
  const [skillList, setskillList] = useState("");

  const [materialArrayData, setmaterialArrayData] = useState([]);
  const [material, setMaterial] = useState("");
  const [skillField, setskillField] = useState("");
  const [stepType, setstepType] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [isCheck, setisCheck] = useState(false);
  const [photo, setPhoto] = useState("");

  const [error, seterror] = useState("");
  const [iserror, setisError] = useState("");

  const [stepArrayData, setstepArrayData] = useState([]);

  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    title: "",
    type: "",
    general_photo: "",
    general_description: "",
    category: "",
    address: "",
    progress: "",
  });

  const [stepRequiredFields, setstepRequiredFields] = useState({
    name: "",
    // skillField: "",
    speciality: "",
    // StepsType: "",
    // Steps: "",
    status: "",
    material: "",
    error: "",
  });
  const [skillRequiredFields, setskillRequiredFields] = useState({
    skillField: "",
    speciality: "",
    skill: "",
    // StepsType: "",
    // Steps: "",
  });
  // validation start
  const validateStepType = () => {
    if (stepformData.skillField) {
      const msg = "Required";

      setstepRequiredFields({ ...stepRequiredFields, skillField: "" });

      return true;
    } else if (!stepformData.skillField) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, skillField: msg });
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
      setAboutRequiredFields({
        ...aboutRequiredFields,
        general_description: "",
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
  const validatePhoto = () => {
    if (formData.general_photo) {
      // alert("hello");
      const msg = "";

      setAboutRequiredFields({ ...aboutRequiredFields, general_photo: msg });

      return true;
    } else if (!formData.general_photo) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, general_photo: msg });
      return false;
    }
  };
  const validateCity = () => {
    if (formDataCity.city) {
      // alert("hello");
      const msg = "";

      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    } else if (!formDataCity.city) {
      let msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return false;
    }
  };

  // const validateProgress = () => {
  //   if (formData.progress) {
  //     setAboutRequiredFields({ ...aboutRequiredFields, progress: "" });

  //     return true;
  //   } else if (!formData.progress) {
  //     const msg = "Required";
  //     setAboutRequiredFields({ ...aboutRequiredFields, progress: msg });
  //     return false;
  //   }
  // };
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
    // console.log(formData.title.length, "formData.title.length");
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(formData.title);
    if (formData.title.length >= 4 && formData.title.length < 20) {
      // alert("hello h1");
      setAboutRequiredFields({ ...aboutRequiredFields, title: "" });
      setFormData({ ...formData, title: formData.title.trim() });
      return true;
    } else if (formData.title.trim() && !isValid) {
      const msg = "Title should not contain any digit or special characters";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      return false;
    } else if (formData.title.trim().length < 5) {
      const msg = "Title needs to be at least 5 characters";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (formData.title.trim().length > 100) {
      const msg = "Title needs to be  100 characters long";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (!formData.title.length) {
      // alert("hello")
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      // setFNErr("Please Enter Name");
      return false;
    }
  };
  const handleName = () => {
    // alert("hello")
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
      stepformData.name.trim()
    );
    if (stepformData.name.length <= 4 && stepformData.name.length < 20) {
      // alert("hello h1");
      const msg = "";

      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      setstepFormData({ ...stepformData, name: stepformData.name.trim() });
      return true;
    } else if (stepformData.name.trim() && !isValid) {
      const msg = "Name should not contain any digit or special characters";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      return false;
    } else if (stepformData.name.trim().length > 20) {
      const msg = "Name needs to be  20 characters long";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (!stepformData.name.length) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, name: msg });
      // setFNErr("Please Enter Name");
      return false;
    }
  };

  const validateDescription = () => {
    // alert("hello")
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
      stepformData.description.trim()
    );
    if (
      stepformData.description.length >= 4 &&
      stepformData.description.length < 20
    ) {
      // alert("hello h1");
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
      const msg = "description needs to be  150 characters";
      setstepRequiredFields({ ...stepRequiredFields, description: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (!stepformData.description.length) {
      // alert("hello")
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, description: msg });
      // setFNErr("Please Enter Name");
      return false;
    }
  };
  // validation end
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
          // console.log(res, "response category");
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {
      console.log(error, "error catch");
    }
  }, [stepType]);
  // // console.log(formData,"formData")
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
        // // console.log("res address", responseJson);
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
    // // console.log(item,'item')
    setAddress(item);
    // this.setState({ address: item });

    for (let i = 0; i < items.length; i++) {
      if (items[i].label === item) {
        // debugger;
        var city = items[i].city;
        var zipCode = items[i].PostalCode;
        var lat = items[i].lat.toString();
        var lng = items[i].lng.toString();
        // var street = items[i].context.toString();

        var newAddress = items[i].label.split(String(zipCode));
        setFormDataCity({
          // address: newAddress[0],
          zipCode: zipCode,
          city: city,
          latitude: lat,
          longitude: lng,
          // street: street,
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
    // validateCity();
  };

  // get set adress end

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

    if (!reqFields) {
      return false;
    } else {
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

    setstepRequiredFields(obj);

    if (!reqFields) {
      // validatePortfolioThumbnail()
      // validatePortfolioFiles()
      // const msg = "Required";
      // const flashData = { type: "error", text: "Fill the required fields." }
      // props.addFlashMessage(flashData)
      return false;
    } else {
      setstepRequiredFields({});

      return true;
    }
  };

  // console.log(formDataCity, "formDataCity");

  const onSubmit = async (e) => {
    // stepArrayData.material = materialArrayData;
    // formData.implementation_steps = stepArrayData;
    // formData.address = formDataCity;

    console.log(photo, "photo");
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("type", formData.type);
    newFormData.append("general_photo", photo);
    newFormData.append("general_description", formData.general_description);
    newFormData.append("category", formData.category);
    newFormData.append("address", JSON.stringify(formDataCity));
    newFormData.append("implementation_steps", JSON.stringify(stepArrayData));

    e.preventDefault();
    setisLoading(true);

    checkValidateForm();
    checkValidateForm2();

    if (isCheck === false) {
      // alert("hello");
      setisLoading(false);

      seterror(
        "You must have to add atleast one implementation step, for this fill steps field and press Add"
      );
    } else {
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
          .then((res) => {
            setisLoading(false);
            setFormData(projectData);
            setPhoto("");
            setAddress("");

            // // console.log(res,"res")
          })
          .catch((err) => {
            setTimeout(() => {
              setisLoading(false);
            }, 1000);
            if (err.response.data) {
              if (err.response.data.message) {
                setisError(err.response.data.message);
              } else {
                setisError(err.response.data);
              }
            }
            // console.log(" error =>", err);
          });
      } catch (error) {
        // console.log(error, "error catch");
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      }
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    // debugger;

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
      // will use later for photo validation
      // case "general_photo":
      //   validatePhoto();
      //   break;
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
  // console.log(materialArrayData, "material aary data");

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

    switch (e.target.name) {
      case "name":
        handleName();
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
  // // console.log(stepformData, "stepformData");

  const onAdd = () => {
    // console.log(formDataSkillField, "form data skil;field");

    checkValidateForm2();
    setisCheck(true);
    seterror("");
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
  // // console.log(stepformData,"stepformData")

  return (
    <div className="main">
      <div className="containerProject">
        <Form
          handleName={handleName}
          handleChange={handleChange}
          error={error}
          onSubmit={onSubmit}
          isLoading={isLoading}
          aboutRequiredFields={aboutRequiredFields}
          // validator
          handleTitle={validateTitle}
          validateStatus={validateStatus}
          validateSpeciality={validateSpeciality}
          handleDescription={validateDescription}
          validateStepType={validateStepType}
          validateCity={validateCity}
          validateCategory={validateCategory}
          // setFormDataSkillField={setFormDataSkillField}
          stepRequiredFields={stepRequiredFields}
          validateProjectType={validateProjectType}
          validatePhoto={validatePhoto}
          validateMaterial={validateMaterial}
          // validateProgress={validateProgress}
          skillRequiredFields={skillRequiredFields}
          validateGenralDesc={validateGenralDesc}
          // validator end
          formData={formData}
          materialArrayData={materialArrayData}
          setmaterialArrayData={setmaterialArrayData}
          formDataSkillField={formDataSkillField}
          skillfieldList={skillfieldList}
          items={items}
          getAddress={getAddress}
          SetAddress={SetAddress}
          CategoryList={CategoryList}
          formDataCity={formDataCity}
          stepformData={stepformData}
          handleStepChange={handleStepChange}
          materialList={materialList}
          handleSkillChange={handleSkillChange}
          skillList={skillList}
          address={address}
          setMaterial={setMaterial}
          iserror={iserror}
          material={material}
          stepType={stepType}
          setstepType={setstepType}
          skillField={skillField}
          onAdd={onAdd}
          setPhoto={setPhoto}
          stepArrayData={stepArrayData}
        />
      </div>
    </div>
  );
}

export default CreateProject;
