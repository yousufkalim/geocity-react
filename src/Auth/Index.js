import jwtDecode from "jwt-decode";
// import store from '../redux/index';
// import {Logout} from '../redux/actions/index'
import axios from "axios";
export const isAuthenticated = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    return true;
  } else {
    //   store.dispatch({type:'SET_UNAUTHENTICATED'});
    return false;
  }
};
export const SignOut = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    window.location.href = "/Login";
  }
};

export const Headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};
