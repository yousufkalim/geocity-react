import React, { useState, useEffect } from "react";
import "../Theme/css/main.css";
import axios from "axios";
import Form from "../Components/ProjectForm";
import { Headers } from "../Auth/Index";
function CreateProject() {
  const projectData = {
    title: "",
    type: "",
    general_photo: "",
    general_description: "",
    category: "",
    address: "",
    zipCode: "",
    city: "",
    latitude: "",
    longitude: "",
    // implementation_steps: "",
    // progress: "",
  };

  const stepData = {
    name: "",
    skillField: "",
    speciality: "",
    description: "",
    // StepsType: "",
    // Steps: "",
    status: "nothing",
  };
  const [formData, setFormData] = useState(projectData);
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [CategoryList, setCategoryList] = useState("");
  const [materialList, setMaterialList] = useState("");
  const [skillList, setskillList] = useState("");
  const [materialArrayData, setmaterialArrayData] = useState([]);
  const [material, setMaterial] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [isCheck, setisCheck] = useState(false);

  const [error, seterror] = useState("");

  const [stepformData, setstepFormData] = useState(stepData);
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
    skillField: "",
    speciality: "",
    // StepsType: "",
    // Steps: "",
    status: "",
    material: "",
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
    if (stepformData.speciality) {
      setstepRequiredFields({ ...stepRequiredFields, speciality: "" });

      return true;
    } else if (!stepformData.speciality) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, speciality: msg });
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
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(formData.title);
    if (!formData.title.length) {
      // alert("hello")
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, title: msg });
      // setFNErr("Please Enter Name");
      return false;
    } else if (formData.title.length === 4 && formData.title.length < 20) {
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
    }
  };
  const handleName = () => {
    // alert("hello")
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
      stepformData.name.trim()
    );
    if (stepformData.name.length === 4 && stepformData.name.length < 20) {
      // alert("hello h1");
      setstepRequiredFields({ ...stepRequiredFields, name: "" });
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
      stepformData.description.length === 4 &&
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
    try {
      axios
        .get("http://localhost:3000/api/v1/admin/categoryList", Headers)
        .then((res) => {
          setCategoryList(res.data.categories);
          console.log(res, "response cat");
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, []);
  // console.log(formData,"formData")
  // get set address

  const getAddress = (e) => {
    // this.setState({
    //   address: e.target.value,
    //   zip: "",
    //   city: "",
    //   lat: 0,
    //   long: 0,
    //   zipError: "auto-complete-error",
    //   isDisableSubmitBtn: true,
    // });

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
          // this.setState({ items: addressToSet }, () => {
          //   console.log(
          //     "Address to set",
          //     addressToSet,
          //     "state",
          //     items
          //   );
          // });
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
    validateCity();
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
      // validatePortfolioThumbnail()
      // validatePortfolioFiles()
      // const msg = "Required";
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
  console.log(formData, "formdata");
  console.log(stepArrayData, "stepArrayData");

  const onSubmit = async (e) => {
    // stepArrayData.material = materialArrayData;
    formData.implementation_steps = stepArrayData;
    e.preventDefault();
    setisLoading(true);

    // console.log(items,"items")
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
        await axios
          .post(
            "http://localhost:3000/api/v1/project/CreateProject",
            formData,
            Headers
          )
          .then((res) => {
            setisLoading(false);
            setFormData(projectData);
            // console.log(res,"res")
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
    }
  };

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
  const handleStepChange = async (e) => {
    let value = e.target.value;
    if (e.target.name === "material") {
      setMaterial(e.target.value);
      const msg = "Value Already Existed";
      if (materialArrayData.length > 0) {
        materialArrayData.map((data) => {
          console.log(data, "data");

          data !== e.target.value
            ? setmaterialArrayData((prevState) => [
                ...prevState,
                e.target.value,
              ])
            : setstepRequiredFields({ ...stepRequiredFields, material: msg });
        });
      } else {
        console.log("succceess");
        setmaterialArrayData((prevState) => [...prevState, e.target.value]);
      }
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

    if (e.target.value === "Material") {
      // alert("hello")

      try {
        await axios
          .get("http://localhost:3000/api/v1/admin/materialList", Headers)
          .then((res) => {
            setMaterialList(res.data.materials);
            // console.log(res, "res material");
          })
          .catch((err) => console.log(" error =>", err));
      } catch (error) {
        // console.log(error, "error catch");
      }
    } else {
      try {
        await axios
          .get("http://localhost:3000/api/v1/admin/skillList", Headers)
          .then((res) => {
            setskillList(res.data.skills);
            // console.log(res, "res skilllist");
          })
          .catch((err) => console.log(" error =>", err));
      } catch (error) {
        // console.log(error, "error catch");
      }
    }
  };
  console.log(stepformData, "stepformData");

  const onAdd = () => {
    checkValidateForm2();
    setisCheck(true);
    seterror("");
    stepformData.material = materialArrayData;
    setstepArrayData((prevState) => [...prevState, stepformData]);
    setstepFormData(stepData);
    setstepArrayData([]);
  };
  // console.log(stepformData,"stepformData")

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
          stepRequiredFields={stepRequiredFields}
          validateProjectType={validateProjectType}
          validatePhoto={validatePhoto}
          validateMaterial={validateMaterial}
          // validateProgress={validateProgress}
          validateGenralDesc={validateGenralDesc}
          // validator end
          formData={formData}
          materialArrayData={materialArrayData}
          setmaterialArrayData={setmaterialArrayData}
          items={items}
          getAddress={getAddress}
          SetAddress={SetAddress}
          CategoryList={CategoryList}
          stepformData={stepformData}
          handleStepChange={handleStepChange}
          materialList={materialList}
          skillList={skillList}
          address={address}
          setMaterial={setMaterial}
          material={material}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
}

export default CreateProject;
