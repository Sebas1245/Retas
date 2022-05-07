import React from "react";

type Props = {
  className?: string,
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void,
  noValidate?: boolean,
  children: React.ReactNode;
}

export default function Form({ className, onSubmit, noValidate, children }: Props) {
  return (
    <form className={className} onSubmit={onSubmit} noValidate={noValidate}>
      {children}
    </form>
  );
}