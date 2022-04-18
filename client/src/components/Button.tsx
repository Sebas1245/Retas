import React from "react"

type Props = {
  className?: string,
  btnType: "button" | "submit" | "reset",
  btnText: string,
  padding?: string
}

export default function Button({ className, btnType, btnText, padding }: Props) {
    return (
    <button className={`btn ${className} ${padding}`} type={btnType}>
      {btnText}
    </button>
    );
}