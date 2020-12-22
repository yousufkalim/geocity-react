import React, { useState } from "react";
import {
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Popover,
} from "reactstrap";

export default function RecommendUser({ skill, RecommendUser, i }) {
  const [like, setlike] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const RecommendedUser = (id) => {
    setlike(like + 1);
    RecommendUser(id, like, setlike);
  };
  return (
    <>
      <p>
        <small>{skill.skillField.skillField} - </small>
        {skill.skill}

        {skill.specialization ? (
          <>
            <i
              id="Popover1"
              type="button"
              class="fas fa-info-circle fa-xs"
              style={{
                marginLeft: 2,
                position: "absolute",
                color: "#c1c1c1",
              }}
            />
            <Popover
              placement="bottom"
              isOpen={popoverOpen}
              target="Popover1"
              toggle={toggle}
            >
              <PopoverHeader>Specialization</PopoverHeader>
              <PopoverBody>{skill.specialization}</PopoverBody>
            </Popover>
          </>
        ) : (
          ""
        )}
        <br />
        <span>
          <i className="fas fa-star fa-sm " style={{ color: "#ffe500" }} />

          <i className="fas fa-star fa-sm " style={{ color: "#ffe500" }} />
          <i className="fas fa-star fa-sm " style={{ color: "#ffe500" }} />
          <i className="fas fa-star fa-sm " />
          <i className="fas fa-star fa-sm " />
        </span>
      </p>

      <p>
        {like == 1 ? (
          <>
            <i
              className="fas fa-heart "
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => RecommendedUser(skill.skillField._id)}
            />{" "}
            <span class="ml-1 " style={{ color: "grey" }}>
              {skill.recommendedBy ? skill.recommendedBy.length + like : ""}
            </span>
          </>
        ) : (
          <>
            <i
              className="fas fa-heart "
              onClick={() => RecommendedUser(skill.skillField._id)}
            />
            <span class="ml-1 " style={{ color: "grey" }}>
              {skill.recommendedBy ? skill.recommendedBy.length + like : ""}
            </span>
          </>
        )}
      </p>
    </>
  );
}
