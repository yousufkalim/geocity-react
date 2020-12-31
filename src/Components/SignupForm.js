import React from "react";
import SkillChipArray from "../shared/skillChipCard";
import AutoComplete from "./AutoComplete";
export default function SignupForm({
  handleChange,
  handleSkillChange,
  onMaterialChange,
  onMaterialAdd,
  // FOrmData
  formData,
  skillformData,
  skillArrayData,
  materialArrayData,
  skillFieldList,
  skillList,
  //   ************
  //   RequiredField States
  aboutRequiredFields,

  skillRequiredFields,
  materialRequiredFields,
  //   ***********
  //   validation
  validateAvailability,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateProfileDesc,
  validateScore,
  ValidateSkillField,
  ValidateUsername,
  validateFirstName,
  validateLastName,
  ValidateSkill,
  ValidateOtherSkill,
  validatePhoto,
  validateMaterial,
  validateCity,
  //   *********
  materialList,
  CircularProgress,
  Button,
  onskillAdd,
  onSubmit,
  ChipArray,
  items,
  address,
  getAddress,
  SetAddress,
  setPhoto,
  otherSKill,
  setotherSkill,
  setskillArrayData,
  // **********
  material,
  setmaterialArrayData,
  isLoading,
  useStyles,
  Link,
  addToast,
  type,
  showHide,
}) {
  return (
    <form method="POST" className="appointmentform" id="appointment-form">
      <h2>Sign Up form</h2>
      <div className="form-group-1">
        <label className="label-agree-term row">
          First Name*
          {aboutRequiredFields.firstname !== "" ? (
            <p className="error"> {aboutRequiredFields.firstname}</p>
          ) : (
            ""
          )}
        </label>

        <input
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          placeholder="First name"
          onChange={handleChange}
          onBlur={validateFirstName}
          // onFocus={validateFirstName}
        />

        <label className="label-agree-term row">
          Last Name*
          {aboutRequiredFields.lastname !== "" ? (
            <p className="error"> {aboutRequiredFields.lastname}</p>
          ) : (
            ""
          )}
        </label>

        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          placeholder="Last name"
          onChange={handleChange}
          onBlur={validateLastName}
          // onFocus={validateLastName}
        />

        <label className="label-agree-term row">
          User Name*
          {aboutRequiredFields.username !== "" ? (
            <p className="error"> {aboutRequiredFields.username}</p>
          ) : (
            ""
          )}
        </label>

        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          placeholder="e.g John123"
          onChange={handleChange}
          onBlur={ValidateUsername}
        />

        <label className="label-agree-term row">
          Email*
          {aboutRequiredFields.email !== "" ? (
            <p className="error"> {aboutRequiredFields.email}</p>
          ) : (
            ""
          )}
        </label>

        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={validateEmail}
        />

        <label className="label-agree-term row">
          Password*
          {aboutRequiredFields.password !== "" ? (
            <p className="error"> {aboutRequiredFields.password}</p>
          ) : (
            ""
          )}
        </label>
        <div style={{ display: "flex" }}>
          <input
            type={type}
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={validatePassword}
          />
          <i
            onClick={showHide}
            class="fas fa-eye"
            style={{
              color: "#000",
              fontSize: "15px",
              position: "absolute",
              left: "31rem",
              right: "0px",
              top: "33.5rem",
            }}
          ></i>
        </div>
        <label className="label-agree-term row">
          Confirm Password*
          {aboutRequiredFields.confirm_password !== "" ? (
            <p className="error"> {aboutRequiredFields.confirm_password}</p>
          ) : (
            ""
          )}
        </label>
        {/* <div style={{ display: "flex" }}>
          <i
            onClick={showHide}
            class="fas fa-eye"
            style={{
              color: "#000",
              fontSize: "15px",
              position: "absolute",
              left: "31rem",
              right: "0px",
              top: "39.2rem",
            }}
          ></i> */}
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm_Password"
          value={formData.confirm_password}
          onChange={handleChange}
          onBlur={validateConfirmPassword}
        />
        {/* </div> */}
        <label className="label-agree-term row">
          Address*
          {aboutRequiredFields.city !== "" ? (
            <p className="errorcity">{aboutRequiredFields.city}</p>
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

        <label className="label-agree-term">Profile Picture</label>

        <input
          type="file"
          name="profile_picture"
          id="profile_picture"
          onChange={(e) => {
            const file = e.target.files[0];
            console.log(file, "photo1");
            // validatePhoto(file);

            setPhoto(file);
          }}
        />

        <label className="label-agree-term row">
          Phone Number*(10 digit only){" "}
          {aboutRequiredFields.phone !== "" ? (
            <p className="error"> {aboutRequiredFields.phone}</p>
          ) : (
            ""
          )}
        </label>

        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="e.g 3017614142"
          value={formData.phone}
          onChange={handleChange}
          onBlur={validatePhoneNumber}
        />

        <label className="label-agree-term row">
          Availability(Hours per week)*{" "}
          {aboutRequiredFields.availability !== "" ? (
            <p className="error"> {aboutRequiredFields.availability}</p>
          ) : (
            ""
          )}
        </label>

        <input
          type="number"
          max={167}
          name="availability"
          id="availability"
          value={formData.availability}
          onChange={handleChange}
          onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
          onBlur={validateAvailability}
        />

        <label className="label-agree-term row">
          Profile Description*{" "}
          {aboutRequiredFields.profile_description !== "" ? (
            <p className="error mt-1">
              {" "}
              {aboutRequiredFields.profile_description}
            </p>
          ) : (
            ""
          )}
        </label>

        <textarea
          rows={3}
          cols={5}
          type="text"
          name="profile_description"
          className="form-control"
          id="profile_description"
          placeholder="Profile_description"
          value={formData.profile_description}
          onChange={handleChange}
          onBlur={validateProfileDesc}
        ></textarea>
      </div>

      <div className="form-group-2">
        <h3>Skills</h3>
        <label className="label-agree-term row">
          SkillField*
          {skillRequiredFields.skillField !== "" ? (
            <p className="errorselect"> {skillRequiredFields.skillField}</p>
          ) : (
            ""
          )}
        </label>

        <div className="select-list">
          <select
            name="skillField"
            id="skillField"
            value={skillformData.skillField}
            onChange={handleSkillChange}
            onBlur={ValidateSkillField}
          >
            <option>Select SkillField</option>

            {skillFieldList
              ? skillFieldList.map((skill) => (
                  <option value={skill._id}>{skill.skillField}</option>
                ))
              : ""}
          </select>
        </div>

        {skillList.length > 0 ? (
          <>
            <label className="label-agree-term row">
              Skill*
              {skillRequiredFields.skill !== "" ? (
                <p className="errorselect"> {skillRequiredFields.skill}</p>
              ) : (
                ""
              )}
            </label>{" "}
            {/* <br /> */}
            <div className="select-list">
              <select
                name="skill"
                id="skill"
                value={skillformData.skill}
                onChange={handleSkillChange}
                onBlur={ValidateSkill}
              >
                <option>Select Skill</option>
                {skillList.map((skill) => (
                  <option value={skill}>{skill}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            {skillformData.skill === "Other" ? (
              <>
                <label className="label-agree-term row ">
                  Other*
                  {skillRequiredFields.otherSKill !== "" ? (
                    <p className="errorselect">
                      {" "}
                      ({skillRequiredFields.otherSKill})
                    </p>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  type="text"
                  name="skill"
                  id="skill"
                  placeholder="Other"
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
          </>
        ) : (
          ""
        )}

        <label className="label-agree-term">Specialization</label>

        <input
          type="text"
          onChange={handleSkillChange}
          // onBlur={ValidateSpecialization}
          name="specialization"
          id="specialization"
          placeholder="e.g Frontend developer"
          value={skillformData.specialization}
        />

        <label className="label-agree-term row">
          Rate Your Skill( 1 to 5)*
          {skillRequiredFields.score !== "" ? (
            <p className="error"> {skillRequiredFields.score}</p>
          ) : (
            ""
          )}
        </label>

        <input
          type="number"
          min={1}
          max={5}
          onChange={handleSkillChange}
          onBlur={validateScore}
          name="score"
          id="score"
          placeholder="Enter Score"
          value={skillformData.score}
        />

        {skillArrayData && skillArrayData.length > 0 ? (
          <div className="mt-2 mb-2">
            {skillArrayData
              ? skillArrayData.map((step, i) => (
                  <SkillChipArray
                    skillArrayData={skillArrayData ? skillArrayData : ""}
                    setskillArrayData={setskillArrayData}
                    skillFieldList={skillFieldList}
                    addToast={addToast}
                    step={step}
                    i={i}
                  />
                ))
              : ""}
          </div>
        ) : (
          ""
        )}
        {skillArrayData.length < 3 ? (
          <Button
            variant="contained"
            onClick={onskillAdd}
            name="add"
            className="submit "
          >
            Add Skill
          </Button>
        ) : (
          <Button variant="contained" disabled name="add" className="submit ">
            Add Skill
          </Button>
        )}
      </div>

      <label className="label-agree-term row">
        Material*{" "}
        {materialRequiredFields.name !== "" ? (
          <p className="errorselect"> {materialRequiredFields.name}</p>
        ) : (
          ""
        )}
        {materialRequiredFields.error !== "" ? (
          <p className="error "> {materialRequiredFields.error}</p>
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
        </select>
      </div>

      {materialArrayData.length > 0 ? (
        <div className="mt-2 mb-3">
          {materialArrayData
            ? materialArrayData.map((step, i) => (
                <ChipArray
                  materialArrayData={materialArrayData}
                  materialList={materialList}
                  setmaterialArrayData={setmaterialArrayData}
                  addToast={addToast}
                  step={step}
                  i={i}
                />
              ))
            : ""}
        </div>
      ) : (
        ""
      )}

      <Button
        variant="contained"
        onClick={onMaterialAdd}
        name="add"
        className="submit "
      >
        Add Material
      </Button>

      <div className="form-group-2">
        <h3>Social Links</h3>
        <label className="label-agree-term">Facebook</label>
        <input
          type="text"
          name="facebook"
          id="facebook"
          placeholder="https://www.facebook.com/"
          value={formData.facebook}
          onChange={handleChange}
          onpaste={handleChange}
        />
        <label className="label-agree-term">Instgram</label>

        <input
          type="text"
          name="instagram"
          id="instagram"
          placeholder="https://www.instagram.com"
          value={formData.instagram}
          onChange={handleChange}
          onpaste={handleChange}
        />
        <label className="label-agree-term">Youtube</label>

        <input
          type="text"
          name="youtube"
          id="youtube"
          placeholder="https://www.youtube.com"
          value={formData.youtube}
          onChange={handleChange}
          onpaste={handleChange}
        />
      </div>
      <div>
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
            className="submit"
          >
            Submit
          </Button>
        )}
      </div>

      <p className="text-left ml-1 mt-3">
        <span style={{ opacity: 0.5 }}> Already have an account? </span>
        <Link to="/Login">
          <span style={{ fontSize: "15px", color: "#77b5dd" }} id="register">
            Login
          </span>
        </Link>
      </p>
    </form>
  );
}
