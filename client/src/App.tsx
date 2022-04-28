import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import RetaDetail from './views/RetaDetail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <RetaDetail title={'Reta de Ping Pong'} imgSrc={'./golf_retas.jpeg'} location={'Mi casa'} hour={15} min={30} date={new Date('2022-04-29')} admin={{
        name: 'Sebas Saldana',
        avatarImgSrc: './avatar.jpg'
      }} price={'Gratuito'} confirmedUsers={7} maxUsers={10} />
    </div>
  );
}

export default App;
