import React, { useState } from 'react';
import HomeLogin from '../components/HomeGuest/HomeLogin';
import HomeRegister from '../components/HomeGuest/HomeRegister';
import Navbar from '../components/Navbar';

export default function Home() {
    const [isRegister, setIsRegister] = useState(true);
    const handleLinkClick = () => {
      setIsRegister(!isRegister);
    }

    return (
      <div>
        <Navbar />
        {isRegister 
            ? <HomeRegister linkClick={handleLinkClick} /> 
            : <HomeLogin linkClick={handleLinkClick} /> } 
      </div>
    )
}