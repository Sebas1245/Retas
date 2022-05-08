import Carousel from "react-multi-carousel";
import Card from 'react-bootstrap/Card';
import "react-multi-carousel/lib/styles.css";
import Button from "./Button";

type Props = {
  deviceType: string,
  setCategory: Function
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1440 },
    items: 5,
    partialVisibilityGutter: 25
  },
  desktopS: {
    breakpoint: { max: 1440, min: 1024 },
    items: 4,
    partialVisibilityGutter: -10
  },
  tablet: {
    breakpoint: { max: 1024, min: 900 },
    items: 4,
    partialVisibilityGutter: -35
  },
  tabletS: {
    breakpoint: { max: 900, min: 768 },
    items: 3,
    partialVisibilityGutter: -7
  },
  mobileXL: {
    breakpoint: { max: 768, min: 550 },
    items: 3,
    partialVisibilityGutter: -80
  },
  mobileL: {
    breakpoint: { max: 550, min: 425 },
    items: 2,
    partialVisibilityGutter: -50
  },
  mobileM: {
    breakpoint: { max: 425, min: 375 },
    items: 2,
    partialVisibilityGutter: -75
  },
  mobileS: {
    breakpoint: { max: 375, min: 0 },
    items: 1,
    partialVisibilityGutter: 60
  }
};


export default function CarouselSimple({ deviceType, setCategory }: Props) {
  const categories = [
    { name: 'Todas', imgSrc: 'portero_retas.jpg' },
    { name: 'Futbol', imgSrc: './futbol_cat.jpg' },
    { name: 'Baloncesto', imgSrc: './basket_cat.jpg' },
    { name: 'Voleibol', imgSrc: './voley_cat.jpg' },
    { name: 'Golf', imgSrc: './golf_cat.jpg' },
    { name: 'Raquetbol', imgSrc: './raquet_cat.jpg' },
    { name: 'eSports', imgSrc: './esport_cat.jpg' },
    { name: 'Ajedrez', imgSrc: './chess_cat.jpg' },
    { name: 'Otras', imgSrc: './other_cat.jpg' }
  ];
  return (
    <Carousel
      partialVisible
      deviceType={deviceType}
      responsive={responsive}
      draggable={true}
      autoPlay={false}
      shouldResetAutoplay={false}
    >
      {categories.map(category => {
        return (
          <Card key={category.name} style={{ height: '9rem', width: '16rem' }}>
            <Card.Img style={{ height: '100%', objectFit: "cover" }} src={category.imgSrc} alt="Category img" />
            <Card.ImgOverlay>
              <div style={{ height: '100%' }} className="d-flex flex-column align-items-center justify-content-center">
                <Button
                  className="btn-dark rounded-pill fw-bold py-auto"
                  btnType="button"
                  btnText={category.name}
                  padding="px-4 py-2"
                  onClick={() => category.name !== 'Todas' ? setCategory(category.name) : setCategory(undefined)}
                />
              </div>
            </Card.ImgOverlay>
          </Card>
        );
      })}
    </Carousel>
  );
};