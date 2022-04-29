import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='pt-5 mt-5'>
      Hello from home. The reta grid will be here
      {' '}
      <Link to={'/register'}>Go to register</Link>
    </div>
  )
}