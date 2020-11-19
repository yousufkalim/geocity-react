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
    address: "",
    zipCode: "",
    city: "",
    latitude: "",
    longitude: "",
  };

  const stepData = {
    name: "",
    skillField: "",
    speciality: "",
    description: "",
    // StepsType: "",
    // Steps: "",
    status: "",
    material: [],
  };
  const [formData, setFormData] = useState(projectData);
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [CategoryList, setCategoryList] = useState("");
  const [materialList, setMaterialList] = useState("");
  const [skillList, setskillList] = useState("");

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
  });

  const [stepRequiredFields, setstepRequiredFields] = useState({
    name: "",
    skillField: "",
    speciality: "",
    // StepsType: "",
    // Steps: "",
    status: "",
    material: [],
  });
  // validation start
  const validateStepType = () => {
    if (!stepformData.skillField) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, skillField: msg });
      return false;
    }

    setstepRequiredFields({ ...stepRequiredFields, skillField: "" });

    return true;
  };
  const validateSpeciality = () => {
    if (!stepformData.speciality) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, speciality: msg });
      return false;
    }

    setstepRequiredFields({ ...stepRequiredFields, speciality: "" });

    return true;
  };
  const validateStatus = () => {
    if (!stepformData.status) {
      const msg = "Required";
      setstepRequiredFields({ ...stepRequiredFields, status: msg });
      return false;
    }

    setstepRequiredFields({ ...stepRequiredFields, status: "" });

    return true;
  };
  const validateGenralDesc = () => {
    if (!formData.general_description) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        general_description: msg,
      });
      return false;
    }

    setAboutRequiredFields({ ...aboutRequiredFields, general_description: "" });

    return true;
  };
  const validateProjectType = () => {
    if (!formData.type) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, type: msg });
      return false;
    }

    setAboutRequiredFields({ ...aboutRequiredFields, type: "" });

    return true;
  };
  const validatePhoto = () => {
    if (!formData.general_photo) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, general_photo: msg });
      return false;
    }

    setAboutRequiredFields({ ...aboutRequiredFields, general_photo: "" });

    return true;
  };
  const validateCity = () => {
    if (address.length > 0) {
      setAboutRequiredFields({ ...aboutRequiredFields, address: "" });

      return true;
    }
  };
  const validateCategory = () => {
    if (!formData.category) {
      const msg = "Required";
      setAboutRequiredFields({ ...aboutRequiredFields, category: msg });
      return false;
    }

    setAboutRequiredFields({ ...aboutRequiredFields, category: "" });

    return true;
  };

  const handleTitle = () => {
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
      formData.title.trim()
    );
    if (formData.title.trim() && !isValid) {
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
    setAboutRequiredFields({ ...aboutRequiredFields, title: "" });
    setFormData({ ...formData, title: formData.title.trim() });
    return true;
  };
  const handleName = () => {
    // alert("hello")
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
      stepformData.name.trim()
    );
    if (stepformData.name.trim() && !isValid) {
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

    setstepRequiredFields({ ...stepRequiredFields, name: "" });
    setstepFormData({ ...stepformData, name: stepformData.name.trim() });
    return true;
  };

  const handleDescription = () => {
    // alert("hello")
    const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
      stepformData.description.trim()
    );
    if (stepformData.description.trim() && !isValid) {
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

    setstepRequiredFields({ ...stepRequiredFields, description: "" });
    setstepFormData({
      ...stepformData,
      description: stepformData.description.trim(),
    });
    return true;
  };

  // validation end
  // useEffect
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
      },
    };
    try {
      axios
        .get("http://localhost:3000/api/v1/admin/categoryList", headers)
        .then((res) => {
          setCategoryList(res.data.categories);
          console.log(res, "response cat");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      console.log(error, "error catch");
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
        var lat = items[i].toString();
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
      const msg = "Required";
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
      const msg = "Required";
      // const flashData = { type: "error", text: "Fill the required fields." }
      // props.addFlashMessage(flashData)
      return false;
    } else {
      setstepRequiredFields({});

      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    // console.log(items,"items")
    checkValidateForm();
    checkValidateForm2();
    if (isCheck === false) {
      // alert("hello")
      seterror(
        "You must have to add atleast one implementation step, for this fill steps field and press Add"
      );
    } else {
      setFormData({ ...formData, implementation_steps: stepArrayData });
      const headers = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
        },
      };
      try {
        await axios
          .post(
            "http://localhost:3000/api/v1/project/CreateProject",
            formData,
            headers
          )
          .then((res) => {
            setisLoading(false);
            // console.log(res,"res")
          })
          .catch((err) => {
            setisLoading(true);
            console.log(" error =>", err);
          });
      } catch (error) {
        console.log(error, "error catch");
        setisLoading(true);
      }
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleStepChange = async (e) => {
    // alert("yooo")
    let value = e.target.value;
    setstepFormData({ ...stepformData, [e.target.name]: value });
    if (e.target.value === "Material") {
      // alert("hello")
      const headers = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
        },
      };
      try {
        await axios
          .get("http://localhost:3000/api/v1/admin/materialList", headers)
          .then((res) => {
            setMaterialList(res.data.materials);
            console.log(res, "res material");
          })
          .catch((err) => console.log(" error =>", err));
      } catch (error) {
        console.log(error, "error catch");
      }
    } else {
      const headers = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
        },
      };
      try {
        await axios
          .get("http://localhost:3000/api/v1/admin/skillList", headers)
          .then((res) => {
            setskillList(res.data.skills);
            console.log(res, "res skilllist");
          })
          .catch((err) => console.log(" error =>", err));
      } catch (error) {
        console.log(error, "error catch");
      }
    }
  };

  const onAdd = () => {
    checkValidateForm2();
    setisCheck(true);
    seterror("");
    setstepArrayData((prevState) => [...prevState, stepformData]);
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
          handleTitle={handleTitle}
          validateStatus={validateStatus}
          validateSpeciality={validateSpeciality}
          handleDescription={handleDescription}
          validateStepType={validateStepType}
          validateCity={validateCity}
          validateCategory={validateCategory}
          stepRequiredFields={stepRequiredFields}
          validateProjectType={validateProjectType}
          validatePhoto={validatePhoto}
          validateGenralDesc={validateGenralDesc}
          // validator end
          formData={formData}
          items={items}
          getAddress={getAddress}
          SetAddress={SetAddress}
          CategoryList={CategoryList}
          stepformData={stepformData}
          handleStepChange={handleStepChange}
          materialList={materialList}
          skillList={skillList}
          address={address}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
}

export default CreateProject;
