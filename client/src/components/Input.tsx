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
  maxLength?: number,
  extras?: string
}

export default function Input(
  {type, divClass, inputClass, inputId, placeholder, labelClass, feedbackClass, feedbackText, maxLength, extras}: Props) {
    return (
    <div className={divClass}>
      <input type={type} className={inputClass} id={inputId} name={inputId} placeholder={placeholder} maxLength={maxLength} required/>
      <div className="text-hint px-3 small">{extras}</div>
      <label htmlFor={inputId} className={labelClass}>{placeholder}<span className="req">*</span></label>
      {feedbackText 
          ? 
          <div className={feedbackClass}>
            {feedbackText}
          </div>
          : <></>}
    </div>
    );
}