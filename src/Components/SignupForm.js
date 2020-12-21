import React from "react";
export default function SignupForm({
  aboutRequiredFields,
  handleChange,
  handleSkillChange,
  onMaterialChange,
  // FOrmData
  formData,
  skillformData,
  skillArrayData,
  materialArrayData,
  skillFieldList,
  skillList,
  //   ************
  //   RequiredField States
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
  //   *********
  materialList,
  CircularProgress,
  Button,
  onskillAdd,
  onSubmit,
  ChipArray,
  Autocomplete,
  items,
  address,
  getAddress,
  SetAddress,
  setPhoto,
  // **********
  material,
  setmaterialArrayData,
  isLoading,
  useStyles,
  Link,
  addToast,
}) {
  return (
    <form method="POST" className="appointmentform" id="appointment-form">
      <h2>Sign Up form</h2>
      <div className="form-group-1">
        <label className="label-agree-term">First Name*</label>

        <input
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          placeholder="First name"
          onChange={handleChange}
          onBlur={validateFirstName}
          onFocus={validateFirstName}
        />
        {aboutRequiredFields.firstname !== "" ? (
          <p className="error"> {aboutRequiredFields.firstname}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">Last Name*</label>

        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          placeholder="Last name"
          onChange={handleChange}
          onBlur={validateLastName}
          onFocus={validateLastName}
        />
        {aboutRequiredFields.lastname !== "" ? (
          <p className="error"> {aboutRequiredFields.lastname}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">User Name*</label>

        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          onFocus={ValidateUsername}
        />
        {aboutRequiredFields.username !== "" ? (
          <p className="error"> {aboutRequiredFields.username}</p>
        ) : (
          ""
        )}

        <label className="label-agree-term">Email *</label>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={validateEmail}
        />
        {aboutRequiredFields.email !== "" ? (
          <p className="error"> {aboutRequiredFields.email}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">Password*</label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={validatePassword}
        />
        {aboutRequiredFields.password !== "" ? (
          <p className="error"> {aboutRequiredFields.password}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">Confirm Password*</label>

        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm_Password"
          value={formData.confirm_password}
          onChange={handleChange}
          onBlur={validateConfirmPassword}
        />
        {aboutRequiredFields.confirm_password !== "" ? (
          <p className="error"> {aboutRequiredFields.confirm_password}</p>
        ) : (
          ""
        )}
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
        {aboutRequiredFields.city !== "" ? (
          <p className="error"> {aboutRequiredFields.city}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">Profile Picture*</label>

        <input
          type="file"
          name="profile_picture"
          id="profile_picture"
          onChange={(e) => {
            const file = e.target.files[0];
            console.log(file, "photo1");

            setPhoto(file);
          }}
        />
        {aboutRequiredFields.profile_picture !== "" ? (
          <p className="error"> {aboutRequiredFields.profile_picture}</p>
        ) : (
          ""
        )}

        <label className="label-agree-term">Phone Number*</label>

        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone_number"
          value={formData.phone}
          onChange={handleChange}
          onBlur={validatePhoneNumber}
        />
        {aboutRequiredFields.phone !== "" ? (
          <p className="error"> {aboutRequiredFields.phone}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">Availability*</label>

        <input
          type="text"
          name="availability"
          id="availability"
          placeholder="Enter Availability"
          value={formData.availability}
          onChange={handleChange}
          onBlur={validateAvailability}
        />
        {aboutRequiredFields.availability !== "" ? (
          <p className="error"> {aboutRequiredFields.availability}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">Profile Description*</label>

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
        {/* <input
  type="text"
  name="profile_description"
  id="profile_description"
  placeholder="Profile_description"
  value={formData.profile_description}
  onChange={handleChange}
  onBlur={validateProfileDesc}
/> */}
        {aboutRequiredFields.profile_description !== "" ? (
          <p className="error mt-3">
            {" "}
            {aboutRequiredFields.profile_description}
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="form-group-2">
        <h3>Skills</h3>
        <label className="label-agree-term">Skill Field*</label>

        <div className="select-list">
          <select
            name="skillField"
            id="skillField"
            value={skillformData.skillField}
            onChange={handleSkillChange}
            onBlur={ValidateSkillField}
          >
            <option>Select SelectField</option>

            {skillFieldList
              ? skillFieldList.map((skill) => (
                  <option value={skill._id}>{skill.skillField}</option>
                ))
              : ""}
          </select>
        </div>
        {skillRequiredFields.skillField !== "" ? (
          <p className="error"> {skillRequiredFields.skillField}</p>
        ) : (
          ""
        )}
        {skillList.length > 0 ? (
          <>
            <label className="label-agree-term">Skill*</label> <br />
            <div className="select-list">
              <select
                name="skill"
                id="skill"
                value={skillformData.skill}
                onChange={handleSkillChange}
                onBlur={ValidateSkillField}
              >
                <option>Select Select</option>

                {skillList.map((skill) => (
                  <option value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            {skillRequiredFields.skill !== "" ? (
              <p className="error"> {skillRequiredFields.skill}</p>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        <label className="label-agree-term">Specialization*</label>

        <input
          type="text"
          onChange={handleSkillChange}
          // onBlur={ValidateSpecialization}
          name="specialization"
          id="specialization"
          placeholder="Enter Specialization"
          value={skillformData.specialization}
        />
        {skillRequiredFields.specialization !== "" ? (
          <p className="error"> {skillRequiredFields.specialization}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">Score*</label>

        <input
          type="text"
          onChange={handleSkillChange}
          onBlur={validateScore}
          name="score"
          id="score"
          placeholder="Enter Score"
          value={skillformData.score}
        />
        {skillRequiredFields.score !== "" ? (
          <p className="error"> {skillRequiredFields.score}</p>
        ) : (
          ""
        )}
        <label className="label-agree-term">Material*</label>

        <div className="select-list">
          <select
            name="material"
            id="material"
            value={material}
            onChange={onMaterialChange}
            // onBlur={validateMaterial}
          >
            <option value="">Select Material</option>

            {materialList
              ? materialList.map((mat) => (
                  <option value={mat._id}>{mat.name}</option>
                ))
              : ""}
          </select>
        </div>
        {materialRequiredFields.name !== "" ? (
          <p className="error"> {materialRequiredFields.name}</p>
        ) : (
          ""
        )}
        {materialArrayData.length > 0 ? (
          <div className="mt-2 mb-3">
            <ChipArray
              materialArrayData={materialArrayData}
              materialList={materialList}
              setmaterialArrayData={setmaterialArrayData}
              addToast={addToast}
            />
            {materialRequiredFields.error !== "" ? (
              <p className="error"> {materialRequiredFields.error}</p>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {Object.values(skillformData).length > 0 ? (
          <Button
            variant="contained"
            onClick={onskillAdd}
            name="add"
            className="submitAdd"
          >
            Add
          </Button>
        ) : (
          <Button variant="contained" disabled name="add" className="submitAdd">
            Add
          </Button>
        )}
      </div>

      <div className="form-group-2">
        <h3>Social Links</h3>
        <label className="label-agree-term">Facebook*</label>
        <input
          type="text"
          name="facebook"
          id="facebook"
          placeholder="https://www.facebook.com/"
          value={formData.facebook}
          onChange={handleChange}
          onpaste={handleChange}
        />
        <label className="label-agree-term">Instgram*</label>

        <input
          type="text"
          name="instagram"
          id="instagram"
          placeholder="https://www.instagram.com"
          value={formData.instagram}
          onChange={handleChange}
          onpaste={handleChange}
        />
        <label className="label-agree-term">Youtube*</label>

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
        ) : materialArrayData.length > 0 && skillArrayData.length > 0 ? (
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
