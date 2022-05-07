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
  step?: string,
  maxLength?: number,
  extras?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input(
  { type, divClass, inputClass, inputId, placeholder, labelClass,
    feedbackClass, feedbackText, step, value, maxLength, extras, onChange }: Props) {
  return (
    <div className={divClass}>
      <input type={type} className={inputClass} id={inputId} name={inputId} placeholder={placeholder} step={step} value={value} onChange={onChange} maxLength={maxLength} required />
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