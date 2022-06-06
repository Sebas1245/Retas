import React from "react"
import { getWeekday, getMonth, formatTime } from "../../utils/dateTransforms";
import { getImageByCategory } from "../../utils/imageCategory";
import Card from "./Card"

export default function CardGrid({ retas }: { retas: Array<Reta> | undefined }) {
  return (
    <>
      {
        retas?.map(reta => (
          <div key={reta._id ? reta._id : ""} className="col-md-4 col-12">
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
    </>
  );
}

