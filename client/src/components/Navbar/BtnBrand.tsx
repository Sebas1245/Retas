import React from "react";
import { useNavigate } from "react-router-dom";

type Props =  {
  className?: string,
}

export default function BtnBrand({className}: Props) {
  const navigate = useNavigate()
    return (
    <button className={`btn ${className}`} onClick={() => navigate('/')}>
      RETAS<span className="text-primary">.</span>
    </button>)
}