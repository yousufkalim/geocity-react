import React, { useState } from "react";
import {url} from '../urlConfig' 
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
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        <img
          className="com-image"
          src={
            comment.user
              ? comment.user.profile_picture
                ? `${url}/views/uploads/${comment.user.profile_picture}`
                : DefaultImage
              : DefaultImage
          }
          alt="alternative"
        />
      </div>
      <div
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        style={{ width: "80%" }}
      >
        <div className="commentUser">
          <h5 style={{ fontWeight: "bold" }}>
            {comment.user.firstName}

            <small className="ml-4">
              {new Date(comment.createdAt).toString().split(" ")[2]}
              {"/"}
              {new Date(comment.createdAt).getMonth() + 1}
              {"/"}
              {new Date(comment.createdAt).getFullYear()}
            </small>
          </h5>
          <p className="mt-2" style={{ opacity: 0.7 }}>
            {comment.comment}
          </p>
        </div>
      </div>

      <div
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        style={{ display: show == true ? "block" : "none" }}
      >
        {comment.user._id === getUser()._id ? (
          <ClearOutlinedIcon
            id="clear"
            onClick={() => DeleteComment(comment._id)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
