import React from "react";
import Autocomplete from "react-autocomplete";
// import { withFormik } from "formik";
// import Debug from "./Debug";
function Form({
  errors,
  handleTitle,
address,onAdd,
  handleChange,
  onSubmit,
  handleName,
aboutRequiredFields,
  formData,
  items,
  getAddress,
  SetAddress,
  CategoryList,
  stepformData,
  handleStepChange,
  materialList,
  skillList
}) {
  return (
<>
    
      <form method="POST" className='appointmentform' id="appointment-form">
            <h2>Create A Project</h2>
            <div className="form-group-1">
              <label className="label-agree-term">Project Title</label>
              <input type="text" name="title" id="title" value={formData.title} placeholder="Title" required 
              onChange={handleChange}
              onBlur={handleTitle}
              />
              {aboutRequiredFields.title!=='' ? <p className="error"> {aboutRequiredFields.title}</p> : ""}
              <label className="label-agree-term">Project Type</label>

              <div className="select-list">
                <select name="type" id="type" value={formData.type} 
              onChange={handleChange}
                
                >
                  <option  value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div> 
              <label className="label-agree-term">City</label>
              {/* <input type="file" name="city" id="file" value={formData.city} required 
              onChange={handleChange}
              
              /> */}
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
          {/* <div className="select-list">
            <select name="city" id="city" value={formData.city} 
          onChange={handleCityChange}
          
            >
              
              <option  value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>  */}

              <label className="label-agree-term">general_photo</label>

              <input type="file" name="general_photo" id="file" value={formData.general_photo} required 
              onChange={handleChange}
              
              />
              <label className="label-agree-term">General Description</label>
            
              <input type="text" name="general_description"  id="general_description" value={formData.general_description} 
              onChange={handleChange}
              
              placeholder="Description"
               required 
              />
              <label className="label-agree-term">Category</label>

              <div className="select-list">
                <select name="category" id="category" value={formData.category}
                  onChange={handleChange}
                
                >
                  {CategoryList ? CategoryList.map(cat=>(
                  <option  value={cat._id} key={cat._id}>{cat.name}</option>

                  )):""}
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
              onBlur={handleName}

              />
              
              <label className="label-agree-term">Step Type</label>

              <div className="select-list">
                <select name="tradeName" id="tradeName" value={stepformData.tradeName} 
              onChange={handleStepChange}>
                  <option  value=""></option>

                  <option  value="Field">Field</option>
                  <option value="Material">Material</option>
                </select>
              </div> 
              <label className="label-agree-term">Step</label>
              {stepformData.tradeName==="Material"?
            <div className="select-list">
              <select name="material" id="material" value={stepformData.material} 
            onChange={handleStepChange}
              >
               {materialList ?materialList.map(mat=>(
                <option value={mat.name}>{mat.name}</option>
               ))
                :""}

              </select>
            </div> : stepformData.tradeName==="Field" ?  <div className="select-list">
              <select name="material" id="material" value={stepformData.material} 
            onChange={handleStepChange}>
                    {skillList ?skillList.map(mat=>(
                <option value={mat.skillField}>{mat.skillField}</option>
               ))
                :""}

              </select>
            </div>:""
}
  
              <label className="label-agree-term">Description</label>
              <input type="text" name="description" id="title" value={stepformData.description} placeholder="Description" required 
              onChange={handleStepChange}
              />
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
          
      
              <input type="button" name="add" onClick={onAdd} className="submitAdd" value="Add" />

            </div>
        
            <div className="form-submit">
              <input type="submit" name="submit" onClick={onSubmit} className="submit" defaultValue="Request an appointment" />
            </div>
          </form>
         

          </>
  );
}

export default Form;
