import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import HomeSearch from './views/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeSearch />
    </div>
  );
}

export default App;
