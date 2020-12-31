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
  materialArrayData,
  setmaterialArrayData,
  materialList,
  addToast,
  step,
}) {
  const classes = useStyles();

  const handleDelete = (chipToDelete) => {
    const ChipsArray = materialArrayData.filter(
      (chip) => chip !== chipToDelete
    );
    setmaterialArrayData(ChipsArray);
  };

  // console.log(chipData, "chipData");
  return (
    // <Paper component="ul" className={classes.root}>
    //   {materialArrayData
    //     ? materialArrayData.map((data) => {
    //         // let icon = <TagFacesIcon />;
    //         return (
    //           materialList &&
    //           materialList.map((mat) => {
    //             if (mat._id === data) {
    //               return (
    //                 <li key={data}>
    //                   <Chip
    //                     //   icon={icon}
    //                     label={mat.name}
    //                     onDelete={() => handleDelete(data)}
    //                     className={classes.chip}
    //                   />
    //                 </li>
    //               );
    //             }
    //           })
    //         );
    //       })
    //     : ""}
    // </Paper>
    <Card
      style={{
        width: "70%",
        position: "relative",
        margin: "auto",
        borderRadius: "0.45rem",
        padding: "0px",
      }}
      // className={i == 0 ? "" : "mt-2"}
    >
      <CardBody style={{ padding: "0.6rem" }}>
        <div className=" row">
          <div className="col-10">
            <h5 tag="h5">
              {step
                ? materialList &&
                  materialList.map((mat) => {
                    if (mat._id === step) {
                      return (
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
                            {mat.name}
                          </span>
                        </p>
                      );
                    }
                  })
                : "no material"}
            </h5>
          </div>
          <div className="col-2">
            <ClearOutlinedIcon
              style={{ fill: "#000" }}
              onClick={() => handleDelete(step)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
