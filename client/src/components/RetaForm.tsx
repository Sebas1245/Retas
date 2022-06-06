import React from "react";

type Props = {
  imgSrc: string,
  children: React.ReactNode
}

export default function RetaForm({ imgSrc, children }: Props) {
  return (
    <>
      <div className="row" style={{ position: "relative" }}>
        <img className="img-fluid rounded mt-4" src={imgSrc} style={{
          objectFit: "cover", objectPosition: "center 66%",
          height: 280
        }} />
      </div>
      {children}
    </>
  );
}