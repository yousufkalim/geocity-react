import React, { useState, useEffect } from "react";

function EditSkillComponent({
  Col,
  FormGroup,
  Label,
  sk,
  Input,
  seteditskillArrayData,
  skillField,
  updateStates,
  Row,
  i,
}) {
  const [tempformData, settempFormData] = useState({
    skill: "",
    skillField: "",
  });
  const [aboutRequiredFields, setAboutRequiredFields] = useState({
    skill: "",

    error: "",
  });
  const ValidateSkill = () => {
    if (!tempformData.skill) {
      const msg = "Required";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skill: msg,
      });
      return false;
    } else if (tempformData.skill.length < 3) {
      const msg = "Please enter minimum 3 character length skill";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skill: msg,
      });
      return false;
    } else if (tempformData.skill.length > 15) {
      const msg = "Please enter max 10 character length skill";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skill: msg,
      });
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({
        ...aboutRequiredFields,
        skill: msg,
      });

      return true;
    }
  };
  const handleChangeTemp = (e) => {
    let value = e.target.value;

    settempFormData({ ...tempformData, [e.target.name]: value });
  };
  useEffect(() => {
    if (sk) {
      const obj = {
        skill: sk,
        skillField: skillField,
      };
      settempFormData(obj);
    }
  }, []);
  const handleSkillFocus = () => [updateStates(tempformData.skill, i)];
  return (
    <Row>
      <Col md={6} className="mt-2">
        <FormGroup style={{ marginBottom: "0px" }}>
          <Label for="exampleEmail" className="row label">
            Skill {i}*
            {aboutRequiredFields.skill !== "" ? (
              <p className="error"> {aboutRequiredFields.skill}</p>
            ) : (
              ""
            )}
            {aboutRequiredFields.error !== "" ? (
              <p className="error"> {aboutRequiredFields.error}</p>
            ) : (
              ""
            )}
          </Label>
          <Input
            type="text"
            name="skill"
            id="skill"
            value={tempformData.skill}
            placeholder="Enter Skill"
            onChange={handleChangeTemp}
            onBlur={ValidateSkill}
          />
        </FormGroup>
      </Col>
      <Col md={6}></Col>
    </Row>
  );
}

export default React.memo(EditSkillComponent);
