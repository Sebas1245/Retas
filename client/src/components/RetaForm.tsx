import React from "react";

type Props = {
  imgSrc: string,
  children: React.ReactNode
}

export default function RetaForm({imgSrc, children}: Props)  {
    return (
      <div className="container-fluid">
        <div className="row">
          <img className="img-fluid rounded mt-2 pt-4" src={imgSrc} style={{objectFit: "cover", height:280}}/>
        </div>
        <div className="row">
          {children}
        </div>
      </div>
    );
}