import React from "react";
import Autocomplete from "react-autocomplete";
// import { withFormik } from "formik";
// import Debug from "./Debug";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import MultipleSelect from "../shared/MultipleSelect";
import { names } from "../shared/Data";
import { useStyles } from "../Theme/styles";
import ChipArray from "../shared/Chip";
function Form({
  errors,
  address,
  onAdd,
  handleChange,
  onSubmit,
  error,
  isLoading,
  //   validator
  handleName,
  handleDescription,
  handleTitle,
  validateCategory,
  validateStepType,
  stepRequiredFields,
  validateStatus,
  validateSpeciality,
  validateProjectType,
  validateCity,
  validatePhoto,
  validateGenralDesc,
  validateMaterial,
  // validateProgress,
  // validator
  setmaterialArrayData,
  skillRequiredFields,
  handleSkillChange,
  aboutRequiredFields,
  materialArrayData,
  formData,
  items,
  getAddress,
  SetAddress,
  CategoryList,
  stepformData,
  handleStepChange,
  skillField,
  stepType,
  setstepType,
  material,
  formDataSkillField,
  materialList,
  skillfieldList,
  skillList,
  formDataCity,
  setPhoto,
  iserror,
  stepArrayData,
  // setFormDataSkillField,
}) {
  const handleStep = (e) => {
    if (e.target.name === "Field") {
      const array = [];
      setmaterialArrayData(array);
    }

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
            onBlur={handleTitle}
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
              <option value=""></option>
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
            // shouldItemRender={(item, value) =>
            //   item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
            // }
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
            // value={formData.general_photo}
            onChange={(e) => {
              const file = e.target.files[0];
              console.log(file, "photo1");

              setPhoto(file);
            }}
            // onBlur={validatePhoto}
          />
          {aboutRequiredFields.general_photo !== "" ? (
            <p className="error"> {aboutRequiredFields.general_photo}</p>
          ) : (
            ""
          )}

          <label className="label-agree-term">General Description*</label>

          <input
            type="text"
            name="general_description"
            id="general_description"
            value={formData.general_description}
            onChange={handleChange}
            onBlur={validateGenralDesc}
            placeholder="Description"
          />
          {aboutRequiredFields.general_description !== "" ? (
            <p className="error"> {aboutRequiredFields.general_description}</p>
          ) : (
            ""
          )}

          <label className="label-agree-term">Category*</label>

          <div className="select-list">
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={validateCategory}
            >
              <option value=""></option>

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
            onBlur={handleName}
          />
          {stepRequiredFields.name !== "" ? (
            <p className="error"> {stepRequiredFields.name}</p>
          ) : (
            ""
          )}

          <label className="label-agree-term">Step Type*</label>

          <div className="select-list">
            {/* <MultipleSelect
              name="stepType"
              value={stepType}
              // validateStepType={validateStepType}
              handleStepChange={handleStep}
              // stepformData={stepformData}
              data={names}
            /> */}
            <select
              name="stepType"
              id="stepType"
              value={stepType}
              onChange={handleStep}
              // onBlur={validateMaterial}
            >
              <option>Select StepType</option>
              {names
                ? names.map((mat) => <option value={mat}>{mat}</option>)
                : ""}
            </select>
          </div>
          {stepRequiredFields.stepType !== "" ? (
            <p className="error"> {stepRequiredFields.stepType}</p>
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
                  {materialList
                    ? materialList.map((mat) => (
                        <option value={mat._id}>{mat.name}</option>
                      ))
                    : ""}
                </select>
              </div>
              {stepRequiredFields.material !== "" ? (
                <p className="error"> {stepRequiredFields.material}</p>
              ) : (
                ""
              )}
            </>
          ) : stepType === "Field" ? (
            <>
              <label className="label-agree-term">Skill Field*</label>

              <div className="select-list">
                <select
                  name="skillField"
                  id="skillField"
                  value={formDataSkillField.skillField}
                  onChange={handleSkillChange}
                  // onBlur={validateStepType}
                >
                  <option value="">Select skillField</option>

                  {skillfieldList
                    ? skillfieldList.map((mat) => (
                        <option value={mat._id}>{mat.skillField}</option>
                      ))
                    : ""}
                </select>
              </div>
              <label className="label-agree-term">Skill*</label>
              <div className="select-list">
                <select
                  name="skill"
                  id="skill"
                  value={formDataSkillField.skill}
                  onChange={handleSkillChange}
                  // onBlur={validateStepType}
                >
                  <option value="">Select skill</option>

                  {skillList
                    ? skillList.map((mat) => <option value={mat}>{mat}</option>)
                    : ""}
                </select>
              </div>

              <label className="label-agree-term">Speciality*</label>
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
            <p className="error"> {stepRequiredFields.error}</p>
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
              <option value=""></option>

              <option value="completed">completed</option>
              <option value="InProgress">InProgress</option>
              <option value="NoProgress">NoProgress</option>
            </select>
          </div>
          {stepRequiredFields.status !== "" ? (
            <p className="error"> {stepRequiredFields.status}</p>
          ) : (
            ""
          )}
          <label className="label-agree-term">Description*</label>
          <input
            type="text"
            name="description"
            id="title"
            value={stepformData.description}
            placeholder="Description"
            onChange={handleStepChange}
            onBlur={handleDescription}
          />
          {stepRequiredFields.description !== "" ? (
            <p className="error"> {stepRequiredFields.description}</p>
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
        {error !== "" ? <p className="error"> {error}</p> : ""}
        {iserror !== "" ? <p className="error"> {iserror}</p> : ""}
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
