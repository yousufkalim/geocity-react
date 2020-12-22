import React from "react";

export default function CommentsFromDB({
  data,
  DefaultImage,
  getUser,
  comment,
}) {
  return (
    <div className="row text-left" style={{ marginTop: "2rem" }}>
      <div className="text-right" style={{ width: "10%" }}>
        <img
          className="com-image"
          src={
            comment.user
              ? comment.user.profile_picture
                ? `http://localhost:3000/views/uploads/${comment.user.profile_picture}`
                : DefaultImage
              : DefaultImage
          }
          alt="alternative"
        />
      </div>
      <div className="text-left" style={{ width: "90%" }}>
        <div style={{ marginLeft: "2rem" }}>
          <h5>
            {getUser() ? getUser().username : ""}
            <small className="ml-2">
              {new Date(comment.createdAt).toString().split(" ")[2]}
              {"/"}
              {new Date(comment.createdAt).getMonth()}
              {"/"}
              {new Date(comment.createdAt).getFullYear()}
            </small>
          </h5>
          <p className="mt-2" style={{ fontWeight: "bold" }}>
            {comment.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
