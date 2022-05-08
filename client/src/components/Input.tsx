import React from "react";

type Props = {
  type: React.HTMLInputTypeAttribute,
  divClass: string, 
  inputClass: string, 
  inputId: string,
  placeholder?: string,
  feedbackClass?: string,
  feedbackText?: string,
  maxLength?: number,
  extras?: string,
  labelClass: string,
  required?: boolean,
  value?: any,
  onChange?: (e: any) => any; 
}

export default function Input(
  {type, divClass, inputClass, inputId, placeholder, labelClass, feedbackClass, required, value, feedbackText, maxLength, extras, onChange}: Props) {
    return (
    <div className={divClass}>
      <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange ? onChange(e) : null} 
      type={type} className={inputClass} id={inputId} name={inputId} placeholder={placeholder} maxLength={maxLength} required={required} value={value}/>
      <div className="text-hint px-3 small">{extras}</div>
      <label htmlFor={inputId} className={labelClass}>{placeholder} {required ? <span className="req">*</span> : null}</label>
      {feedbackText 
          ? 
          <div className={feedbackClass}>
            {feedbackText}
          </div>
          : <></>}
    </div>
    );
}