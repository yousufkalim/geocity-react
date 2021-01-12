import socketIOClient from "socket.io-client";

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
    localStorage.removeItem("user");
    window.location.href = "/Login";
  }
};

export const getUser = () => {
  const token = localStorage.getItem("user");
  if (token) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

export const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};
export const socket = socketIOClient("http://localhost:3000");
