import React from "react";

type Props = {
  className?: string,
  children: React.ReactNode;
}

export default function Form({className, children}: Props) {
  return (
    <form className={className}>
      {children}
    </form>
  );
}