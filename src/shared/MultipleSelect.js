import React from "react";

export default function MultipleSelect({
  handleStepChange,
  // validateStepType,
  data,
  name,
  value,
}) {
  return (
    <select
      name={name}
      id={name}
      value={value}
      onChange={handleStepChange}
      // onBlur={validateStepType}
    >
      <option value=""></option>
      {data.map((name) => (
        <option value={name}>{name}</option>
      ))}
    </select>
  );
}
