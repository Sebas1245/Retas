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
    <div className="card">            
        <img src= {imgSource} className = "card-img" alt="..."/>
        {/* <div className="card-img-overlay text-white">
            <div className="d-flex align-items-end">
                <h5 className="card_title">{cardTitle}</h5>
            </div>
        </div> */}
        <div className="card-body">
            <h5 className="card_title">{cardTitle}</h5>           
            <div className='row row-cols-1 row-cols-md-3 g-4'> 
                <div className="col">
                    <button className="btn" type="button">
                       <FontAwesomeIcon icon={faLocationDot}/> {gameLocation} 
                    </button>
                </div>
                <div className="col">
                    <button className="btn" type="button">
                       <FontAwesomeIcon icon={faClock}/> {gameTime}
                    </button>  
                </div>
                <div className="col">
                    <button className="btn" type="button">
                        <FontAwesomeIcon icon={faCalendar}/> {gameDate}
                    </button>   
                </div>
            </div>                       
        </div>                       
    </div>
    
    );
}

//card img overlay
{/* <div className="card text-white">            
        <img src= {imgSource} className = "card-img" alt="..."/>
        <div className="card-img-overlay">
            <h5 className="card_title">{cardTitle}</h5>
            <button className="btn" type="button">
                <FontAwesomeIcon icon={faLocationDot}/>                
            </button>
        </div>                       
    </div> */}