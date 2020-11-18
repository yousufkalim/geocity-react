import React,{useState} from 'react'
import  '../Theme/css/main.css'
import Autocomplete from "react-autocomplete";
import axios from 'axios'
function Signup() {
  const signupData = {
    username:"",
    email:"",
    city:"",
    password:"",
    availability:"",
    confirm_password:"",
    profile_picture:"",
    profile_description:"",

    address: "",
    zipCode : "",
    latitude: "",
    longitude: "",

    // skills:[],
    // material:[],
  }
  const stepData = {
    skillField: [],
    skill: "",
    specialization: "",
    score: "",
  
  }
  const materialData = {
  name:""
  }
  // states start ************************************



  const [formData, setFormData] = useState(signupData)
  const [address, setAddress] = useState("")
  // const [material, setMaterial] = useState("")
  const [isLoading, setisLoading] = useState(false)

  const [items, setItems] = useState([])
  const [skillArrayData, setskillArrayData] = useState([])
  const [materialArrayData, setmaterialArrayData] = useState([])

  const [skillformData, setskillFormData] = useState(stepData)
  const [materialformData, setmaterialFormData] = useState(materialData)

  console.log(formData,"formData")
  console.log(skillformData,"skillformData")

  // states end ***************************
  // Handle_change
  const handleChange=(e)=>{
    let value = e.target.value
    setFormData({ ...formData, [e.target.name]: value })

  }
  // handle cahnge end
  const handleSkillChange= async (e)=>{
    // alert("yooo")
    let value = e.target.value
    setskillFormData({ ...skillformData, [e.target.name]: value })
    
  }
  const onskillAdd=()=>{
  
      setskillArrayData((prevState) => [...prevState, skillformData])
    }
    const onMaterialAdd=()=>{
      setmaterialArrayData((prevState) => [...prevState, materialformData])
    }
  const getAddress = (e) => {
  
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
    // validateCity();
  };
  // city_end

  const onSubmit=async (e)=>{
    e.preventDefault();
    setisLoading(true)

  // console.log(items,"items")
  // checkValidateForm()
  // checkValidateForm2()
  // if(isCheck===false){
  //   // alert("hello")
  //   seterror("You must have to add atleast one implementation step, for this fill steps field and press Add")

  // }
  // else{

  
    setFormData({ ...formData,skills:skillArrayData,material:materialArrayData })
    // setFormData({ ...formData,material:materialArrayData })


    const headers = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjI3NTYyOTU0MTU1MTNjODc0ZmYyNiIsImlhdCI6MTYwNTU4OTg3NSwiZXhwIjoxNjA4MTgxODc1fQ.8Xrmxf3EyPQLsCKMJdJ6XJwuoVj7B1NfHLsTEc-7lW8`,
      },
    }

    try {
      await axios
        .post("http://localhost:3000/api/v1/auth/register", formData, headers)
        .then((res) => {
          setisLoading(false)
          // console.log(res,"res")
        })
        .catch((err) => {
          setisLoading(true)
          console.log(" error =>", err)})
    } catch (error) {
      console.log(error, "error catch")
      setisLoading(true)
    }
  }
  // }
    return (
        <div className='main'>
        <div className='containerProject'>
          <form method="POST" className='appointmentform' id="appointment-form">
            <h2>Sign Up form</h2>
            <div className="form-group-1">
            <label className="label-agree-term">User_name</label>

              <input type="text" name="username" id="username" value={formData.username} placeholder="Username" required 
              onChange={handleChange}
              />
            <label className="label-agree-term">Email</label>

              <input type="email" name="email" id="email" placeholder="Email" required 
              value={formData.email}
              onChange={handleChange}
              />
            <label className="label-agree-term">Password</label>

              <input type="password" name="password" id="password" placeholder="Password" required
              value={formData.password}
              onChange={handleChange}
              />
            <label className="label-agree-term">Confirm_Password</label>

              <input type="confirm_password" name="confirm_password" id="confirm_password" placeholder="Confirm_Password" required 
              value={formData.confirm_password}
              onChange={handleChange}
              />
            <label className="label-agree-term">City</label>

               <Autocomplete
                      items={items}
                      // shouldItemRender={(item, value) =>
                      //   item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                      // }
                      getItemValue={(item) => item.label}
                      renderItem={(item, highlighted) => (
                        <div
                          key={item.id}
                          style={{
                            backgroundColor: highlighted
                              ? "#eee"
                              : "transparent",
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                      wrapperStyle={{
                        display: "block",
                      }}
                      menuStyle={{
                        zIndex: "1",
                        position: "static",
                        borderRadius: "3px",
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                        background: "rgba(255, 255, 255, 0.9)",
                        padding: "2px 12px",
                        fontSize: "90%",
                        color:"#000",
                        overflow: "auto",
                        maxHeight: "50%",
                      }}
                      inputProps={{ className: "form-control" }}
                      value={address}
                      name="address"
                      onChange={getAddress}
                      onSelect={SetAddress}
                    />
            <label className="label-agree-term">Profile_picture</label>
            
              <input type="file" name="profile_picture" id="profile_picture" required 
              value={formData.profile_picture}
              onChange={handleChange}/>
            <label className="label-agree-term">Profile_description</label>
      
              <input type="text" name="profile_description" id="profile_description" placeholder="Profile_description" required 
               value={formData.profile_description}
               onChange={handleChange}
              />
              {/* <input type="text" name="material" id="material" placeholder="material" required /> */}
              
              


            </div>
           <div className="form-group-2">
              <h3>Skills</h3>
            <label className="label-agree-term">Skill_Field</label>
              
              <div className="select-list">
                <select name="skillField" id="skillField" value={skillformData.skillField}
                onChange={handleSkillChange}
                >
                <option  value=""></option>

                  <option  value>By phone</option>
                  <option value="by_email">By email</option>
                </select>
              </div>
            <label className="label-agree-term">Skill</label>

            <input type="text"
            onChange={handleSkillChange}
            name="skill" id="skill" placeholder="Enter Skill" value={skillformData.skill} required />
           
            <label className="label-agree-term">Specialization</label>

      <input type="text"
      onChange={handleSkillChange}
      name="specialization" id="specialization" placeholder="Enter Specialization" value={skillformData.specialization} required />
      <label className="label-agree-term">Score</label>

<input type="text"
onChange={handleSkillChange}
name="score" id="score" placeholder="Enter Score" value={skillformData.score} required />
              <input type="button" name="add" onClick={onskillAdd} className="submitAdd" value="Add" />

            </div>
            <div className="form-group-2">
              <h3>Material</h3>
            <label className="label-agree-term">Name</label>
            
<input type="text"
onChange={(e)=>
  
  {
    setmaterialFormData({ ...materialformData, [e.target.name]: e.target.value })

  }
  }
name="name" id="material" placeholder="Enter name" value={materialformData.name} required />
              <input type="button" name="add" onClick={onMaterialAdd} className="submitAdd" value="Add" />

            </div>
            {isLoading===true?
              <input type="submit" name="submit" disabled className="submit" value="Loading...." />
               :
              <input type="submit" name="submit" onClick={onSubmit} className="submit" value="Submit" />
            }
          </form>
        </div>
      </div>
    )
}

export default Signup
