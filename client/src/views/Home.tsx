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
        <h2>Categorías</h2>
      </div>
      <div className='row mt-1'>
        <CarouselSimple deviceType='desktop' setCategory={setCategory} />
      </div>
      <hr />
      <div className='row mt-2 px-3 px-lg-5 pt-2'>
        <h2>{category === '' ? 'Todas las retas' : category}</h2>
      </div>
      <div className='row px-3 px-lg-5 pt-2'>
        <CardGrid retas={retas} />
      </div>
    </Container>
  );
}