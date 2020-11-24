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
}) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(materialArrayData);

  const handleDelete = (chipToDelete) => {
    const ChipsArray = materialArrayData.filter(
      (chip) => chip !== chipToDelete
    );
    setmaterialArrayData(ChipsArray);
  };

  console.log(materialArrayData, "dsfsdsdsddssfsd");
  return (
    <Paper component="ul" className={classes.root}>
      {materialArrayData.map((data) => {
        // let icon = <TagFacesIcon />;

        return (
          <li key={data}>
            <Chip
              //   icon={icon}
              label={data}
              onDelete={() => handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
