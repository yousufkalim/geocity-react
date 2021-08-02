import React from "react";
import { scores } from "../../../shared/Data";
import AutoComplete from "../../../Components/AutoComplete";

export default function UserForm({
  formData,
  skillformData,
  handleSkillChange,
  skillArrayData,
  materialArrayData,
  handleChange,
  SetAddress,
  skillFieldItems,
  getSkillField,
  skillField,
  SetSkillFieldAddress,
  getAddress,
  items,
  skillList,
  skillFieldList,
  materialList,
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  Label,

  setPhoto,
  address,
  CategoryList,
  material,
  onMaterialChange,
  onskillAdd,
  onMaterialAdd,
  ChipArray,
  SkillChipArray,
  isLoading,
  useStyles,
  CircularProgress,
  onSubmit,
  setskillArrayData,
  setmaterialArrayData,
  addToast,
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
  validateFirstName,
  validateLastName,
  ValidateSkill,
  ValidateOtherSkill,
  validatePhoto,
  validateMaterial,
  validateCity,
  // ****
  otherSKill,
  setotherSkill,
  socialformData,
  handleSocialChange,
}) {
  return (
    <Form>
      <Row form>
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleEmail " className="row label">
              First Name*
              {aboutRequiredFields.firstname !== "" ? (
                <p className="error"> {aboutRequiredFields.firstname}</p>
              ) : (
                ""
              )}
            </Label>
            <Input
              type="text"
              name="firstname"
              id="firstName"
              value={formData.firstname}
              placeholder="First Name"
              onChange={handleChange}
              onBlur={validateFirstName}
            />
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleEmail" className="row label">
              Last Name*{" "}
              {aboutRequiredFields.lastname !== "" ? (
                <p className="error"> {aboutRequiredFields.lastname}</p>
              ) : (
                ""
              )}
            </Label>
            <Input
              type="text"
              name="lastname"
              id="lastName"
              value={formData.lastname}
              placeholder="Last Name"
              onChange={handleChange}
              onBlur={validateLastName}
            />
          </FormGroup>
        </Col>

        {/* <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleEmail">Email*</Label>
            <Input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="email"
              onChange={handleChange}
            />
          </FormGroup>
        </Col> */}
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleEmail" className="row label">
              Address*{" "}
              {aboutRequiredFields.city !== "" ? (
                <p className="error"> {aboutRequiredFields.city}</p>
              ) : (
                ""
              )}
            </Label>
            <AutoComplete
              items={items}
              SetAddress={SetAddress}
              getAddress={getAddress}
              address={address}
              validateCity={validateCity}
            />
          </FormGroup>
        </Col>

        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress" className="row label">
              Phone Number* (10 digit only){" "}
              {aboutRequiredFields.phone !== "" ? (
                <p className="error"> {aboutRequiredFields.phone}</p>
              ) : (
                ""
              )}
            </Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              placeholder="e.g 3017614142"
              onChange={handleChange}
              onBlur={validatePhoneNumber}
            />
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label
              for="exampleAddress"
              className="row label"
              style={{ flexWrap: "noWrap" }}
            >
              Availability* (Days per week)
            </Label>
            <Input
              type="number"
              name="availability"
              id="availability"
              value={formData.availability}
              placeholder="Availability"
              onChange={handleChange}
              onBlur={validateAvailability}
            />
            {aboutRequiredFields.availability !== "" ? (
              <p className="error"> {aboutRequiredFields.availability}</p>
            ) : (
              ""
            )}
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress" className="row label">
              Facebook
            </Label>
            <Input
              type="text"
              name="facebook"
              id="facebook"
              value={socialformData.facebook}
              placeholder="facebook"
              onChange={handleSocialChange}
              onpaste={handleSocialChange}
            />
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress" className="row label">
              Instagram
            </Label>
            <Input
              type="text"
              name="instagram"
              id="instagram"
              value={socialformData.instagram}
              placeholder="instagram"
              onChange={handleSocialChange}
              onpaste={handleSocialChange}
            />
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress" className="row label">
              Youtube
            </Label>
            <Input
              type="text"
              name="youtube"
              id="youtube"
              value={socialformData.youtube}
              placeholder="youtube"
              onChange={handleSocialChange}
              onpaste={handleSocialChange}
            />
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="examplePassword" className="row label">
              Profile Picture
            </Label>
            <Input
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              name="profile_picture"
              id="profile_picture"
              onChange={(e) => {
                const file = e.target.files[0];
                const type = e.target.files[0].type;
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
          </FormGroup>
        </Col>

        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress2" className="row label">
              Description*{" "}
              {aboutRequiredFields.profile_description !== "" ? (
                <p className="error">
                  {" "}
                  {aboutRequiredFields.profile_description}
                </p>
              ) : (
                ""
              )}
            </Label>
            <Input
              type="textarea"
              rows={3}
              name="profile_description"
              id="profile_description"
              value={formData.profile_description}
              onChange={handleChange}
              placeholder="Description"
              onBlur={validateProfileDesc}
            />
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <h5 style={{ fontWeight: "bold" }}>Skills*</h5>
      <Row form className="mt-3">
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress" className="row label">
              SkillField*{" "}
              {skillRequiredFields.skillField !== "" ? (
                <p className="errorselect"> {skillRequiredFields.skillField}</p>
              ) : (
                ""
              )}
            </Label>
            <AutoComplete
              items={skillFieldItems}
              SetAddress={SetSkillFieldAddress}
              getAddress={getSkillField}
              address={skillField}
              validateCity={ValidateSkillField}
            />
          </FormGroup>
        </Col>

        {skillList.length > 0 ? (
          <Col md={6} sm={12} lg={4}>
            <FormGroup>
              <>
                <Label for="exampleAddress" className="row label">
                  Skills*{" "}
                  {skillRequiredFields.skill !== "" ? (
                    <p className="error "> {skillRequiredFields.skill}</p>
                  ) : (
                    ""
                  )}
                </Label>

                <Input
                  name="skill"
                  id="skill"
                  type="select"
                  value={skillformData.skill}
                  onChange={handleSkillChange}
                  onBlur={ValidateSkill}
                >
                  <option value="">Select Skill</option>

                  {skillList.map((skill) => (
                    <option value={skill}>{skill}</option>
                  ))}
                  <option value="Other">Other</option>

                  {/* {CategoryList
                    ? CategoryList.map((cat) => (
                        <option value={cat._id} key={cat._id}>
                          {cat.name}
                        </option>
                      ))
                    : ""} */}
                </Input>
              </>
            </FormGroup>
          </Col>
        ) : (
          <Col md={6} sm={12} lg={4}>
            <FormGroup>
              <>
                <Label for="exampleAddress" className="row label">
                  Skills*{" "}
                  {skillRequiredFields.skill !== "" ? (
                    <p className="error "> {skillRequiredFields.skill}</p>
                  ) : (
                    ""
                  )}
                </Label>

                <Input
                  disabled
                  name="skill"
                  id="skill"
                  type="select"
                  value={skillformData.skill}
                  onChange={handleSkillChange}
                  onBlur={ValidateSkill}
                >
                  <option value="">Select Skill</option>

                  {/* {CategoryList
                  ? CategoryList.map((cat) => (
                      <option value={cat._id} key={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  : ""} */}
                </Input>
              </>
            </FormGroup>
          </Col>
        )}
        {skillformData.skill === "Other" ? (
          <>
            <Col md={6} sm={12} lg={4}>
              <FormGroup>
                <Label for="exampleAddress2" className="row label">
                  Other*{" "}
                  {skillRequiredFields.otherSKill !== "" ? (
                    <p className="error mt-2">
                      {" "}
                      {skillRequiredFields.otherSKill}
                    </p>
                  ) : (
                    ""
                  )}
                </Label>
                <Input
                  type="text"
                  name="skill"
                  id="skill"
                  onBlur={ValidateOtherSkill}
                  value={otherSKill}
                  placeholder="Enter your other skill"
                  onChange={(e) => {
                    // ValidateOtherSkill();
                    setotherSkill(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </>
        ) : (
          ""
        )}
        {/*   Intentions field  */}
        {skillformData.skill.length > 0 ? (
          <>
            <Col md={6} sm={12} lg={4}>
              <FormGroup>
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
                  <Input
                    name="intentions"
                    id="intentions"
                    type="select"
                    value={skillformData.intentions}
                    onChange={handleSkillChange}
                    onBlur={ValidateSkill}
                  >
                    <option value="">Select intentions</option>
                    <option value="bénévole">bénévole</option>
                    <option value="troc">troc</option>
                    <option value="payé">payé</option>
                  </Input>
                </div>
              </FormGroup>
            </Col>
            {/*Intentions End field*/}
          </>
        ) : (
          <></>
        )}
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress2" className="row label">
              Specialization
            </Label>
            <Input
              type="text"
              name="specialization"
              id="specialization"
              value={skillformData.specialization}
              placeholder="Specialization"
              // onBlur={ValidateSpecialization}
              onChange={handleSkillChange}
            />
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress2" className="row label">
              Rate Your Skill (1 to 5)*{" "}
            </Label>
            <Input
              name="score"
              id="score"
              type="select"
              value={skillformData.score}
              onBlur={validateScore}
              onChange={handleSkillChange}
            >
              <option value="">Select Score</option>

              {scores
                ? scores.map((skill) => <option value={skill}>{skill}</option>)
                : ""}
            </Input>
            {/* <Input
              min={1}
              max={5}
              type="number"
              name="score"
              id="score"
              onBlur={validateScore}
              value={skillformData.score}
              placeholder="Score"
              onChange={handleSkillChange}
            /> */}
            {skillRequiredFields.score !== "" ? (
              <p className="error "> {skillRequiredFields.score}</p>
            ) : (
              ""
            )}
          </FormGroup>
        </Col>
        {skillArrayData.length < 5 ? (
          <Col md={6} sm={12} lg={4} className="text-left">
            <button
              type="button"
              onClick={onskillAdd}
              // id="userButton"
              id="modalButton"
              style={{
                marginTop: "1.9rem",
              }}
              className="btn "
            >
              Add
            </button>
          </Col>
        ) : (
          <Col md={6} sm={12} lg={4} className="text-left">
            <button
              disabled
              type="button"
              // onClick={onskillAdd}
              // id="userButton"
              id="modalButton"
              style={{
                marginTop: "1.9rem",
              }}
              className="btn text-uppercase "
            >
              Add
            </button>
          </Col>
        )}
      </Row>
      <Row className="mb-2 mt-3">
        <Col md={6} sm={12} lg={6}>
          {skillArrayData && skillArrayData.length > 0 ? (
            <>
              {/* <Col className="mb-3">Skills:</Col> */}
              <div
                className={
                  materialArrayData
                    ? materialArrayData.length > 0
                      ? "text-center stepDiv"
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
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6} sm={12} lg={4}>
          <FormGroup>
            <Label for="exampleAddress" className="row label">
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
            </Label>
            <Input
              type="select"
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
            </Input>
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={4} className="text-left">
          <button
            type="button"
            onClick={onMaterialAdd}
            // id="userButton"
            id="modalButton"
            style={{
              marginTop: "1.9rem",
            }}
            className="btn  "
          >
            Add
          </button>
        </Col>
      </Row>
      <Row className="mb-2 mt-3">
        <Col md={6} sm={12} lg={6}>
          {materialArrayData && materialArrayData.length > 0 ? (
            <>
              {/* <Col className="mb-3">Material:</Col> */}
              <div
                className={
                  materialArrayData
                    ? materialArrayData.length > 0
                      ? " text-center stepDiv"
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
                        i={i}
                      />
                    ))
                  : ""}
              </div>
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Col className="text-right mt-4">
        {isLoading === true ? (
          <center>
            <div className={useStyles.root}>
              <CircularProgress disableShrink />
            </div>
          </center>
        ) : (
          <button
            onClick={onSubmit}
            type="button"
            // id="userButton"
            id="modalButton"
            className="btn text-uppercase"
          >
            Submit
          </button>
        )}
      </Col>
    </Form>
  );
}
