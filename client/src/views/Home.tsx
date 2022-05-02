import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import CardGrid from '../components/CardGrid/CardGrid';
import LinkNav from '../components/CardGrid/LinkNav';
import CarouselSimple from '../components/Carousel';
import { getAllRetasByCategory, getAllRetas } from '../services/retaCalls';

export default function HomeSearch() {
    const [category, setCategory] = useState('');
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
        <div className='full-page-with-nav mt-5'>
            <Container fluid>
                <CarouselSimple deviceType='desktop' setCategory={setCategory} />
            </Container>
            <Container className="row h-100 p-5 pt-0" fluid>
                {/* <LinkNav/> */}
                <hr />
                <CardGrid retas={retas}/>
            </Container>
        </div>
    );
}