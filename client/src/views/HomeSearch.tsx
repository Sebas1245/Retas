import Container from 'react-bootstrap/Container';
import Navbar from '../components/Navbar';
import CardGrid from '../components/CardGrid/CardGrid';
import CarouselSimple from '../components/Carousel';

export default function HomeSearch() {
    return (
        <div>
            <Container style={{height: '100px'}}>
                <Navbar/>
            </Container>            
            <Container>
                <CarouselSimple deviceType='desktop'/>
            </Container>
            <Container>
                <CardGrid/>
            </Container>
                
        </div>
    );
}