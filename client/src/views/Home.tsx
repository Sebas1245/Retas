import Container from 'react-bootstrap/Container';
import CardGrid from '../components/CardGrid/CardGrid';
import CarouselSimple from '../components/Carousel';

export default function HomeSearch() {
    return (
        <div className='full-page-with-nav mt-5'>      
            <Container fluid>
                <CarouselSimple deviceType='desktop'/>
            </Container>
            <Container fluid>
                <CardGrid category=''/>
            </Container>
                
        </div>
    );
}