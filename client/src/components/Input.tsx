import React from "react";

type Props = {
  type: React.HTMLInputTypeAttribute,
  divClass: string,
  inputClass: string,
  inputId: string,
  placeholder: string,
  labelClass: string
  feedbackClass?: string,
  feedbackText?: string,
  value?: string | number | readonly string[],
  step?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input(
  { type, divClass, inputClass, inputId, placeholder, labelClass, feedbackClass, feedbackText, step, value, onChange }: Props) {
  return (
    <div className={divClass}>
      <input type={type} className={inputClass} id={inputId} name={inputId} placeholder={placeholder} step={step} value={value} onChange={onChange} />
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