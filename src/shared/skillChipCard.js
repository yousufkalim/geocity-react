import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray({
  skillArrayData,
  setskillArrayData,
  skillFieldList,
  addToast,
  step,
  i,
}) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(skillArrayData);
  const [random, setrandom] = useState(112213);

  useEffect(() => {
    setrandom(Math.floor(Math.random() * 101));
  }, [step]);

  const handleDelete = (chipToDelete) => {
    const ChipsArray = skillArrayData.filter(
      (chip) => chip.skillField !== chipToDelete
    );
    setskillArrayData(ChipsArray);
  };

  //   console.log(chipData, "skillchipData");
  return (
    <>
      {/* {skillArrayData
        ? skillArrayData.map((data) => {
            // let icon = <TagFacesIcon />;
            return (
              skillFieldList &&
              skillFieldList.map((mat) => {
                if (mat._id === data.skillField) {
                  return (
                    <li key={data.skillField}>
                      <Chip
                        //   icon={icon}
                        label={`SkillField: ${" "} ${
                          mat.skillField
                        } Skill: ${" "}${data.skill} 
                         `}
                        onDelete={() => handleDelete(data.skillField)}
                        className={classes.chip}
                      />
                    </li>
                  );
                }
              })
            );
          })
        : ""} */}
      <Card
        style={{
          width: "70%",
          position: "relative",
          margin: "auto",
          borderRadius: "0.45rem",
          padding: "0px",
          border: "0.1px solid #ccc",
          marginTop: "5px",
        }}
        // className={i == 0 ? "" : "mt-2"}
      >
        <CardBody style={{ padding: "0.6rem" }} className="text-left">
          <div className=" row">
            <div className="col-10">
              <h5 tag="h5">
                {step.skillField
                  ? skillFieldList &&
                    skillFieldList.map((mat) => {
                      if (mat._id === step.skillField) {
                        return (
                          <>
                            <p>
                              <span
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
                                {" "}
                                Sr#:
                              </span>{" "}
                              <span
                                style={{
                                  opacity: 0.7,
                                  fontSize: "15px",
                                }}
                              >
                                {" "}
                                {random}
                              </span>
                            </p>
                            <p>
                              <span
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
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
                          </>
                        );
                      }
                    })
                  : ""}
              </h5>
            </div>
            <div className="col-2">
              <ClearOutlinedIcon
                style={{ fill: "red" }}
                onClick={() => handleDelete(step.skillField)}
              />
            </div>
          </div>
          <p tag="h6" className="mb-2 ">
            {step.skill ? (
              <p>
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  {" "}
                  Skill:
                </span>{" "}
                <span
                  style={{
                    opacity: 0.7,
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  {step.skill}
                </span>
              </p>
            ) : (
              ``
            )}
          </p>
          <CardText>
            {
              <p>
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  {" "}
                  Score:
                </span>{" "}
                <span
                  style={{
                    opacity: 0.7,
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  {step.score}
                </span>
              </p>
            }
          </CardText>
        </CardBody>
      </Card>
    </>
  );
}
