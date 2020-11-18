import React from "react";
import Autocomplete from "react-autocomplete";
// import { withFormik } from "formik";
// import Debug from "./Debug";
function Form({
  errors,
address,onAdd,
  handleChange,
  onSubmit,error,isLoading,
//   validator
  handleName,
  handleDescription,
  handleTitle,
  validateCategory,
  validateStepType,
  stepRequiredFields,validateStatus,validateSpeciality,
  validateProjectType,
  validateCity,validatePhoto,validateGenralDesc,
// validator
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
                onBlur={validateProjectType}
                >
                  <option  value=""></option>
                  <option  value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div> 
              {aboutRequiredFields.type!=='' ? <p className="error"> {aboutRequiredFields.type}</p> : ""}

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
              {aboutRequiredFields.address!=='' ? <p className="error"> {aboutRequiredFields.address}</p> : ""}
                    
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
              onBlur={validatePhoto}
              
              />
              {aboutRequiredFields.general_photo!=='' ? <p className="error"> {aboutRequiredFields.general_photo}</p> : ""}

              <label className="label-agree-term">General Description</label>
            
              <input type="text" name="general_description"  id="general_description" value={formData.general_description} 
              onChange={handleChange}
              onBlur={validateGenralDesc}
              
              placeholder="Description"
               required 
              />
              {aboutRequiredFields.general_description!=='' ? <p className="error"> {aboutRequiredFields.general_description}</p> : ""}

              <label className="label-agree-term">Category</label>

              <div className="select-list">
                <select name="category" id="category" value={formData.category}
                  onChange={handleChange}
                  onBlur={validateCategory}
                
                >
                  {CategoryList ? CategoryList.map(cat=>(
                  <option  value={cat._id} key={cat._id}>{cat.name}</option>

                  )):""}
                </select>
              </div> 
              {aboutRequiredFields.category!=='' ? <p className="error"> {aboutRequiredFields.category}</p> : ""}
           
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
              {stepRequiredFields.name!=='' ? <p className="error"> {stepRequiredFields.name}</p> : ""}
              
              <label className="label-agree-term">Step Type</label>

              <div className="select-list">
                <select name="skillField" id="skillField" value={stepformData.skillField} 
              onChange={handleStepChange}
              onBlur={validateStepType}
              
              >
                  <option  value=""></option>

                  <option  value="Field">Field</option>
                  <option value="Material">Material</option>
                </select>
              </div> 
              {stepRequiredFields.skillField!=='' ? <p className="error"> {stepRequiredFields.skillField}</p> : ""}

              {stepformData.skillField==="Material"?
              <>
              <label className="label-agree-term">Step</label>

            <div className="select-list">
              <select name="material" id="material" value={stepformData.material} 
            onChange={handleStepChange}
            onBlur={validateStepType}

              >
               {materialList ?materialList.map(mat=>(
                <option value={mat.name}>{mat.name}</option>
               ))
              
:""}

              </select>
            </div></>  : stepformData.skillField==="Field" ?  <div className="select-list">
              <select name="material" id="material" value={stepformData.material} 
            onChange={handleStepChange}
            onBlur={validateStepType}>
                    {skillList ?skillList.map(mat=>(
                <option value={mat.skillField}>{mat.skillField}</option>
               ))
                :""}

              </select>
            </div>:""
}
{stepRequiredFields.material!=='' ? <p className="error"> {stepRequiredFields.material}</p> : ""}
  
              <label className="label-agree-term">Description</label>
              <input type="text" name="description" id="title" value={stepformData.description} placeholder="Description" required 
              onChange={handleStepChange}
              onBlur={handleDescription}
              />
              {stepRequiredFields.description!=='' ? <p className="error"> {stepRequiredFields.description}</p> : ""}

              <label className="label-agree-term">Project Status</label>

            <div className="select-list">
              <select name="status" id="Type" value={stepformData.status} 
            onChange={handleStepChange}
            onBlur={validateStatus}
              
              >
                <option  value="completed">completed</option>
                <option value="ongoing">ongoing</option>
                <option value="nothing">nothing</option>

              </select>
            </div> 
              {stepRequiredFields.status!=='' ? <p className="error"> {stepRequiredFields.status}</p> : ""}
                          
          <label className="label-agree-term">Speciality</label>
              <input type="text" name="speciality" id="title" value={stepformData.speciality} placeholder="Speciality" required 
              onChange={handleStepChange}
              onBlur={validateSpeciality}

              />
              {stepRequiredFields.speciality!=='' ? <p className="error"> {stepRequiredFields.speciality}</p> : ""}
          
      
              <input type="button" name="add" onClick={onAdd} className="submitAdd" value="Add" />
              {error!=='' ? <p className="error"> {error}</p> : ""}

            </div>
        
            <div className="form-submit">
                {isLoading===true?
              <input type="submit" name="submit" disabled className="submit" defaultValue="Loading...." />
               :
              <input type="submit" name="submit" onClick={onSubmit} className="submit" defaultValue="Request an appointment" />

            }
            </div>
          </form>
         

          </>
  );
}

export default Form;
