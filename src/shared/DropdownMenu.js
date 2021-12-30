import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import DefaultImage from "../Theme/images/men.png";
import { Link, Redirect } from "react-router-dom";
import { SignOut, isAuthenticated, getUser } from "../Auth/Index";
import { useHistory } from "react-router";
import {url} from '../urlConfig' 

import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({}));

export default function MenuListComposition() {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="userdiv-res">
      {/* <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Toggle Menu Grow
        </Button> */}
      <div
        className="row ml-4 userdiv"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <img
          style={{
            width: "33px",
            height: "33px",
            borderRadius: "100%",
            // marginRight: "auto",
            // marginBottom: "0.5rem",
            // marginLeft: "auto",
            marginTop: "5px",
          }}
          src={
            getUser().profile_picture == "default.png"
              ? DefaultImage
              : `${url}/views/uploads/${
                  getUser().profile_picture
                }`
          }
          alt="alternative"
        />
        <ul className="navbar-nav">
          <li className="nav-item row">
            <a className="nav-link username">{getUser().firstName}{" "}</a>
            <i
              class="fas fa-caret-down"
              style={{
                fontSize: "22px",
                margin: "auto",
                color: "#fff",
              }}
            ></i>
          </li>
        </ul>
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
                placement === "bottom" ? "right top" : "right bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {getUser().role === "admin" ? (
                    <Link to={`/Admindashboard/${getUser()._id}`}>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                  ) : (
                    <Link to={`/profile/${getUser()._id}`}>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                  )}
                  <hr style={{ margin: "0 auto", width: "90%" }} />
                  <Link onClick={() => SignOut(history)}>
                    <MenuItem>Log Out</MenuItem>
                  </Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
