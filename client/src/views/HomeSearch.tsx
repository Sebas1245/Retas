import Navbar from '../components/Navbar';
import CardGrid from '../components/CardGrid';
import CarouselSimple from '../components/Carousel';

export default function HomeSearch() {
    return (
        <div>
            <Navbar/>
            <CarouselSimple deviceType='desktop'/>
            <CardGrid/>
        </div>
    );
}