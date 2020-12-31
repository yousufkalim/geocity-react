import React from "react";

export default function comments({
  comment,
  data,
  DefaultImage,
  DeleteComment,
  ClearOutlinedIcon,
  getUser,
}) {
  return (
    <div className="row text-left" style={{ marginTop: "2rem" }}>
      <div className="text-right" style={{ width: "10%" }}>
        <img
          className="com-image"
          src={
            comment.profile_picture
              ? `http://localhost:3000/views/uploads/${comment.profile_picture}`
              : DefaultImage
          }
          alt="alternative"
        />
      </div>
      <div className="text-left" style={{ width: "75%" }}>
        <div style={{ marginLeft: "2rem" }}>
          <h5>
            {getUser() ? getUser().username : ""}
            <small className="ml-2">
              {new Date(comment.date).toString().split(" ")[2]}
              {"/"}
              {new Date(comment.date).getMonth()}
              {"/"}
              {new Date(comment.date).getFullYear()}
            </small>
          </h5>
          <p className="mt-2">{comment.comment}</p>
        </div>
      </div>
      <div>
        {/* <ClearOutlinedIcon onClick={() => DeleteComment(comment.comment)} /> */}
      </div>
    </div>
  );
}
