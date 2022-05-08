import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

type Props = {
    id: string,
    title: string,
    text?: string,
    userData?: User
}

export default function Flush({id, title, text, userData}: Props)  {
    const navigate = useNavigate()
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={id}>
            <button className="accordion-button collapsed" style={{fontWeight:"bold"}} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${id}`} aria-expanded="false" aria-controls={`flush-collapse${id}`}>
                {title}
            </button>
            </h2>
            <div id={`flush-collapse${id}`} className="accordion-collapse collapse" aria-labelledby={`#flush-heading${id}`} data-bs-parent="#accordionFlush">
            <div className="accordion-body" style={{color:"#070707"}}> 
                {
                    text ? (
                        <a style={{color:"#070707"}}>{text}</a>
                    ) : userData && (
                        <div className="container">
                            <div className="row">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item" style={{backgroundColor: 'transparent'}}>
                                        <strong>Usuario: </strong> <br/>{userData.username}
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: 'transparent'}}>
                                        <strong>Correo electrónico: </strong><br/>{userData.email}
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: 'transparent'}}>
                                        <strong>Teléfono: </strong> <br/>{userData.phoneNumber}
                                    </li>
                                </ul>
                            </div>
                            <div className="row mt-3">
                                <Button 
                                    onClick={() => {
                                    navigate('/edit_user_profile');
                                    }}
                                    className="btn-dark btn-sm rounded-pill fw-bold ms-lg-2"
                                    padding={''}
                                    btnType="button"
                                    btnText="Editar mi información"/>
                            </div>

                        </div>
                    )}
            </div>
            </div>
        </div>
    );
}