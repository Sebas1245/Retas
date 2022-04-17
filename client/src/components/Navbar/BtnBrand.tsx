import React from "react";

type Props =  {
  className?: string,
}

export default function BtnBrand({className}: Props) {
    return (
    <button className={`btn ${className}`}>
      RETAS<span className="text-primary">.</span>
    </button>)
}