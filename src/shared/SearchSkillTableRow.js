import React, { useEffect, useState } from "react";

export default function SkillTableRow({
  skill,
  Link,
  onSendInvite,
  singleStep,
}) {
  return (
    <tr>
      <th scope="row">{skill.username}</th>
      <td>{skill.city}</td>

      <td>
        {skill.skills.map((sk) => (
          <span>{sk.skill},</span>
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
