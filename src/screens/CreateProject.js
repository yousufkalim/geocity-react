import React,{useState,useEffect} from 'react'
import  '../Theme/css/main.css'
import axios from 'axios'
import Form from '../Components/ProjectForm';
function CreateProject() {

  const projectData = {
    title: "",
    type: "",
    general_photo: "",
    general_description: "",
    category: "",
   address: "",
   zipCode : "",
   city: "",
   latitude: "",
   longitude: "",
  }
  
  const stepData = {
    name: "",
    tradeName: "",
    speciality: "",
    description: "",
    // StepsType: "",
    // Steps: "",
    status:"",
    material:[]
  }
  const [formData, setFormData] = useState(projectData)
  const [address, setAddress] = useState("")
  const [items, setItems] = useState([])
  const [CategoryList, setCategoryList] = useState("")
  const [materialList, setMaterialList] = useState("")
  const [skillList, setskillList] = useState("")
  const [stepformData, setstepFormData] = useState(stepData)
  const [stepArrayData, setstepArrayData] = useState([])
// validation start
const TitleValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 13) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};



// const ageValidation = age => {
//   if (!age) {
//     return "Age is required";
//   }
//   if (age < 18) {
//     return "Age must be at least 18";
//   }
//   if (age > 99) {
//     return "Age must be under 99";
//   }
//   return null;
// };

const validate = {
  title: title => TitleValidation("title", title),
  // lastName: name => TitleValidation("Last Name", name),
  // email: emailValidation,
  // age: ageValidation
};

// validation end
// useEffect
useEffect(async () => {
  const headers = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
    },
  }
  try {
    await axios
      .get("http://localhost:3000/api/v1/admin/categoryList",  headers)
      .then((res) => {
        setCategoryList(res.data.categories)
        console.log(res,"response cat")
      })
      .catch((err) => console.log(" error =>", err))
  } catch (error) {
    console.log(error, "error catch")
  }
}, [])
console.log(skillList,"materialList")
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
  
setAddress(e.target.value)
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
          setItems(addressToSet)
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
    setAddress(item)
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
             zipCode : zipCode,
          city: city,
          latitude: lat,
          longitude: lng,
        })
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
  };

  // get set adress end

const handleMenu= async (e)=>{
  // alert("oy")
 
}

  const onSubmit=async (e)=>{
    e.preventDefault();
  // console.log(items,"items")
    
    setFormData({ ...formData,implementation_steps:stepArrayData })
    const headers = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
     
      },
    }
    try {
      await axios
        .post("http://localhost:3000/api/v1/project/CreateProject", formData, headers)
        .then((res) => {
       
          // console.log(res,"res")
        })
        .catch((err) => console.log(" error =>", err))
    } catch (error) {
      console.log(error, "error catch")
    }
  
  }
 
  const handleChange=(e)=>{
    let value = e.target.value
    setFormData({ ...formData, [e.target.name]: value })

  }
  const handleStepChange= async (e)=>{
    // alert("yooo")
    let value = e.target.value
    setstepFormData({ ...stepformData, [e.target.name]: value })
    if(e.target.value==='Material'){
      // alert("hello")
      const headers = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
        },
      }
      try {
        await axios
          .get("http://localhost:3000/api/v1/admin/materialList", headers)
          .then((res) => {
            setMaterialList(res.data.materials)
            console.log(res,"res material")
          })
          .catch((err) => console.log(" error =>", err))
      } catch (error) {
        console.log(error, "error catch")
      }
    }
    else{
      const headers = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
        },
      }
      try {
        await axios
          .get("http://localhost:3000/api/v1/admin/skillList", headers)
          .then((res) => {
         setskillList(res.data.skills)
            console.log(res,"res skilllist")
          })
          .catch((err) => console.log(" error =>", err))
      } catch (error) {
        console.log(error, "error catch")
      }
    }
  }


  const onAdd=()=>{
    setstepArrayData((prevState) => [...prevState, stepformData])
  }
  // console.log(formData,"FormData")
  
    return (
        <div className='main'>
        <div className='containerProject'>
         <Form
         validate={validate}
          // handleBlur={handleBlur}
          handleChange={handleChange}
          onSubmit={onSubmit}
          // errors={errors}
          // touched={touched}
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
    )
}

export default CreateProject
