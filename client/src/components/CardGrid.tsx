import React from "react"
import Card from "./Card"
type Props = {

}

// export default function CardGrid({ imgSource, cardTitle, cardDescription }: Props) {
export default function CardGrid() {
    return (            
        <div className="row h-100 p-5">            
            <div className='row row-cols-1 row-cols-md-3 g-4'>  
                <div className="col-md-4 col-sm-6">
                    <Card imgSource="./portero_retas.jpg" cardTitle="Reta de fucho" gameDate="Jue 18" gameLocation="Parque Tec" gameTime="6:00 pm"/>
                </div>          
                <div className="col-md-4 col-sm-6">
                    <Card imgSource="./portero_retas.jpg" cardTitle="Reta de fucho" gameDate="Jue 18" gameLocation="Parque Tec" gameTime="6:00 pm"/>
                </div>
                <div className="col-md-4 col-sm-6">
                    <Card imgSource="./portero_retas.jpg" cardTitle="Reta de fucho" gameDate="Jue 18" gameLocation="Parque Tec" gameTime="6:00 pm"/>
                </div>
                {/* <Card imgSource="./portero_retas.jpg" cardTitle="Reta de fucho" gameDate="Jue 18" gameLocation="Parque Tec" gameTime="6:00 pm"/> */}
            </div>
        </div>
    
    );
}

