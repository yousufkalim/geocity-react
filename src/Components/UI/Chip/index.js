import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Card, CardBody } from "reactstrap";
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
  step,
  materialList,
}) {
  const classes = useStyles();
  const [state, setstate] = useState("");

  useEffect(async () => {
    materialList &&
      materialList.map((mat) => {
        if (mat._id === step) {
          setstate(mat.name);
        }
      });
  }, [step]);
  const handleDelete = (chipToDelete) => {
    const ChipsArray = materialArrayData.filter(
      (chip) => chip !== chipToDelete
    );
    setmaterialArrayData(ChipsArray);
  };

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h5 tag="h5">
              <>
                <p>
                  <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                    {" "}
                    Interest:
                  </span>{" "}
                  <span
                    style={{
                      opacity: 0.7,
                      fontSize: "15px",
                    }}
                  >
                    {state}
                  </span>
                </p>
              </>
            </h5>
          </div>
          <div>
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
