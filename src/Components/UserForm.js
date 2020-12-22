import React from "react";

export default function UserForm({
  formData,
  skillformData,
  handleSkillChange,
  skillArrayData,
  materialArrayData,
  handleChange,
  SetAddress,
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
  Autocomplete,
  setPhoto,
  address,
  CategoryList,
  material,
  onMaterialChange,
  onskillAdd,
  ChipArray,
  SkillChipArray,
  isLoading,
  useStyles,
  CircularProgress,
  onSubmit,
  setskillArrayData,
  setmaterialArrayData,
  skillRequiredFields,
  addToast,
  ValidateSkillField,
  ValidateSpecialization,
  validateScore,
  ValidateSkill,
  ValidateOtherSkill,
  otherSKill,
  setotherSkill,
}) {
  return (
    <Form>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">First_name*</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              placeholder="firstName"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">Last_name*</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              placeholder="lastName"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">User_name*</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              placeholder="username"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        {/* <Col md={4}>
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
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">City*</Label>
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
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress">Phone_number*</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              placeholder="phone"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress">Availability*</Label>
            <Input
              type="text"
              name="availability"
              id="availability"
              value={formData.availability}
              placeholder="Availability"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress">Facebook</Label>
            <Input
              type="text"
              name="facebook"
              id="facebook"
              value={formData.facebook}
              placeholder="facebook"
              onChange={handleChange}
              onpaste={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress">Instagram</Label>
            <Input
              type="text"
              name="instagram"
              id="instagram"
              value={formData.instagram}
              placeholder="instagram"
              onChange={handleChange}
              onpaste={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress">Youtube</Label>
            <Input
              type="text"
              name="youtube"
              id="youtube"
              value={formData.youtube}
              placeholder="youtube"
              onChange={handleChange}
              onpaste={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="examplePassword">Profile_picture*</Label>
            <Input
              type="file"
              name="profile_picture"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log(file, "photo1");
                // setProfilePreview(
                //   URL.createObjectURL(file)
                // );
                setPhoto(file);
              }}
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress2">Description</Label>
            <Input
              type="textarea"
              rows={3}
              name="profile_description"
              id="profile_description"
              value={formData.profile_description}
              onChange={handleChange}
              placeholder="Description"
            />
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <h5 style={{ fontWeight: "bold" }}>Skills*</h5>
      <Row form className="mt-3">
        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress">Skill_field*</Label>
            <Input
              name="skillField"
              id="skillField"
              type="select"
              value={skillformData.skillField}
              onBlur={ValidateSkillField}
              onChange={handleSkillChange}
            >
              <option>Select SelectField</option>

              {skillFieldList
                ? skillFieldList.map((skill) => (
                    <option value={skill._id}>{skill.skillField}</option>
                  ))
                : ""}
            </Input>
          </FormGroup>
          {skillRequiredFields.skillField !== "" ? (
            <p className="error mt-2"> {skillRequiredFields.skillField}</p>
          ) : (
            ""
          )}
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress2">Specialization*</Label>
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
          {skillRequiredFields.specialization !== "" ? (
            <p className="error mt-2"> {skillRequiredFields.specialization}</p>
          ) : (
            ""
          )}
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleAddress2">Score*</Label>
            <Input
              type="text"
              name="score"
              id="score"
              onBlur={validateScore}
              value={skillformData.score}
              placeholder="Score"
              onChange={handleSkillChange}
            />
          </FormGroup>
          {skillRequiredFields.score !== "" ? (
            <p className="error mt-2"> {skillRequiredFields.score}</p>
          ) : (
            ""
          )}
        </Col>
        {skillList.length > 0 ? (
          skillformData.skill === "Other" ? (
            ""
          ) : (
            <Col md={4}>
              <FormGroup>
                <>
                  <Label for="exampleAddress">Skills*</Label>

                  <Input
                    name="skill"
                    id="skill"
                    type="select"
                    value={skillformData.skill}
                    onChange={handleSkillChange}
                    onBlur={ValidateSkill}
                  >
                    <option>Select Skill</option>

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
              {skillRequiredFields.skill !== "" ? (
                <p className="error mt-2"> {skillRequiredFields.skill}</p>
              ) : (
                ""
              )}
            </Col>
          )
        ) : (
          ""
        )}
        {skillformData.skill === "Other" ? (
          <>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleAddress2">Skill*</Label>
                <Input
                  type="text"
                  name="skill"
                  id="skill"
                  onBlur={ValidateOtherSkill}
                  value={otherSKill}
                  placeholder="Enter your skill"
                  onChange={(e) => {
                    ValidateOtherSkill();
                    setotherSkill(e.target.value);
                  }}
                />
              </FormGroup>
              {skillRequiredFields.otherSKill !== "" ? (
                <p className="error mt-2"> {skillRequiredFields.otherSKill}</p>
              ) : (
                ""
              )}
            </Col>

            {/* <input
                type="text"
                name="skill"
                id="skill"
                placeholder="Enter your Skill"
                value={otherSKill}
                onChange={(e) => {
                  ValidateOtherSkill();
                  setotherSkill(e.target.value);
                }}
                onBlur={ValidateOtherSkill}
              /> */}
          </>
        ) : (
          ""
        )}
        <Col md={6}>
          <FormGroup>
            <Label for="exampleAddress">Material*</Label>
            <Input
              type="select"
              name="material"
              id="material"
              value={material}
              onChange={onMaterialChange}
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
        <Col md={4} className="text-left">
          {skillList.length > 0 ? (
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
          ) : (
            <button
              disabled
              type="button"
              style={{
                marginTop: "1.9rem",
                background: "rgba(0, 0, 0, 0.26)",
              }}
              // id="userButton"
              id="modalButton"
              style={{ marginTop: "1.9rem" }}
              className="btn "
            >
              Add
            </button>
          )}
        </Col>
      </Row>
      <hr />

      <Row>
        <Col md={4}>
          {materialArrayData && materialArrayData.length > 0 ? (
            <>
              <Col className="mb-3">Material:</Col>
              <Col>
                <ChipArray
                  materialArrayData={materialArrayData ? materialArrayData : ""}
                  setmaterialArrayData={setmaterialArrayData}
                  materialList={materialList}
                  addToast={addToast}
                />
              </Col>
            </>
          ) : (
            ""
          )}
        </Col>
        <Col md={8}>
          {skillArrayData && skillArrayData.length > 0 ? (
            <>
              <Col className="mb-3">Skills:</Col>
              <Col>
                <SkillChipArray
                  skillArrayData={skillArrayData ? skillArrayData : ""}
                  setskillArrayData={setskillArrayData}
                  skillFieldList={skillFieldList}
                  addToast={addToast}
                />
              </Col>
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
            className="btn "
          >
            Submit
          </button>
        )}
      </Col>
    </Form>
  );
}
