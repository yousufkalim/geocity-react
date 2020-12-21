import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

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
}) {
  const classes = useStyles();

  const handleDelete = (chipToDelete) => {
    if (materialArrayData.length >= 2) {
      const ChipsArray = materialArrayData.filter(
        (chip) => chip !== chipToDelete
      );
      setmaterialArrayData(ChipsArray);
    } else {
      addToast("material length must be at least 1 ", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
    }
  };

  // console.log(chipData, "chipData");
  return (
    <Paper component="ul" className={classes.root}>
      {materialArrayData
        ? materialArrayData.map((data) => {
            // let icon = <TagFacesIcon />;
            return (
              materialList &&
              materialList.map((mat) => {
                if (mat._id === data) {
                  return (
                    <li key={data}>
                      <Chip
                        //   icon={icon}
                        label={mat.name}
                        onDelete={() => handleDelete(data)}
                        className={classes.chip}
                      />
                    </li>
                  );
                }
              })
            );
          })
        : ""}
    </Paper>
  );
}
