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
  materialArrayData,
  setmaterialArrayData,
  materialList,
  addToast,
  step,
}) {
  const classes = useStyles();
  const [random, setrandom] = useState(112213);

  useEffect(() => {
    setrandom(Math.floor(Math.random() * 101));
  }, [step]);

  const handleDelete = (chipToDelete) => {
    const ChipsArray = materialArrayData.filter(
      (chip) => chip !== chipToDelete
    );
    setmaterialArrayData(ChipsArray);
  };

  // console.log(chipData, "chipData");
  return (
    <Card
      style={{
        width: "75%",
        position: "relative",
        margin: "auto",
        borderRadius: "0.45rem",
        marginTop: "5px",
        padding: "5px",
        border: "0.1px solid #ccc",
        // background: "#c9c9c9",

        // border: "0.1px solid",
      }}
      // className={i == 0 ? "" : "mt-2"}
    >
      <CardBody className="text-left">
        <div className=" row">
          <div className="col-10">
            <h5 tag="h5">
              {step
                ? materialList &&
                  materialList.map((mat) => {
                    if (mat._id === step) {
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
                              Material:
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
                        </>
                      );
                    }
                  })
                : "no material"}
            </h5>
          </div>
          <div className="col-2">
            <ClearOutlinedIcon
              style={{ fill: "red" }}
              onClick={() => handleDelete(step)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
