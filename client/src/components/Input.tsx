import React from "react";

type Props = {
  type: React.HTMLInputTypeAttribute,
  divClass: string,
  inputClass: string,
  inputId: string,
  placeholder: string,
  labelClass: string
  feedbackClass?: string,
  feedbackText?: string
}

export default function Input(
  { type, divClass, inputClass, inputId, placeholder, labelClass, feedbackClass, feedbackText }: Props) {
  return (
    <div className={divClass}>
      <input type={type} className={inputClass} id={inputId} name={inputId} placeholder={placeholder} />
      <label htmlFor={inputId} className={labelClass}>{placeholder}</label>
      {feedbackText
        ?
        <div className={feedbackClass}>
          {feedbackText}
        </div>
        : <></>}
    </div>
  );
}