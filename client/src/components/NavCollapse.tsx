import React from "react";

type Props = {
  id: string
  children?: React.ReactNode;
}

export default function NavCollapse({ id, children }: Props) {
    return (
    <>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-controls={id} aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id={id}>
        {children}
      </div>
    </>)
}