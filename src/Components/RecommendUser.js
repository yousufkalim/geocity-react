import React, { useState } from "react";

export default function RecommendUser({
  skill,
  RecommendUser,
  PopoverBody,
  UncontrolledPopover,
}) {
  const [like, setlike] = useState(0);

  const RecommendedUser = (id) => {
    setlike(like + 1);
    RecommendUser(id, like, setlike);
  };
  return (
    <div className=" ml-2  " id="iconRow" style={{ marginTop: "-0.3rem" }}>
      <p>
        <small>{skill.skillField.skillField} - </small>
        {skill.skill}
        {console.log(skill.specialization, "samalsk specilaizarion")}
        {skill.specialization ? (
          <>
            <i
              id="PopoverLegacy"
              type="button"
              class="fas fa-info-circle fa-xs"
              style={{
                marginLeft: 2,
                position: "absolute",
                color: "#c1c1c1",
              }}
            />
            <UncontrolledPopover
              trigger="legacy"
              placement="bottom"
              target="PopoverLegacy"
            >
              <PopoverBody>{skill.specialization}</PopoverBody>
            </UncontrolledPopover>
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
    </div>
  );
}
