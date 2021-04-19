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
            borderBottom: "0.01px solid grey",
            padding: "5px",
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
        position: "absolute",
        borderRadius: "3px",
        // boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.9)",
        padding: "2px 12px",
        fontSize: "80%",
        color: "#000",
        overflow: "auto",
        maxHeight: "15rem",
        marginTop: "0px",
        left: "0px",
        top: "50px",
        // border: "1px solid",
      }}
      inputProps={{
        className: "form-control searchInput",
        placeholder: "Lieu du projet ",
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
