import React, { useState } from "react";

export default function CommentsFromDB({
  data,
  DefaultImage,
  getUser,
  comment,
  DeleteComment,
  ClearOutlinedIcon,
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="row text-left commentSection" style={{ marginTop: "2rem" }}>
      <div
        className="text-right"
        style={{ width: "10%" }}
        onMouseOver={() => setShow(!show)}
      >
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
      <div onMouseOver={() => setShow(true)} style={{ width: "80%" }}>
        <div style={{ marginLeft: "2rem" }}>
          <h5>
            {comment.user.username}
            <small className="ml-4">
              {new Date(comment.createdAt).toString().split(" ")[2]}
              {"/"}
              {new Date(comment.createdAt).getMonth()}
              {"/"}
              {new Date(comment.createdAt).getFullYear()}
            </small>
          </h5>
          <p className="mt-2" style={{ opacity: 0.7 }}>
            {comment.comment}
          </p>
        </div>
      </div>

      <div style={{ display: show == true ? "block" : "none" }}>
        {comment.user._id === getUser()._id ? (
          <ClearOutlinedIcon onClick={() => DeleteComment(comment._id)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
