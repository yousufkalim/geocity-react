import React,{useState} from 'react'
import  '../Theme/css/main.css'
import axios from 'axios'
function CreateProject() {

  const projectData = {
    Title: "",
    Type: "",
    Photo: "",
    Desc: "",
    Category: "",
   
 
  }
  const stepData = {
    name: "",
    tradeName: "",
    speciality: "",
    description: "",
    // StepsType: "",
    // Steps: "",
    status:"",
    material:""
  }
  const [formData, setFormData] = useState(projectData)
  const [stepformData, setstepFormData] = useState(stepData)

 
  const onSubmit=(e)=>{
    e.preventDefault();
    console.log(formData,"formData")
    // console.log(stepformData,"stepformData")
    const headers = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWI2YTZkNTk5NjI1MTJhNGQwODI5ZiIsImlhdCI6MTYwNTA2OTcwMiwiZXhwIjoxNjA3NjYxNzAyfQ.zuZ0G3dXSOI04_YrnUX7XCX6DscFO3KaWHZW9TCoa4k`,
        // "Content-Type": "multipart/form-data",
      },
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/v1/project/CreateProject',
      formData,
      headers
    }).then((res)=>{
      console.log(res,"res")
    }).catch(err=>{
      console.log(err,"err")
    })
  }
  const handleChange=(e)=>{
    let value = e.target.value
    setFormData({ ...formData, [e.target.name]: value })

  }
  const handleStepChange=(e)=>{
    let value = e.target.value
    setstepFormData({ ...stepformData, [e.target.name]: value })

  }
  const onAdd=()=>{
    setFormData({ ...formData,...stepformData })
  }
  // console.log(formData,"FormData")
    return (
        <div className='main'>
        <div className='containerProject'>
          <form method="POST" className='appointmentform' id="appointment-form">
            <h2>Create A Project</h2>
            <div className="form-group-1">
              <label className="label-agree-term">Project Title</label>
              <input type="text" name="Title" id="title" value={formData.Title} placeholder="Title" required 
              onChange={handleChange}
              />
              <label className="label-agree-term">Project Type</label>

              <div className="select-list">
                <select name="Type" id="Type" value={formData.Type} 
              onChange={handleChange}
                
                >
                  <option  value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div> 
              <label className="label-agree-term">Photo</label>

              <input type="file" name="Photo" id="file" value={formData.Photo} required 
              onChange={handleChange}
              
              />
              <label className="label-agree-term">General Description</label>
            
              <input type="text" name="Desc" id="Desc" value={formData.Desc} 
              onChange={handleChange}
              
              placeholder="Description" required />
              <label className="label-agree-term">Category</label>

              <div className="select-list">
                <select name="Category" id="Category" value={formData.Category}
              onChange={handleChange}
                
                >
                  <option slected value>Category 1</option>
                  <option value="society">Category 2</option>
                </select>
              </div> 
           
            </div>
            {/* form1 end */}
            {/* form 2 */}
             <div className="form-group-2">
              <h3>Implementation Steps </h3>
              <label className="label-agree-term">Step Name</label>
              <input type="text" name="name" value={stepformData.name} placeholder="name" required 
              onChange={handleStepChange}
              />
              <label className="label-agree-term">Field Name</label>

              <div className="select-list">
                <select name="tradeName" id="Type" value={stepformData.tradeName} 
              onChange={handleStepChange}
                
                >
                  <option  value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div> 
              <label className="label-agree-term">Project Status</label>

<div className="select-list">
  <select name="status" id="Type" value={stepformData.status} 
onChange={handleStepChange}
  
  >
    <option  value="completed">completed</option>
    <option value="ongoing">ongoing</option>
    <option value="nothing">nothing</option>

  </select>
</div> 
<label className="label-agree-term">Speciality</label>
              <input type="text" name="speciality" id="title" value={stepformData.speciality} placeholder="Speciality" required 
              onChange={handleStepChange}
              />
          
<label className="label-agree-term">Material</label>

<div className="select-list">
  <select name="material" id="Type" value={stepformData.material} 
onChange={handleStepChange}
  
  >
    <option  value="completed">material</option>
    <option value="ongoing">ongoing</option>
    <option value="nothing">nothing</option>

  </select>
</div> 
              {/* <label className="label-agree-term">Choose a field or material?</label>

              <div className="select-list">
                <select name="StepsType" id="StepsType" value={stepformData.StepsType}
              onChange={handleStepChange}
                
                >
                  <option slected value>Field</option>
                  <option value="Material">Material</option>
                </select>
              </div>  */}
              {/* <div className="select-list">
                <select name="Steps" id="Steps" value={stepformData.Steps}
              onChange={handleStepChange}>
                  <option slected value="Construction">Construction</option>
                  <option value="Cemint">Cemint</option>
                </select>
              </div>  */}
              <label className="label-agree-term">Description</label>
              <input type="text" name="description" id="title" value={stepformData.description} placeholder="Description" required 
              onChange={handleStepChange}
              />
              <input type="button" name="add" onClick={onAdd} className="submitAdd" value="Add" />

            </div>
        
            <div className="form-submit">
              <input type="submit" name="submit" onClick={onSubmit} className="submit" defaultValue="Request an appointment" />
            </div>
          </form>
        </div>
      </div>
    )
}

export default CreateProject
