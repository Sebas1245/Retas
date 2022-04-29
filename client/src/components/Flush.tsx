import React from "react";

type Props = {
    id: string,
    title: string,
    text: string
}

export default function Flush({id, title, text}: Props)  {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={id}>
            <button className="accordion-button collapsed" style={{fontWeight:"bold"}} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${id}`} aria-expanded="false" aria-controls={`flush-collapse${id}`}>
                {title}
            </button>
            </h2>
            <div id={`flush-collapse${id}`} className="accordion-collapse collapse" aria-labelledby={`#flush-heading${id}`} data-bs-parent="#accordionFlush">
            <div className="accordion-body" style={{color:"#070707"}}>{text}</div>
            </div>
        </div>
    );
}