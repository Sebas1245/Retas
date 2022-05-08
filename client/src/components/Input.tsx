import React from "react";

type Props = {
  type: React.HTMLInputTypeAttribute,
  divClass: string,
  inputClass: string,
  inputId: string,
  placeholder?: string,
  feedbackClass?: string,
  feedbackText?: string,
  value?: string | number | readonly string[],
  step?: string,
  maxLength?: number,
  extras?: string,
  labelClass: string,
  required?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Input(
  { type, divClass, inputClass, inputId, placeholder, labelClass,
    feedbackClass, feedbackText, step, value, maxLength, extras, required, onChange }: Props) {
  return (
    <div className={divClass}>
      <input type={type} className={inputClass} id={inputId} name={inputId} placeholder={placeholder} step={step} value={value} onChange={onChange} maxLength={maxLength} required />
      <div className="text-hint px-3 small">{extras}</div>
      <label htmlFor={inputId} className={labelClass}>{placeholder}{required ? <span className="req">*</span> : null}</label>
      {feedbackText
        ?
        <div className={feedbackClass}>
          {feedbackText}
        </div>
        : <></>}
    </div>
  );
}

// export function Input2(
//   {type, divClass, inputClass, inputId, placeholder, labelClass, feedbackClass, required, value,step, feedbackText, maxLength, extras, onChange}: Props) {
//     return (
//     <div className={divClass}>
//       <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange ? onChange(e) : null} 
//       type={type} className={inputClass} id={inputId} name={inputId} placeholder={placeholder} step={step} maxLength={maxLength} required={required} value={value}/>
//       <div className="text-hint px-3 small">{extras}</div>
//       <label htmlFor={inputId} className={labelClass}>{placeholder} {required ? <span className="req">*</span> : null}</label>
//       {feedbackText 
//           ? 
//           <div className={feedbackClass}>
//             {feedbackText}
//           </div>
//           : <></>}
// }