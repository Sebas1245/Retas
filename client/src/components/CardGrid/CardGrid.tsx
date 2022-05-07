import React, { useEffect, useState } from "react"
import { getAllRetas, getAllRetasByCategory } from "../../services/retaCalls"
import { getWeekday, getMonth, formatTime } from "../../utils/dateTransforms";
import { getImageByCategory } from "../../utils/imageCategory";
import Card from "./Card"
import LinkNav from "./LinkNav"

export default function CardGrid({ retas }: { retas: Array<Reta> | undefined }) {


  return (
    <div className="row h-100 ">
      <div className='row row-cols-1 row-cols-md-3 g-3'>
        {
          retas?.map(reta => (
            <div className="col-md-4 col-sm-6">
              <Card
                retaId={reta._id ? reta._id : ""}
                imgSource={getImageByCategory(reta.category)}
                cardTitle={reta.name}
                gameDate={`${getWeekday(reta.date)} ${reta.date.getDate()} ${getMonth(reta.date)} `}
                gameLocation={reta.location}
                gameTime={formatTime(reta.hours, reta.minutes)} />
            </div>
          ))
        }
      </div>
    </div>

  );
}

