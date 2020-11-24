import jwtDecode from "jwt-decode";
// import store from '../redux/index';
// import {Logout} from '../redux/actions/index'
import axios from "axios";
export const isAuthenticated = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    const decodedtoken = jwtDecode(token);
    if (decodedtoken.exp * 1000 < Date.now()) {
      SignOut();
      window.location.href = "/Login";
      return false;
    }
    return JSON.parse(localStorage.getItem("jwt"));
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

export const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};
