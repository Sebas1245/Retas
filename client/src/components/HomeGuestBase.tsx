import React from "react";

type Props = {
  imgSrc: string,
  title: string, 
  question: string,
  linkMsg: string,
  linkClick: () => void;
  children: React.ReactNode
}

export default function HomeGuest({imgSrc, title, question, linkMsg, linkClick, children}: Props)  {
    return (
      <div className="container-fluid full-page-with-nav">
        <div className="row h-100">
          <div className="d-none d-md-block col-12 col-md-4 col-lg-6 p-0">
            <img src={imgSrc} className="img-fluid h-100" style={{objectFit: "cover"}}/>
          </div>
          <div className="col-12 col-md-8 col-lg-6 bg-dark px-5">
            <h1 className="text-primary fw-bold pt-5 text-start">{title}</h1>
            {children}
            <div>
              <p className="text-start text-light fw-bold">{question} <a onClick={linkClick} href="#" className="text-primary">
                {linkMsg}</a> 
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}