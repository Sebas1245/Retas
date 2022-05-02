import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
type Props = {
    retaId: string,
    imgSource: string,
    cardTitle: string,
    gameLocation: string,
    gameTime: string,
    gameDate: string
}

export default function Card({retaId, imgSource, cardTitle, gameLocation, gameTime, gameDate}: Props) {
    const navigate = useNavigate();
    return (            
    <div className="card bg-dark text-white" onClick={() => navigate(`reta/${retaId}`)} style={{cursor: 'pointer'}}>
        <img src= {imgSource} className = "card-img fluid" alt="..." style={{maxHeight:270, minHeight:180, objectFit:"cover"}}/>
        <div className="card-img-overlay d-flex flex-column justify-content-start align-items-start">
             <h5 className="card_title">{cardTitle}</h5>
        </div>
        <div className="card-footer bg-light text-dark">
            <div className="row">
                <div className="col">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {' '}
                    {gameLocation}
                </div>
                <div className="col">
                    <FontAwesomeIcon icon={faClock} />
                    {' '}
                    {gameTime}
                </div>
                <div className="col">
                    <FontAwesomeIcon icon={faCalendar} />
                    {' '}
                    {gameDate}
                </div>
            </div>
        </div>
    </div>
    
    );
}