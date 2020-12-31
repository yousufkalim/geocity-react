import React from "react";
import Select, { components } from "react-select";

const colourOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    border: "0.1px solid #ccc",
    backgroundColor: "#9A7C64",
    margin: 0,
    color: state.isSelected ? "dodgerblue" : "#fff",
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
    // border: "1 px solid #9A7C64",
    backgroundColor: "#9A7C64",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition, color: "#fff" };
  },
  Menu: () => ({
    backgroundColor: "#fff",
  }),
  MenuList: () => ({
    backgroundColor: "#fff",
  }),
  Option: () => ({
    backgroundColor: "#fff",
  }),
};
const controlStyles = {
  borderRadius: "1px solid #000",
  padding: "0px",
  background: "#fff",
  color: "#fff",
};
const ControlComponent = (props) => (
  <div style={controlStyles}>
    <components.Control {...props} />
  </div>
);

export default function SelectBox({ CategoryList, value, onChange, name, id }) {
  return (
    <Select
      isClearable
      components={{ Control: ControlComponent }}
      isSearchable
      // name={name}
      key={`my_unique_select_key__${id}`}
      // defaultValue={`Select ${name}`}
      // placeholder={`Select ${name}`}
      options={CategoryList}
      // onInputChange={onChange}
      // value={value}
      styles={colourStyles}
      onChange={onChange}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#fff",
          primary: "#fff",
        },
      })}
    />
  );
}
