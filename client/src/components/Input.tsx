import React from "react";

type Props = {
  type: React.HTMLInputTypeAttribute,
  divClass: string, 
  inputClass: string, 
  inputId: string,
  placeholder: string,
  labelClass: string
}

export default function Input(
  {type, divClass, inputClass, inputId, placeholder, labelClass}: Props) {
    return (
    <div className={divClass}>
      <input type={type} className={inputClass} id={inputId} placeholder={placeholder}/>
      <label htmlFor={inputId} className={labelClass}>{placeholder}</label>
    </div>
    );
}