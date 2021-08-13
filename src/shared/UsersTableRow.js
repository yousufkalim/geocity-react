import React, { useState } from "react";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";
import { url } from "../urlConfig";

export default function TableRow({ data, DeleteUser, seeSkills }) {
  return (
    <>
      {data.isDeleted === true ? (
        ""
      ) : (
        <tr className="text-center">
          <td style={{ padding: "0.45rem 0 0.45rem 0" }}>
            <img
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "100%",
                position: "relative",
                margin: "0 auto",
              }}
              src={
                data.profile_picture
                  ? `${url}/views/uploads/${data.profile_picture}`
                  : DefaultImage
              }
              alt="alternative"
            />
          </td>
          <td style={{ padding: "0.45rem 0 0.45rem 0" }}>{data.firstName}</td>
          <td style={{ padding: "0.45rem 0 0.45rem 0" }}>
            <span>{data.email}</span>
          </td>
          <td style={{ padding: "0.45rem 0 0.45rem 0" }}>
            {data.projects ? data.projects.length : 0}
          </td>
          <td>
            <button
              className="btn btn-primary text-white ml-4"
              onClick={() => seeSkills(data._id)}
            >
              See
            </button>
          </td>
          <td>
            <button
              onClick={() => DeleteUser(data._id)}
              type="button"
              id="modalButton1"
              className="btn btn-primary text-white ml-4 "
            >
              Delete User
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
