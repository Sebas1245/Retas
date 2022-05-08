import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import CardGrid from '../components/CardGrid/CardGrid';
import CarouselSimple from '../components/Carousel';
import { getAllRetasByCategory, getAllRetas } from '../services/retaCalls';

export default function HomeSearch() {
  const [category, setCategory] = useState('');
  const [retas, setRetas] = useState<Array<Reta>>();

  useEffect(() => {
    const fetchRetas = async () => {
      try {
        const allRetas = category ? await getAllRetasByCategory(category) : await getAllRetas();
        setRetas(allRetas);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRetas();
  }, [category]);

  return (
    <Container fluid className='full-page-with-nav'>
      <div className='row mt-3 mt-md-5'>
        <CarouselSimple deviceType='desktop' setCategory={setCategory} />
      </div>
      <hr />
      <div className='row p-5 pt-0'>
        <CardGrid retas={retas} />
      </div>
    </Container>
  );
}