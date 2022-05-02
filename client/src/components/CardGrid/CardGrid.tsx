import React, { useEffect, useState } from "react"
import { getAllRetas, getAllRetasByCategory } from "../../services/retaCalls"
import { getWeekday, getMonth, formatTime } from "../../utils/dateTransforms";
import { getImageByCategory } from "../../utils/imageCategory";
import Card from "./Card"
import LinkNav from "./LinkNav"

export default function CardGrid({ category }: { category: string | undefined }) {
  const [retas, setRetas] = useState<Array<Reta>>();

  useEffect(() => {
    const fetchRetas = async () => {
      try {
        const allRetas = category ? await getAllRetasByCategory(category) : await getAllRetas();
        console.log(allRetas);
        setRetas(allRetas);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    }
    fetchRetas();
  }, [category]);


  return (
    <div className="row h-100 p-5 pt-2">
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {
          retas?.map(reta => (
            <div className="col-md-4 col-sm-6">
              <Card
                retaId={reta._id}
                imgSource={getImageByCategory(reta.category)}
                cardTitle={reta.name}
                gameDate={`${getWeekday(reta.date)} ${getMonth(reta.date)} ${reta.date.getDate()}`}
                gameLocation={reta.location}
                gameTime={formatTime(reta.hours, reta.minutes)} />
            </div>
          ))
        }
      </div>
    </div>

  );
}

