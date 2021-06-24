import React, { useEffect, useState } from "react";

export default function SearchMaterialTableRow({
  skill,
  i,
  onSendInvite,
  singleStep,
  Link,
}) {
  return (
    <tr key={i}>
      <th scope="row">{skill.firstName}</th>
      <td>{skill.city}</td>

      <td>
        {skill.material.map((sk) => (
          <span>{sk.name},</span>
        ))}
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
