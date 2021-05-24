import React from "react";

export default function TextArea(props) {
  return (
    <textarea
      rows={props.rows}
      cols={props.cols}
      type="text"
      name={props.name}
      className="form-control"
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    ></textarea>
  );
}
