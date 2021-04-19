import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { getUser, isAuthenticated } from "../Auth/Index";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
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

export default function AlignItemsList({ not, onChangeStatus }) {
  const classes = useStyles();
  const [color, setColor] = useState(false);
  const [countCheck, setCountCheck] = useState(false);

  const HandleChangeStatus = (notify) => {
    setCountCheck(true);
    onChangeStatus(setColor, notify, not, color, countCheck);
  };
  return (
    <List
      className={classes.root}
      style={{
        paddingTop: "0px",
        paddingBottom: "0px",
        backgroundColor: color == true ? "#fff" : "#f7f7f7",
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
          primary={not.description}
          secondary={
            <React.Fragment style={{ fontSize: "0.6rem" }}>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className="ml-2">
                  <small>
                    {new Date(not.createdAt).toString().split(" ")[1]}{" "}
                    {new Date(not.createdAt).toString().split(" ")[2]}{" "}
                    {new Date(not.createdAt).getFullYear()}
                  </small>
                  <small className="ml-1">
                    {new Date(not.createdAt).getHours()}
                    {":"}
                    {new Date(not.createdAt).getMinutes()}
                    {":"}
                    {new Date(not.createdAt).getSeconds()}
                  </small>
                </p>
                <div className="MarkasRead">
                  <Chip
                    //   icon={icon}
                    className="MarkasRead"
                    label={"Mark as read"}
                    onClick={(e) => HandleChangeStatus(not)}
                    // className={classes.chip}
                  />
                </div>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
