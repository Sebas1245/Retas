import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";
type Props = {
    imgSource: string,
    cardTitle: string,
    gameLocation: string,
    gameTime: string,
    gameDate: string
}

export default function Card({imgSource, cardTitle, gameLocation, gameTime, gameDate}: Props) {
    return (            
    <div className="card bg-dark text-white">
        <img src= {imgSource} className = "card-img" alt="..."/>
        <div className="card-img-overlay d-flex flex-column justify-content-start align-items-start">
            <h4 className="card_title">{cardTitle}</h4>
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