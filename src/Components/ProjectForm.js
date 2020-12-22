import React from "react";
import Autocomplete from "react-autocomplete";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { names } from "../shared/Data";
import { useStyles } from "../Theme/styles";
function Form({
  address,
  onAdd,
  handleChange,
  handleStepChange,
  onSubmit,
  isLoading,
  //   validator
  validateStepName,
  validateDescription,
  validateTitle,
  validateCategory,
  stepRequiredFields,
  validateStatus,
  validateSpeciality,
  validateProjectType,
  validateGenralDesc,
  validateMaterial,
  validateStepType,
  ValidateOtherSkill,
  ValidateSkillField,
  ValidateSkill,
  validatePhoto,
  // validator
  setmaterialArrayData,
  skillRequiredFields,
  handleSkillChange,
  aboutRequiredFields,
  items,
  getAddress,
  SetAddress,
  CategoryList,
  stepType,
  setstepType,
  material,
  formDataSkillField,
  otherSKill,
  setotherSkill,
  // list
  materialList,
  skillfieldList,
  skillList,
  // ******
  setPhoto,
  // array data
  stepformData,
  formData,
  stepArrayData,
}) {
  const handleStep = (e) => {
    if (e.target.name === "Field") {
      const array = [];
      setmaterialArrayData(array);
    }
    validateStepType();
    setstepType(e.target.value);
  };
  return (
    <>
      <form method="POST" className="appointmentform" id="appointment-form">
        <h2>Create A Project</h2>
        <div className="form-group-1">
          <label className="label-agree-term">Project Title*</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleChange}
            onBlur={validateTitle}
          />
          {aboutRequiredFields.title !== "" ? (
            <p className="error"> {aboutRequiredFields.title}</p>
          ) : (
            ""
          )}
          <label className="label-agree-term">Project Type*</label>

          <div className="select-list">
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              onBlur={validateProjectType}
            >
              <option value="">Select type</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          {aboutRequiredFields.type !== "" ? (
            <p className="error"> {aboutRequiredFields.type}</p>
          ) : (
            ""
          )}

          <label className="label-agree-term">City*</label>

          <Autocomplete
            items={items}
            getItemValue={(item) => item.label}
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: highlighted ? "#eee" : "transparent",
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
              color: "#000",
              overflow: "auto",
              maxHeight: "50%",
            }}
            inputProps={{
              className: "form-control",
              placeholder: "Enter City ",
            }}
            value={address}
            name="address"
            onChange={getAddress}
            onSelect={SetAddress}
          />
          {aboutRequiredFields.address !== "" ? (
            <p className="error"> {aboutRequiredFields.address}</p>
          ) : (
            ""
          )}

          <label className="label-agree-term">General Photo*</label>

          <input
            type="file"
            name="general_photo"
            id="file"
            onFocus={validatePhoto}
            onChange={(e) => {
              const file = e.target.files[0];
              // console.log(file, "photo1");
              validatePhoto(file);
              setPhoto(file);
            }}
          />
          {aboutRequiredFields.general_photo !== "" ? (
            <p className="error"> {aboutRequiredFields.general_photo}</p>
          ) : (
            ""
          )}
          <label className="label-agree-term">General Description*</label>
          <textarea
            rows={3}
            cols={5}
            type="text"
            name="general_description"
            className="form-control "
            id="title"
            value={formData.general_description}
            placeholder="Description"
            onChange={handleChange}
            onBlur={validateGenralDesc}
          ></textarea>

          {aboutRequiredFields.general_description !== "" ? (
            <p className="error mt-2">
              {" "}
              {aboutRequiredFields.general_description}
            </p>
          ) : (
            ""
          )}

          <label className="label-agree-term mt-3">Category*</label>

          <div className="select-list">
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={validateCategory}
            >
              <option value="">Select category</option>

              {CategoryList
                ? CategoryList.map((cat) => (
                    <option value={cat._id} key={cat._id}>
                      {cat.name}
                    </option>
                  ))
                : ""}
            </select>
          </div>
          {aboutRequiredFields.category !== "" ? (
            <p className="error"> {aboutRequiredFields.category}</p>
          ) : (
            ""
          )}
        </div>
        {/* form1 end */}
        {/* form 2 */}
        <div className="form-group-2">
          <h3>Implementation Steps </h3>
          <label className="label-agree-term">Step Name*</label>
          <input
            type="text"
            name="name"
            value={stepformData.name}
            placeholder="name"
            onChange={handleStepChange}
            onBlur={validateStepName}
          />
          {stepRequiredFields.name !== "" ? (
            <p className="error"> {stepRequiredFields.name}</p>
          ) : (
            ""
          )}

          <label className="label-agree-term">Step Type*</label>

          <div className="select-list">
            <select
              name="stepType"
              id="stepType"
              value={stepType}
              onChange={handleStep}
              onBlur={validateStepType}
            >
              <option>Select StepType</option>
              {names.map((mat) => (
                <option value={mat}>{mat}</option>
              ))}
            </select>
          </div>
          {stepRequiredFields.stepType !== "" ? (
            <p className="error mt-2"> {stepRequiredFields.stepType}</p>
          ) : (
            ""
          )}

          {stepType === "Material" ? (
            <>
              <label className="label-agree-term">{stepType}</label>

              <div className="select-list">
                <select
                  name="material"
                  id="material"
                  value={material}
                  onChange={handleStepChange}
                  onBlur={validateMaterial}
                >
                  <option value="">Select Material</option>

                  {materialList
                    ? materialList.map((mat) => (
                        <option value={mat._id}>{mat.name}</option>
                      ))
                    : ""}
                </select>
              </div>
              {stepRequiredFields.material !== "" ? (
                <p className="error mt-2"> {stepRequiredFields.material}</p>
              ) : (
                ""
              )}
            </>
          ) : stepType === "Field" ? (
            <>
              <label className="label-agree-term ">Skill Field*</label>

              <div className="select-list">
                <select
                  name="skillField"
                  id="skillField"
                  value={formDataSkillField.skillField}
                  onChange={handleSkillChange}
                  onBlur={ValidateSkillField}
                >
                  <option value="">Select skillField</option>

                  {skillfieldList
                    ? skillfieldList.map((mat) => (
                        <option value={mat._id}>{mat.skillField}</option>
                      ))
                    : ""}
                </select>
              </div>
              {skillRequiredFields.skillField !== "" ? (
                <p className="error "> {skillRequiredFields.skillField}</p>
              ) : (
                ""
              )}
              {skillList.length > 0 ? (
                formDataSkillField.skill === "Other" ? (
                  ""
                ) : (
                  <>
                    <label className="label-agree-term ">Skill*</label>
                    <div className="select-list">
                      <select
                        name="skill"
                        id="skill"
                        value={formDataSkillField.skill}
                        onChange={handleSkillChange}
                        onBlur={ValidateSkill}
                      >
                        <option value="">Select skill</option>

                        {skillList
                          ? skillList.map((mat) => (
                              <option value={mat}>{mat}</option>
                            ))
                          : ""}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {skillRequiredFields.skill !== "" ? (
                      <p className="error "> {skillRequiredFields.skill}</p>
                    ) : (
                      ""
                    )}
                  </>
                )
              ) : (
                ""
              )}
              {formDataSkillField.skill === "Other" ? (
                <input
                  type="text"
                  name="otherSKill"
                  id="otherSKill"
                  placeholder="Enter your Skill"
                  value={otherSKill}
                  onChange={(e) => {
                    ValidateOtherSkill();
                    setotherSkill(e.target.value);
                  }}
                  onBlur={ValidateOtherSkill}
                />
              ) : (
                ""
              )}
              {skillRequiredFields.otherSKill !== "" ? (
                <p className="error mt-2"> {skillRequiredFields.otherSKill}</p>
              ) : (
                ""
              )}
              <label className="label-agree-term ">Speciality*</label>
              <input
                type="text"
                name="speciality"
                id="title"
                value={formDataSkillField.speciality}
                placeholder="Speciality"
                onChange={handleSkillChange}
                onBlur={validateSpeciality}
              />
              {skillRequiredFields.speciality !== "" ? (
                <p className="error"> {skillRequiredFields.speciality}</p>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}

          {stepRequiredFields.error !== "" ? (
            <p className="error mt-2"> {stepRequiredFields.error}</p>
          ) : (
            ""
          )}
          <br />

          <label className="label-agree-term">Project Status*</label>

          <div className="select-list">
            <select
              name="status"
              id="Type"
              value={stepformData.status}
              onChange={handleStepChange}
              onBlur={validateStatus}
            >
              <option value="">Select status</option>

              <option value="completed">completed</option>
              <option value="InProgress">InProgress</option>
              <option value="NoProgress">NoProgress</option>
            </select>
          </div>
          {stepRequiredFields.status !== "" ? (
            <p className="error mt-2"> {stepRequiredFields.status}</p>
          ) : (
            ""
          )}
          <label className="label-agree-term">Description*</label>
          <textarea
            rows={3}
            cols={5}
            type="text"
            name="description"
            className="form-control "
            id="title"
            value={stepformData.description}
            placeholder="Description"
            onChange={handleStepChange}
            onBlur={validateDescription}
          ></textarea>
          {/* <input
            type="text"
            name="description"
            id="title"
            value={stepformData.description}
            placeholder="Description"
            onChange={handleStepChange}
            onBlur={validateDescription}
          /> */}
          {stepRequiredFields.description !== "" ? (
            <p className="error mt-3"> {stepRequiredFields.description}</p>
          ) : (
            ""
          )}

          {Object.values(stepformData).length > 0 ? (
            <Button
              variant="contained"
              onClick={onAdd}
              name="add"
              className="submitAdd mt-3"
            >
              Add
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled
              name="add"
              className="submitAdd mt-3"
            >
              Add
            </Button>
          )}
        </div>
        <div className="form-submit mt-3">
          {isLoading === true ? (
            <center>
              <div className={useStyles.root}>
                <CircularProgress disableShrink />
              </div>
            </center>
          ) : stepArrayData.length > 0 ? (
            <Button
              variant="contained"
              onClick={onSubmit}
              name="add"
              className="submit"
            >
              Submit
            </Button>
          ) : (
            <Button variant="contained" disabled name="add" className="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export default Form;
