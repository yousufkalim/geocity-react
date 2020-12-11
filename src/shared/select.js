import React from "react";
import Select from "react-select";

const colourOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    // border: "1px solid #c9c9c9",
    color: state.isSelected ? "red" : "blue",
    // marginTop: 1,
    // fontSize: "15px",
    // height: "2rem",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    // border: "2px solid #000",
    color: state.isFocused ? "#fff" : "#fff",
    color: state.isSelected ? "#fff" : "#fff",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    // border: "2px solid #000",
    color: "#fff",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    // border: "2px solid #000",
    color: "#fff",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "2px solid #9A7C64",
    backgroundColor: state.isSelected ? "#9A7C64" : "#9A7C64",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition, color: "#fff" };
  },
};

export default function SelectBox({ CategoryList, value, onChange, name }) {
  return (
    <Select
      name={name}
      defaultValue={`Select ${name}`}
      placeholder={`Select ${name}`}
      options={CategoryList}
      value={value}
      styles={colourStyles}
      onChange={onChange}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "dodgerblue",
          primary: "dodgerblue",
        },
      })}
    />
  );
}
