import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  // inline: {
  //   display: "inline",
  // },
}));

export default function AlignItemsList({ not }) {
  const classes = useStyles();

  return (
    <List
      className={classes.root}
      style={{
        paddingTop: "0px",
        paddingBottom: "0px",
        backgroundColor: "#f7f7f7",
        margin: 0,
        padding: 0,
      }}
    >
      <ListItem
        alignItems="flex-start"
        style={{
          paddingTop: "0px",
          paddingBottom: "0px",
          borderBottom: "1px solid #ccc",
        }}
      >
        {/* <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          style={{
            fontSize: "0.8rem",
          }}
          primary={not.title}
          secondary={
            <React.Fragment style={{ fontSize: "0.6rem" }}>
              {not.description}
              <br />
              {/* <small className="ml-2">
                {new Date(not.createdAt).toString().split(" ")[1]}{" "}
                {new Date(not.createdAt).toString().split(" ")[2]}{" "}
                {new Date(not.createdAt).getFullYear()}
              </small> */}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
