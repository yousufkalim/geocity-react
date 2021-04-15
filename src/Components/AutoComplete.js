import React from "react";
import Autocomplete from "react-autocomplete";

export default function AutoComplete({
  items,
  address,
  getAddress,
  SetAddress,
  validateCity,
}) {
  return (
    <Autocomplete
      items={items}
      // shouldItemRender={(item, value) =>
      //   item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
      // }
      getItemValue={(item) => item.label}
      renderItem={(item, highlighted) => (
        <div
          key={item.id}
          style={{
            backgroundColor: highlighted ? "#eee" : "transparent",
          }}
        >
          {item.label}
        </div>
      )}
      wrapperStyle={{
        display: "block",
      }}
      menuStyle={{
        zIndex: "1",
        position: "static",
        borderRadius: "3px",
        // boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.9)",
        padding: "2px 12px",
        fontSize: "90%",
        color: "#000",
        overflow: "auto",
        maxHeight: "50%",
        marginTop: "-18px",
      }}
      inputProps={{
        className: "form-control",
        placeholder: "",
        onBlur: validateCity,
      }}
      value={address}
      name="address"
      onChange={getAddress}
      onSelect={SetAddress}
      // selectOnBlur={validateCity}
    />
  );
}
