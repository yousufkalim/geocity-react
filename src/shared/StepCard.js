import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

const Example = ({
  i,
  step,
  materialList,
  skillfieldList,
  HandleStepDelete,
}) => {
  return (
    <Card
      style={{
        width: "70%",
        position: "relative",
        margin: "auto",
        borderRadius: "0.45rem",
      }}
      className={i == 0 ? "" : "mt-2"}
    >
      <CardBody style={{ padding: "0.6rem" }}>
        <div className=" row">
          <div className="col-10">
            <CardTitle tag="h5">{step.name}</CardTitle>
          </div>
          <div className="col-2">
            <ClearOutlinedIcon
              style={{ fill: "#000" }}
              onClick={() => HandleStepDelete(step.name)}
            />
          </div>
        </div>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {step.material
            ? materialList &&
              materialList.map((mat) => {
                if (mat._id === step.material) {
                  return "Material:" + mat.name;
                }
              })
            : ""}
          {step.skills
            ? skillfieldList &&
              skillfieldList.map((mat) => {
                if (mat._id === step.skills.skillField) {
                  return "skillField:" + " " + mat.skillField;
                }
              })
            : ""}
          {/* {step.material ? `Material: ${step.material}` : ``} */}
        </CardSubtitle>
        <CardText>{`Description:  ${step.description}`}</CardText>
      </CardBody>
    </Card>
  );
};

export default Example;
