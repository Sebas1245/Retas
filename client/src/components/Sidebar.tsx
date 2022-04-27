import React from "react";

type Props = {
  imgSrc?: string,
  title: string,
  name: string,
  role: string,
  children?: React.ReactNode
}

export default function Sidebar({imgSrc, title, name, role, children}: Props)  {
    return (
        <div className="container-fluid h-100 bg-secondary">
            <div className="row pt-5">
                <h3 className="text-dark fw-bold start-50">{title}</h3>
            </div>
            <div className="row pt-4">
                <div className="col-4">
                    <img className="img-fluid align-content-right rounded-circle " src={imgSrc} style={{objectFit: "cover"}}/>
                </div>
                <div className="col-8">
                    <h6 style={{textAlign:"left", fontWeight:"700",}}>{name}</h6>
                    <p style={{textAlign:"left", fontWeight:"200", marginTop:"-7.5px"}}>{role}</p>
                </div>
            </div>
            <div className="row pt-4">
                <div className="accordion accordion-flush" id="#accordionFlush">
                    {children}
                </div>
            </div>
        </div>
    );
}