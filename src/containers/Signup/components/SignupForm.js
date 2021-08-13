import React from "react";
import SkillChipArray from "../../../Components/UI/SkillChipCard";
import InterestChip from "../../../Components/UI/Chip";

import AutoComplete from "../../../Components/AutoComplete";
import { scores } from "../../../shared/Data";
import TextArea from "../../../Components/UI/TextArea";
import TextField from "../../../Components/UI/TextField";
export default function SignupForm({
  handleChange,
  handleSocialChange,
  handleSkillChange,
  onMaterialChange,
  onMaterialAdd,
  onInterestChange,
  onInterestAdd,
  SetSkillFieldAddress,
  // FOrmData
  formData,
  socialformData,
  skillformData,
  skillArrayData,
  materialArrayData,
  skillFieldList,
  skillList,
  CategoryList,
  interestArrayData,
  setinterestArrayData,
  skillField,
  //   ************
  //   RequiredField States
  aboutRequiredFields,

  skillRequiredFields,
  materialRequiredFields,
  interestRequiredFields,
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
  validateInterest,
  validateFirstName,
  validateLastName,
  ValidateSkill,
  ValidateOtherSkill,
  validatePhoto,
  validateMaterial,
  validateCity,
  ValidateIntension,
  //   *********
  otherMaterial,
  setotherMaterial,
  ValidateOtherMaterial,
  materialList,
  CircularProgress,
  Button,
  onskillAdd,
  onSubmit,
  ChipArray,
  items,
  skillFieldItems,
  address,
  getAddress,
  SetAddress,
  setPhoto,
  otherSKill,
  setotherSkill,
  setskillArrayData,
  getSkillField,
  // **********
  material,
  interest,
  setmaterialArrayData,
  isLoading,
  useStyles,
  Link,
  addToast,
  showHide1,
  type1,
  type2,
  showHide2,
}) {
  return (
    <>
      <div>
        <Link to="/">
          <p className="p-4">
            <i
              class="fa fa-arrow-left"
              aria-hidden="true"
              style={{ fontSize: "18px" }}
            ></i>
            <span style={{ fontSize: "18px" }} className="pl-1">
              {" "}
              Back to home{" "}
            </span>
          </p>
        </Link>
      </div>
      <form
        method="POST"
        autocomplete="off"
        className="appointmentform"
        id="signup-form"
      >
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

          <TextField
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

          <TextField
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
            Email*
            {aboutRequiredFields.email !== "" ? (
              <p className="error"> {aboutRequiredFields.email}</p>
            ) : (
              ""
            )}
          </label>

          <TextField
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
            <TextField
              type={type1}
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={validatePassword}
            />
            {type1 === "password" ? (
              <i
                onClick={showHide1}
                class="fas fa-eye"
                style={{
                  color: "#000",
                  fontSize: "15px",
                  position: "absolute",
                  left: "31rem",
                  right: "0px",
                  top: "30.5rem",
                }}
              ></i>
            ) : (
              <i
                onClick={showHide1}
                class="fas fa-eye-slash"
                style={{
                  color: "#000",
                  fontSize: "15px",
                  position: "absolute",
                  left: "31rem",
                  right: "0px",
                  top: "30.5rem",
                }}
              ></i>
            )}
          </div>
          <label className="label-agree-term row">
            Confirm Password*
            {aboutRequiredFields.confirm_password !== "" ? (
              <p className="error"> {aboutRequiredFields.confirm_password}</p>
            ) : (
              ""
            )}
          </label>
          <div style={{ display: "flex" }}>
            {type2 == "password" ? (
              <i
                onClick={showHide2}
                class="fas fa-eye"
                style={{
                  color: "#000",
                  fontSize: "15px",
                  position: "absolute",
                  left: "31rem",
                  right: "0px",
                  top: "36.5rem",
                }}
              ></i>
            ) : (
              <i
                onClick={showHide2}
                class="fas fa-eye-slash"
                style={{
                  color: "#000",
                  fontSize: "15px",
                  position: "absolute",
                  left: "31rem",
                  right: "0px",
                  top: "36.5rem",
                }}
              ></i>
            )}
            <TextField
              type={type2}
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm_Password"
              value={formData.confirm_password}
              onChange={handleChange}
              onBlur={validateConfirmPassword}
            />
          </div>
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

          <TextField
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            name="profile_picture"
            id="profile_picture"
            onChange={(e) => {
              const file = e.target.files[0];
              const type = e.target.files[0].type;
              console.log(type, "type");
              if (
                type === "image/jpeg" ||
                type === "image/jpg" ||
                type === "image/png"
              ) {
                setPhoto(file);
              } else {
                addToast(`File should be png/jpg`, {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });
                document.getElementById("profile_picture").value = "";
                setPhoto("");
              }
              // validatePhoto(file);
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

          <TextField
            type="text"
            name="phone"
            id="phone"
            placeholder="0xxxxxxxxx"
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

          <TextField
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

          <TextArea
            rows={3}
            cols={5}
            type="text"
            name="profile_description"
            className="form-control"
            id="profile_description"
            placeholder="Décrivez-vous brièvement et mettez votre citation préférée"
            value={formData.profile_description}
            onChange={handleChange}
            onBlur={validateProfileDesc}
          />
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
          <AutoComplete
            items={skillFieldItems}
            SetAddress={SetSkillFieldAddress}
            getAddress={getSkillField}
            address={skillField}
            validateCity={ValidateSkillField}
          />

          {skillList.length > 0 ? (
            <>
              <label className="label-agree-term row">
                Skill*
                {skillRequiredFields.skill !== "" ? (
                  <p className="errorselect"> {skillRequiredFields.skill}</p>
                ) : (
                  ""
                )}
              </label>
              <div className="select-list">
                <select
                  name="skill"
                  id="skill"
                  value={skillformData.skill}
                  onChange={handleSkillChange}
                  onBlur={ValidateSkill}
                >
                  <option value="">Select Skill</option>
                  {skillList.map((skill) => (
                    <option value={skill}>{skill}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              {skillformData.skill === "Other" ? (
                <>
                  <label className="label-agree-term row ">
                    Other Skill*
                    {skillRequiredFields.otherSKill !== "" ? (
                      <p className="errorselect">
                        {" "}
                        {skillRequiredFields.otherSKill}
                      </p>
                    ) : (
                      ""
                    )}
                  </label>
                  <TextField
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

          {/*   Intentions field  */}
          {skillformData.skill.length > 0 ? (
            <>
              <label className="label-agree-term row">
                Intentions*
                {skillRequiredFields.intentions !== "" ? (
                  <p className="errorselect">
                    {" "}
                    {skillRequiredFields.intentions}
                  </p>
                ) : (
                  ""
                )}
              </label>
              <div className="select-list">
                <select
                  name="intentions"
                  id="intentions"
                  value={skillformData.intentions}
                  onChange={handleSkillChange}
                  onBlur={ValidateIntension}
                >
                  <option value="">Select intentions</option>
                  <option value="bénévole">bénévole</option>
                  <option value="troc">troc</option>
                  <option value="payé">payé</option>
                </select>
              </div>
              {/*Intentions End field*/}
            </>
          ) : (
            <></>
          )}

          <label className="label-agree-term">Specialization</label>
          <TextField
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
          <div className="select-list">
            <select
              name="score"
              id="score"
              value={skillformData.score}
              onChange={handleSkillChange}
              onBlur={validateScore}
            >
              <option value="">Select Score</option>
              {scores.map((skill) => (
                <option value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {skillArrayData.length < 5 ? (
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
          {skillArrayData && skillArrayData.length > 0 ? (
            <div
              className={
                skillArrayData
                  ? skillArrayData.length > 0
                    ? " mt-3 mb-2 stepDiv"
                    : ""
                  : ""
              }
            >
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
        </div>

        <label className="label-agree-term row">
          Material*{" "}
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
            <label className="label-agree-term row ">
              Other Material*
              {materialRequiredFields.otherMaterial !== "" ? (
                <p className="errorselect">
                  {" "}
                  {materialRequiredFields.otherMaterial}
                </p>
              ) : (
                ""
              )}
            </label>
            <TextField
              type="text"
              name="skill"
              id="skill"
              placeholder="Other"
              value={otherMaterial}
              onChange={(e) => {
                ValidateOtherMaterial();
                setotherMaterial(e.target.value);
              }}
              onBlur={ValidateOtherMaterial}
            />
          </>
        ) : (
          ""
        )}
        <Button
          variant="contained"
          onClick={onMaterialAdd}
          name="add"
          className="submit materialSubmit"
        >
          Add Material
        </Button>
        {materialArrayData.length > 0 ? (
          <div
            className={
              materialArrayData
                ? materialArrayData.length > 0
                  ? " mt-3 mb-2 stepDiv"
                  : ""
                : ""
            }
          >
            {materialArrayData
              ? materialArrayData.map((step, i) => (
                  <ChipArray
                    materialArrayData={materialArrayData}
                    materialList={materialList}
                    setmaterialArrayData={setmaterialArrayData}
                    addToast={addToast}
                    step={step}
                    otherMaterial={otherMaterial}
                    i={i}
                  />
                ))
              : ""}
          </div>
        ) : (
          ""
        )}
        {/*Add interests */}
        <label className="label-agree-term pt-4 row">
          Interests{" "}
          {interestRequiredFields.name !== "" ? (
            <p className="errorselect"> {interestRequiredFields.name}</p>
          ) : (
            ""
          )}
        </label>

        <div className="select-list">
          <select
            name="interest"
            id="interest"
            value={interest}
            onChange={onInterestChange}
            onBlur={validateInterest}
          >
            <option value="">Select Interest</option>

            {CategoryList
              ? CategoryList.map((mat) => (
                  <option value={mat._id}>{mat.name}</option>
                ))
              : ""}
          </select>
        </div>

        <Button
          variant="contained"
          onClick={onInterestAdd}
          name="add"
          className="submit materialSubmit"
        >
          Add Interest
        </Button>
        {interestArrayData.length > 0 ? (
          <div
            className={
              interestArrayData
                ? interestArrayData.length > 0
                  ? " mt-3 mb-2 stepDiv"
                  : ""
                : ""
            }
          >
            {interestArrayData
              ? interestArrayData.map((step, i) => (
                  <InterestChip
                    materialArrayData={interestArrayData}
                    materialList={CategoryList}
                    setmaterialArrayData={setinterestArrayData}
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
        <div className="form-group-2">
          <h3>Social Links</h3>
          <label className="label-agree-term">Facebook</label>
          <TextField
            type="text"
            name="facebook"
            id="facebook"
            placeholder="https://www.facebook.com/"
            value={socialformData.facebook}
            onChange={handleSocialChange}
            onpaste={handleSocialChange}
          />
          <label className="label-agree-term">Instgram</label>

          <TextField
            type="text"
            name="instagram"
            id="instagram"
            placeholder="https://www.instagram.com"
            value={socialformData.instagram}
            onChange={handleSocialChange}
            onpaste={handleSocialChange}
          />
          <label className="label-agree-term">Youtube</label>

          <TextField
            type="text"
            name="youtube"
            id="youtube"
            placeholder="https://www.youtube.com"
            value={socialformData.youtube}
            onChange={handleSocialChange}
            onpaste={handleSocialChange}
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
    </>
  );
}
