import Carousel from "react-multi-carousel";
import Card from 'react-bootstrap/Card';
import "react-multi-carousel/lib/styles.css";
import Button from "./Button";

type Props = {
  deviceType: string,
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
};


export default function CarouselSimple({ deviceType }: Props) {
  const categories = [
    {name: 'Fútbol', imgSrc: './portero_retas.jpg'},
    {name: 'Ajedrez', imgSrc: './portero_retas.jpg'},
    {name: 'Voleibol', imgSrc: './basket_retas.jpg'},
    {name: 'Basquetbol', imgSrc: './portero_retas.jpg'},
    {name: 'eSports y Videojuegos', imgSrc: './basket_retas.jpg'},
    {name: 'Tenis', imgSrc: './portero_retas.jpg'},
    {name: 'Golf', imgSrc: './portero_retas.jpg'}
  ];
  return (
    <Carousel
      partialVisbile
      deviceType={deviceType}
      responsive={responsive}
      draggable={true}
      autoPlay={false}
      shouldResetAutoplay={false}
    >
      {categories.map(category => {
        return (
          <Card style={{height: '100%', width: '90%'}}>
            <Card.Img style={{height: '100%'}} src={category.imgSrc} alt="Category img" />
            <Card.ImgOverlay>
              <div style={{height: '100%'}} className="d-flex flex-column align-items-center justify-content-center">
                <Button
                  className="btn-outline-secondary rounded-pill fw-bold py-auto"
                  btnType="button"
                  btnText={category.name}
                  padding="pl-4 pr-4"
                  onClick={() => alert('Clicked on ' + category.name)}
                />
              </div>
            </Card.ImgOverlay>
          </Card>
        );
      })}
    </Carousel>
  );
};