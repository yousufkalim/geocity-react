import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
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
  materialList,
  addToast,
  mat,
  seteditskill,
  seteditcheck,
  editcheck,
  setIndex,
  i,
}) {
  const classes = useStyles();

  const handleDelete = (chipToDelete) => {
    const ChipsArray = skillArrayData.filter((chip) => chip !== chipToDelete);

    setskillArrayData({ ...skillArrayData, ["skill"]: ChipsArray });
  };
  const handleEdit = (chipToEdit) => {
    seteditskill(chipToEdit);
    setIndex(i);

    seteditcheck(true);
    // setskillArrayData({ ...skillArrayData, ["skill"]: ChipsArray });
  };

  // console.log(chipData, "chipData");
  return (
    // <Paper component="ul" className={classes.root}>
    //   {skillArrayData
    //     ? skillArrayData.map((data) => {
    //         // let icon = <TagFacesIcon />;
    //         return (
    //           <li key={data}>
    //             <Chip
    //               //   icon={icon}
    //               label={data}
    //               onDelete={() => handleDelete(data)}
    //               className={classes.chip}
    //             />
    //           </li>
    //         );
    //       })
    //     : ""}
    // </Paper>
    <Card
      style={{
        width: "80%",
        position: "relative",
        margin: "auto",
        borderRadius: "0.45rem",
        padding: "0px",
        border: "0.1px solid #ccc",
        marginTop: "5px",
        marginBottom: "10px",
      }}
      // className={i == 0 ? "" : "mt-2"}
    >
      <CardBody style={{ padding: "0.4rem" }} className="text-left">
        <div className=" row">
          <div className="col-8">
            <h5 tag="h5">
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
                  {mat}
                </span>
              </p>
            </h5>
          </div>

          <div className="col-4 row ">
            <div className="col">
              <EditIcon
                style={{ fill: "dodgerblue" }}
                onClick={() => handleEdit(mat)}
              />
            </div>
            <div className="col">
              <ClearOutlinedIcon
                style={{ fill: "red" }}
                onClick={() => handleDelete(mat)}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
