import React from "react";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";
export default function TableRow({
  DeleteCategory,
  category,
  EditCategoryToggle,
}) {
  //   const onDeletContributor = (id) => {
  //     DeletContributor(id);
  //   };
  return (
    <>
      <tr className="text-center">
        <td style={{ padding: "0.4rem 0.4rem 0rem 0.4rem" }}>
          {category.name}
        </td>
        <td style={{ padding: "0.4rem 0.4rem 0rem 0.4rem" }}>
          {category.color}
        </td>
        <td style={{ padding: "0.4rem 0.4rem 0.3rem 0.4rem" }}>
          <button
            onClick={() => EditCategoryToggle(category._id)}
            type="button"
            id="modalButton1"
            className="btn btn-primary text-white ml-4 text-uppercase"
          >
            Edit
          </button>
          <button
            onClick={() => DeleteCategory(category._id)}
            type="button"
            id="modalButton1"
            className="btn btn-primary text-white ml-4 text-uppercase"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
