import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Container from 'react-bootstrap/Container';
type Props = {
    imgSource: string,
    cardTitle: string,
    gameLocation: string,
    gameTime: string,
    gameDate: string
}

export default function LinkNav() {
    return (            
        <Container>
            <ul className="nav justify-content-start" >
                <li className="nav-item">
                    <a href="#link" data-rr-ui-event-key="#link" className="pt-2 nav-link active">
                        <h5>Todas</h5>
                    </a>
                </li>                    
                <li className="nav-item">
                    <a href="#link" data-rr-ui-event-key="#link" className="pt-2 nav-link active">
                        <h5>Cerca de ti</h5>
                    </a>
                </li>                    
                <li className="nav-item">
                    <a href="#link" data-rr-ui-event-key="#link" className="pt-2 nav-link active">
                        <h5>Populares</h5>
                    </a>
                </li>
            </ul>
        </Container>
    
    );
}