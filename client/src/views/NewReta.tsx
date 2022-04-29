import React from 'react';
import { Link } from 'react-router-dom';

export default function NewReta() {
    return (
        <div className='pt-5 mt-5'>
            Hello from new reta
            {' '}
            <Link to={'/login'}>Go to login</Link>
        </div>
    )
}