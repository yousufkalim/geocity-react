import React from "react"


export const CustomTextfield = (props) => {
  return (
    <input
      placeholder={props.placeholder}
   
      type={props.type}
    //   className="col-md-12 pb-2"
      onChange={props.onChange}
      name={props.name}
      {...props}
    />
  )
}

export default CustomTextfield
