import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

export default function SkillTableRow({
  skill,
  Link,
  onSendInvite,
  singleStep,
}) {
  const { addToast } = useToasts();

  const [state, setstate] = useState(false);
  useEffect(() => {
    if (singleStep) {
      const fil = singleStep.contributing_user.find(
        (ft) => ft._id == skill._id
      );
      if (fil) {
        setstate(true);
      } else {
        setstate(false);
      }
    }
  }, []);
  const onSendMessage = () => {
    addToast("This user is already a contributor", {
      appearance: "error",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  };
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
        {state == false ? (
          <button
            onClick={() => onSendInvite(skill._id)}
            type="button"
            id="modalButton1"
            className="btn btn-primary text-white ml-4"
          >
            Invite
          </button>
        ) : (
          <button
            onClick={onSendMessage}
            type="button"
            id="modalButton1"
            className="btn btn-primary text-white ml-4"
          >
            Invite
          </button>
        )}
      </td>
    </tr>
  );
}
