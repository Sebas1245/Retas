import React from "react"

type Props = {
  className?: string,
  btnType: "button" | "submit" | "reset",
  btnText: string,
  padding?: string,
  onClick?: (params?: any) => any; 
}

export default function Button({ className, btnType, btnText, padding, onClick }: Props) {
    return (
    <button onClick={onClick ? () => onClick() : undefined} className={`btn ${className} ${padding}`} type={btnType}>
      {btnText}
    </button>
    );
}