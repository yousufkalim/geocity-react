import React, { useEffect, useState } from "react";
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
  const [state, setstate] = useState("");

  useEffect(() => {
    materialList &&
      materialList.map((mat) => {
        if (mat._id === step.material) {
          setstate(mat.name);
        }
      });
  }, [step]);
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
            <CardTitle tag="h5">
              <p>
                <span style={{ fontSize: "15px", fontWeight: "bold",marginLeft:"20px"}}>
                  {" "}
                  Step Name:
                </span>{" "}
                <span
                  style={{
                    opacity: 0.7,
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  {step.name}
                </span>
              </p>
            </CardTitle>
          </div>
          <div className="col-2">
            <ClearOutlinedIcon
              style={{ fill: "red" }}
              onClick={() => HandleStepDelete(step.name)}
            />
          </div>
        </div>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {step.material || step.materialName ? (
            <p>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                {" "}
                Material:
              </span>{" "}
              <span
                style={{
                  opacity: 0.7,
                  fontSize: "15px",
                }}
              >
                {" "}
                {state
                  ? state
                  : step.material
                  ? step.material
                  : step.materialName
                  ? step.materialName
                  : ""}
              </span>
            </p>
          ) : (
            ""
          )}
          {step.skills
            ? skillfieldList &&
              skillfieldList.map((mat) => {
                if (mat._id === step.skills.skillField) {
                  return (
                    <p>
                      <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                        {" "}
                        SkillField:
                      </span>{" "}
                      <span
                        style={{
                          opacity: 0.7,
                          fontSize: "15px",
                        }}
                      >
                        {" "}
                        {mat.skillField}
                      </span>
                    </p>
                  );
                }
              })
            : ""}
          {/* {step.material ? `Material: ${step.material}` : ``} */}
        </CardSubtitle>
        {step.skills?.intentions ? (
          <>
            <CardText>
              <p>
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  {" "}
                  Intentions:
                </span>{" "}
                <span
                  style={{
                    opacity: 0.7,
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  {step.skills.intentions}
                </span>
              </p>
            </CardText>
          </>
        ) : (
          <>{""}</>
        )}

        <CardText>
          <p>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>
              {" "}
              Description:
            </span>{" "}
            <span
              style={{
                opacity: 0.7,
                fontSize: "15px",
              }}
            >
              {" "}
              {step.description}
            </span>
          </p>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default Example;
