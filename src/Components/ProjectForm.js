import React from "react";
import AutoComplete from "./AutoComplete";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { names } from "../shared/Data";
import { useStyles } from "../Theme/styles";
import StepCard from "../shared/StepCard";
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
  validateCity,
  // validator
  setmaterialArrayData,
  skillRequiredFields,
  handleSkillChange,
  aboutRequiredFields,
  cityRequiredFields,
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
  setotherMaterial,
  otherMaterial,
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
  HandleStepDelete,
  projectskillData,
  setFormDataSkillField,
  setMaterial,
  onMaterialChange,
  ValidateOtherMaterial,

  materialRequiredFields,
}) {
  const handleStep = (e) => {
    if (e.target.name === "Field") {
      const array = [];
      setmaterialArrayData(array);
      setMaterial("");
    } else {
      setFormDataSkillField(projectskillData);
    }

    setstepType(e.target.value);
  };
  return (
    <>
      <form method="POST" className="appointmentform" id="appointment-form">
        <h2>Create A Project</h2>
        <div className="form-group-1">
          <label className="label-agree-term row">
            Project Title*
            {aboutRequiredFields.title !== "" ? (
              <p className="error"> {aboutRequiredFields.title}</p>
            ) : (
              ""
            )}
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleChange}
            onBlur={validateTitle}
          />

          <label className="label-agree-term row">
            Project Type*
            {aboutRequiredFields.type !== "" ? (
              <p className="errorselect"> {aboutRequiredFields.type}</p>
            ) : (
              ""
            )}
          </label>

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

          <label className="label-agree-term row">
            Address*
            {cityRequiredFields.city !== "" ? (
              <p className="error "> {cityRequiredFields.city}</p>
            ) : (
              ""
            )}
          </label>
          <AutoComplete
            items={items}
            SetAddress={SetAddress}
            getAddress={getAddress}
            address={address}
            validateCity={validateCity}
          />
          <label className="label-agree-term row">General Photo</label>

          <input
            type="file"
            name="general_photo"
            id="file"
            onChange={(e) => {
              const file = e.target.files[0];
              console.log(file, "photo1");
              setPhoto(file);
            }}
          />

          <label className="label-agree-term row">
            General Description*
            {aboutRequiredFields.general_description !== "" ? (
              <p className="error ">
                {aboutRequiredFields.general_description}
              </p>
            ) : (
              ""
            )}
          </label>
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

          <label className="label-agree-term row">
            Category*
            {aboutRequiredFields.category !== "" ? (
              <p className="errorselect"> {aboutRequiredFields.category}</p>
            ) : (
              ""
            )}
          </label>

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
        </div>
        {/* form1 end */}
        {/* form 2 */}
        <div className="form-group-2">
          <h3>Implementation Steps </h3>
          <label className="label-agree-term row">
            Step Name*
            {stepRequiredFields.name !== "" ? (
              <p className="error"> {stepRequiredFields.name}</p>
            ) : (
              ""
            )}
          </label>
          <input
            type="text"
            name="name"
            value={stepformData.name}
            placeholder="name"
            onChange={handleStepChange}
            onBlur={validateStepName}
          />

          <label className="label-agree-term row">
            Step Type*
            {stepRequiredFields.stepType !== "" ? (
              <p className="errorselect "> {stepRequiredFields.stepType}</p>
            ) : (
              ""
            )}
          </label>

          <div className="select-list">
            <select
              name="stepType"
              id="stepType"
              value={stepType}
              onChange={handleStep}
              onBlur={validateStepType}
            >
              <option value="">Select StepType</option>
              {names.map((mat) => (
                <option value={mat}>{mat}</option>
              ))}
            </select>
          </div>

          {stepType === "Material" ? (
            <>
              <label className="label-agree-term row">
                {stepType}*
                {materialRequiredFields.name !== "" ? (
                  <p className="errorselect"> {materialRequiredFields.name}</p>
                ) : (
                  ""
                )}
              </label>

              <div className="select-list">
                <select
                  name="material"
                  id="material"
                  value={material}
                  onChange={onMaterialChange}
                  onBlur={validateMaterial}
                >
                  <option value="">Select Material</option>

                  {materialList
                    ? materialList.map((mat) => (
                        <option value={mat._id}>{mat.name}</option>
                      ))
                    : ""}
                  <option value="Other">Other</option>
                </select>
              </div>
              {material === "Other" ? (
                <>
                  <label className="label-agree-term row">
                    Other material*{" "}
                    {materialRequiredFields.otherMaterial !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {materialRequiredFields.otherMaterial}
                      </p>
                    ) : (
                      ""
                    )}
                  </label>

                  <input
                    type="text"
                    onChange={(e) => setotherMaterial(e.target.value)}
                    // onBlur={validateScore}
                    name="other"
                    id="score"
                    placeholder="Enter your material"
                    value={otherMaterial}
                    onBlur={ValidateOtherMaterial}
                  />
                </>
              ) : (
                ""
              )}
            </>
          ) : stepType === "Field" ? (
            <>
              <label className="label-agree-term row">
                Skill Field*
                {skillRequiredFields.skillField !== "" ? (
                  <p className="errorselect ">
                    {" "}
                    {skillRequiredFields.skillField}
                  </p>
                ) : (
                  ""
                )}
              </label>

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

              {skillList.length > 0 ? (
                <>
                  <label className="label-agree-term row ">
                    Skill*{" "}
                    {skillRequiredFields.skill !== "" ? (
                      <p className="errorselect ">
                        {" "}
                        {skillRequiredFields.skill}
                      </p>
                    ) : (
                      ""
                    )}
                  </label>
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
                </>
              ) : (
                ""
              )}

              {formDataSkillField.skill === "Other" ? (
                <>
                  <label className="label-agree-term row ">
                    Other{" "}
                    {skillRequiredFields.otherSKill !== "" ? (
                      <p className="error mt-2">
                        {" "}
                        {skillRequiredFields.otherSKill}
                      </p>
                    ) : (
                      ""
                    )}
                  </label>
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
                </>
              ) : (
                ""
              )}

              <label className="label-agree-term row">
                Speciality*
                {skillRequiredFields.speciality !== "" ? (
                  <p className="error"> {skillRequiredFields.speciality}</p>
                ) : (
                  ""
                )}
                {stepRequiredFields.error !== "" ? (
                  <p className="error mt-2"> {stepRequiredFields.error}</p>
                ) : (
                  ""
                )}
              </label>
              <input
                type="text"
                name="speciality"
                id="title"
                value={formDataSkillField.speciality}
                placeholder="Speciality"
                onChange={handleSkillChange}
                onBlur={validateSpeciality}
              />
            </>
          ) : (
            ""
          )}

          <br />

          <label className="label-agree-term row">
            Project Status*
            {stepRequiredFields.status !== "" ? (
              <p className="errorselect"> {stepRequiredFields.status}</p>
            ) : (
              ""
            )}
          </label>

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

          <label className="label-agree-term row">
            Description*
            {stepRequiredFields.description !== "" ? (
              <p className="error mt-1"> {stepRequiredFields.description}</p>
            ) : (
              ""
            )}
          </label>
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

          <Button
            variant="contained"
            onClick={onAdd}
            name="add"
            className="submit mt-3"
          >
            Add Step
          </Button>
        </div>
        <div
          className={
            stepArrayData
              ? stepArrayData.length > 0
                ? " mt-3 stepDiv"
                : ""
              : ""
          }
        >
          {stepArrayData
            ? stepArrayData.map((step, i) => (
                <StepCard
                  i={i}
                  step={step}
                  HandleStepDelete={HandleStepDelete}
                  materialList={materialList}
                  skillfieldList={skillfieldList}
                />
              ))
            : ""}
        </div>
        <div
          className="form-submit mt-2"
          style={{ display: "flex", alignContent: "flex-end", width: "100%" }}
        >
          {isLoading === true ? (
            <center>
              <div className={useStyles.root}>
                <CircularProgress disableShrink />
              </div>
            </center>
          ) : (
            <Button
              variant="contained"
              onClick={onSubmit}
              name="add"
              style={{
                position: "relative",
                margin: "auto",
                marginLeft: "21rem",
              }}
              className="submit text-right"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export default Form;
