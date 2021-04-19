import React, { useEffect, useState } from "react";

export default function SearchCategoryTableRow({
  skill,
  i,
  onSendInvite,
  singleStep,
  materialList,
  Link,
}) {
  return (
    <tr key={i}>
      <th scope="row">{skill.username}</th>
      <td>{skill.city}</td>

      <td>
        {skill
          ? skill.material.map((data) => {
              // let icon = <TagFacesIcon />;
              return materialList.map((mat) => {
                if (mat._id === data) {
                  return <span>{mat.name},</span>;
                }
              });
            })
          : ""}
      </td>

      <td>
        <Link to={`/profile/${skill._id}`}>
          <button
            type="button"
            id="modalButton1"
            className="btn btn-primary text-white"
          >
            See profile
          </button>
        </Link>
        <button
          onClick={() => onSendInvite(skill._id)}
          type="button"
          id="modalButton1"
          className="btn btn-primary text-white ml-4"
        >
          Invite
        </button>
      </td>
    </tr>
  );
}
