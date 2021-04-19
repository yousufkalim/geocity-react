import React, { useState } from "react";
import {
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Popover,
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
export default function RecommendUser({
  skill,
  RecommendUser,
  i,
  UnRecommendUser,
}) {
  const [like, setlike] = useState(0);
  const [value, setValue] = React.useState(skill.score);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const RecommendedUser = (id, recommendedBy) => {
    RecommendUser(id, like, setlike, recommendedBy);
  };
  const UnRecommendedUser = (id, recommendedBy) => {
    UnRecommendUser(id, like, setlike, recommendedBy);
  };
  return (
    <>
      <p>
        <small>{skill.skillField.skillField} - </small>
        <span style={{ fontWeight: "500" }}> {skill.skill}</span>

        {skill.specialization ? (
          <>
            <i
              id="Popover1"
              type="button"
              class="fas fa-info-circle fa-xs"
              style={{
                marginLeft: 2,
                position: "absolute",
                color: "#ccc",
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
          <Rating
            name="simple-controlled"
            value={value}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          />
          {/* <i className="fas fa-star fa-sm " style={{ color: "#ffe500" }} />

          <i className="fas fa-star fa-sm " style={{ color: "#ffe500" }} />
          <i className="fas fa-star fa-sm " style={{ color: "#ffe500" }} />
          <i className="fas fa-star fa-sm " />
          <i className="fas fa-star fa-sm " /> */}
        </span>
      </p>

      <p>
        {like >= 1 ? (
          <>
            <i
              className="fas fa-heart "
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => UnRecommendedUser(skill._id, skill.recommendedBy)}
            />{" "}
          </>
        ) : (
          <>
            <i
              className="fas fa-heart "
              style={{ color: "grey" }}
              onClick={() =>
                RecommendedUser(skill.skillField._id, skill.recommendedBy)
              }
            />
          </>
        )}
        <span class=" ml-1" style={{ color: "grey" }}>
          {skill.recommendedBy.length + like}
        </span>
      </p>
    </>
  );
}
