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
  skillArrayData,
  setskillArrayData,
  skillFieldList,
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
    <Paper component="ul" className={classes.root}>
      {skillArrayData
        ? skillArrayData.map((data) => {
            // let icon = <TagFacesIcon />;
            return skillFieldList.map((mat) => {
              if (mat._id === data.skillField) {
                return (
                  <li key={data.skillField}>
                    <Chip
                      //   icon={icon}
                      label={`SkillField: ${" "} ${
                        mat.skillField
                      } Skill: ${" "}${data.skill} Specialization: ${" "}${
                        data.specialization
                      }`}
                      onDelete={() => handleDelete(data.skillField)}
                      className={classes.chip}
                    />
                  </li>
                );
              }
            });
          })
        : ""}
    </Paper>
  );
}
