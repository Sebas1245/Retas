import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import CardGrid from '../components/CardGrid/CardGrid';
import { getRetasBySearchBarQuery } from '../services/retaCalls';

export default function SearchBarQuery() {
    const [searchResultRetas, setSearchResultReta] = useState<Array<Reta>>();
    const [searchParams] = useSearchParams();
    const textQuery = searchParams.get('textQuery');
    useEffect(() => {
        const getRetasByTextQuery = async () => {
            if (!textQuery) return
            try {
                const retas = await getRetasBySearchBarQuery(textQuery);
                setSearchResultReta(retas);
            } catch (error : any) {
                console.log(error);
            }
        }
        getRetasByTextQuery();
    }, [textQuery])
    return (
        <div className='full-page-with-nav mt-5'>
            {
                searchResultRetas && searchResultRetas.length > 0 ? (
                    <div>
                        <Container fluid>
                            <h3>Esto es lo que encontramos para ti</h3>
                        </Container>
                        <Container fluid>
                            <CardGrid retas={searchResultRetas} />
                        </Container>
                    </div>
                ) : searchResultRetas ? (
                    <Container fluid>
                        <h3>Lo sentimos, no encontramos algo como lo que buscabas.</h3>
                    </Container>
                ) : (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )
            }
        </div>
    )
}