import React from "react";

type Props = {
  imgSrc: string,
  children: React.ReactNode
}

export default function RetaForm({imgSrc, children}: Props)  {
    return (
      <div className="container-fluid">
        <div className="row" style={{position:"relative"}}>
          <img className="img-fluid rounded mt-2 pt-4" src={imgSrc} style={{objectFit: "cover", height:280}}/>
          <button className="fluid rounded-circle border-0" style={{height:50, width:50, background: "rgba(229, 229, 229, 0.6)", objectFit:"cover", position:"absolute", bottom:10, right:30}}><img src="./edit_black_24dp (1).svg" alt="edit" style={{height:25, width:25, objectFit:"cover", opacity:1}}/></button>
        </div>
        <div className="row">
          {children}
        </div>
      </div>
    );
}