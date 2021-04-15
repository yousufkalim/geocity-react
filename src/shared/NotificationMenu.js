import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";
import { Link, Redirect } from "react-router-dom";
import {
  SignOut,
  isAuthenticated,
  getUser,
  getNotifications,
} from "../Auth/Index";
import Typography from "@material-ui/core/Typography";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Badge from "@material-ui/core/Badge";
import axios from "axios";

import NotificationList from "./NotificationList";
const useStyles = makeStyles((theme) => ({}));

export default function MenuListComposition({ data, setdata }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = useState(0);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    if (open == false) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    // if (isAuthenticated()) {
    //   setCount(data.length);
    // }
    prevOpen.current = open;
  }, [open]);
  const onChangeStatus = (setColor, notify, not, color, countCheck) => {
    if (countCheck === false) {
      if (count >= data.length) {
        return;
      } else {
        // const tempData = data.filter((dt) => dt._id !== not._id);
        // setdata(tempData);
        setCount(count + 1);
        var headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        };

        // const user = getUser();
        // const Index = user.notifications.findIndex((not) => not._id == notify._id);
        // user.notifications[Index].statusNew = false;
        // localStorage.setItem("user", JSON.stringify(user));
        try {
          axios
            .post(
              `https://api.geocity.io/api/v1/profile/update-notifications?id=${notify._id}`,
              { title: not.title, description: not.description },
              headers
            )
            .then((res) => {
              setColor(true);

              // settempCommentArray([...tempcommentArray, obj]);
              // const sort = res.data.notifications.sort(
              //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              // );
              // setdata(sort);

              console.log(res, "res notifications data");
            })
            .catch((err) => {
              console.log(" error projects all =>", err.response.data);
            });
        } catch (error) {
          // console.log(error, "error catch");
        }
      }
    }
  };
  return (
    <div className="notificationMenu ">
      {/* <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Toggle Menu Grow
        </Button> */}
      <div
        className="row  "
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge
          badgeContent={data ? data.length - count : "0"}
          color="secondary"
        >
          <NotificationsActiveIcon className="text-white" />
        </Badge>
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "right" ? "right top" : "right bottom",
              zIndex: 1,
            }}
          >
            <Paper style={{ zIndex: 1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  style={{
                    backgroundColor: data.length > 0 ? "#f7f7f7" : "#fff",
                    zIndex: 1,
                  }}
                  onKeyDown={handleListKeyDown}
                >
                  {data && data.length > 0 ? (
                    <div className="stepDiv2">
                      {data.map((not) => (
                        <NotificationList
                          not={not}
                          onChangeStatus={onChangeStatus}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="stepDiv2">
                      <MenuItem>No notifications Found</MenuItem>
                    </div>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
