import Carousel from "react-multi-carousel";
import Image from 'react-bootstrap/Image'
import "react-multi-carousel/lib/styles.css";

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
const images = [
  "./portero_retas.jpg",
  "./basket_retas.jpg", 
  "./portero_retas.jpg",
  "./basket_retas.jpg", 
  "./portero_retas.jpg",
  "./basket_retas.jpg", 
  "./portero_retas.jpg",
  "./basket_retas.jpg"
];

export default function CarouselSimple({ deviceType }: Props) {
  return (
    <Carousel
      ssr
      partialVisbile
      deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
    >
      {images.slice(0, 5).map(image => {
        return (
          <Image
            draggable={false}
            style={{ width: "100%", height: "100%" }}
            src={image}
          />
        );
      })}
    </Carousel>
  );
};