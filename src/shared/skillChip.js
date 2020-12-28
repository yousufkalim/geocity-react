import React, { useEffect } from "react";
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
        }}
        className={i == 0 ? "" : "mt-2"}
      >
        <CardBody style={{ padding: "0.6rem" }}>
          <div className=" row">
            <div className="col-10">
              <CardTitle tag="h5">
                {step.skillField
                  ? skillFieldList &&
                    skillFieldList.map((mat) => {
                      if (mat._id === step.skillField) {
                        return "skillField:" + " " + mat.skillField;
                      }
                    })
                  : ""}
              </CardTitle>
            </div>
            <div className="col-2">
              <ClearOutlinedIcon
                style={{ fill: "#000" }}
                onClick={() => handleDelete(step.skillField)}
              />
            </div>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {step.skill ? `Skill: ${step.skill}` : ``}
          </CardSubtitle>
          <CardText>{`Score: ${step.score}`}</CardText>
        </CardBody>
      </Card>
    </>
  );
}
