import React from "react";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";
export default function TableRow({ DeleteMaterial, material, Edittoggle }) {
  //   const onDeletContributor = (id) => {
  //     DeletContributor(id);
  //   };
  return (
    <>
      <tr className="text-center">
        <td style={{ padding: "0.4rem 0.4rem 0rem 0.4rem" }}>
          {material.name}
        </td>

        <td>
          <div
            className="row"
            style={{
              display: "flex",
              flexWrap: "nowrap",
              marginRight: "0px",
              marginLeft: "0px",
            }}
          >
            <button
              onClick={() => Edittoggle(material._id)}
              type="button"
              id="modalButton1"
              className="btn btn-primary text-white ml-4  "
            >
              Edit
            </button>
            <button
              onClick={() => DeleteMaterial(material._id)}
              type="button"
              id="modalButton1"
              className="btn btn-primary text-white ml-4 "
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
