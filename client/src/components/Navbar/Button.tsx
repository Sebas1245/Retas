import React from "react"

type Props = {
  className?: string,
  btnType: "button" | "submit" | "reset",
  btnText: string
}

export default function Button({ className, btnType, btnText }: Props) {
    return (
    <button className={`btn ${className}`} type={btnType}>
      {btnText}
    </button>
    );
}