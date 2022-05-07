import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  imgSrc?: string,
  title: string,
  name?: string,
  role?: string,
  edit?: string,
  children?: React.ReactNode
}

export default function Sidebar({imgSrc, title, name, role, edit, children}: Props)  {
    return (
        <div className="container-fluid h-100 bg-secondary">
            <div className="row pt-5">
                <h3 className="text-dark fw-bold start-50">{title}</h3>
            </div>
            <div className="row pt-4">
                <div className="col-4">
                    {
                        imgSrc ? (<img className="img-fluid align-content-right rounded-circle " alt="User profile" src={imgSrc} style={{objectFit: "cover"}}/>)
                        : <FontAwesomeIcon color="gray" icon={faUserCircle} size={'4x'}/>
                    }
                    
                </div>
                <div className="col-8">
                    <h6 style={{textAlign:"left", fontWeight:"700",}}>{name}</h6>
                    <p style={{textAlign:"left", fontWeight:"200", marginTop:"-7.5px"}}>{role}</p>
                    <button style={{textAlign:"left", fontStyle: "italic", fontWeight:"200", backgroundColor:"transparent", border:0}}>{edit}</button>
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