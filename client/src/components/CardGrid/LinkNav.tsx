import React from "react"
import Container from 'react-bootstrap/Container';

export default function LinkNav() {
    return (            
        <Container>
            <ul className="nav justify-content-start" >
                <li className="nav-item">
                    <a href="#link" data-rr-ui-event-key="#link" className="pt-2 nav-link active">
                        <h5 className="text-dark">Todas</h5>
                    </a>
                </li>                    
                <li className="nav-item">
                    <a href="#link" data-rr-ui-event-key="#link" className="pt-2 nav-link active">
                        <h5 className="text-dark">Cerca de ti</h5>
                    </a>
                </li>                    
                <li className="nav-item">
                    <a href="#link" data-rr-ui-event-key="#link" className="pt-2 nav-link active">
                        <h5 className="text-dark">Populares</h5>
                    </a>
                </li>
            </ul>
        </Container>
    
    );
}