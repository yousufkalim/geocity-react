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

  const [aboutRequiredFields, setAboutRequiredFields] = useState({
  title:"",
  general_description:"",
  name:""
  })
// validation start
const handleTitle=()=>{
  const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
    formData.title.trim()
  )
  if (formData.title.trim() && !isValid) {
    const msg = "Title should not contain any digit or special characters"
    setAboutRequiredFields({ ...aboutRequiredFields, title: msg })
    return false
  } else if (formData.title.trim().length<5) {
    const msg = "Title needs to be at least 5 characters"
    setAboutRequiredFields({ ...aboutRequiredFields, title: msg })
    // setFNErr("Please Enter Name");
    return false
  }

  setAboutRequiredFields({ ...aboutRequiredFields, title: "" })
  setFormData({ ...formData, title: formData.title.trim() })
  return true
 
}
const handleName=()=>{
  const isValid = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/i.test(
    formData.general_description.trim()
  )
  if (formData.general_description.trim() && !isValid) {
    const msg = "Name should not contain any digit or special characters"
    setAboutRequiredFields({ ...aboutRequiredFields, general_description: msg })
    return false
  } else if (formData.general_description.trim().length<5) {
    const msg = "Title needs to be at least 5 characters"
    setAboutRequiredFields({ ...aboutRequiredFields, general_description: msg })
    // setFNErr("Please Enter Name");
    return false
  }

  setAboutRequiredFields({ ...aboutRequiredFields, general_description: "" })
  setFormData({ ...formData, general_description: formData.general_description.trim() })
  return true
 
}


// validation end
// useEffect
useEffect( () => {
  const headers = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
    },
  }
  try {
     axios
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
  
    return (
        <div className='main'>
        <div className='containerProject'>
         <Form
         handleName={handleName}
          handleChange={handleChange}
          onSubmit={onSubmit}
          aboutRequiredFields={aboutRequiredFields}
          handleTitle={handleTitle}
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
