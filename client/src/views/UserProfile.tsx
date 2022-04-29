import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import Flush from "../components/Flush";
import CardGrid from "../components/CardGrid/CardGrid";

export default function UserProfile() {
    return (
        <div className="full-page-with-nav">
            <Navbar />
            <div className="row full-page-with-nav">
                <div className="d-none d-md-block col-12 col-lg-3">
                    <Sidebar
                        title="Mi Perfil"
                        imgSrc="./avatar.jpg"
                        name="Juan José Beltrán"
                        role="Administrador" >
                        <Flush
                            id="One"
                            title="Mi información"
                            text="Correo electrónico" />                        
                    </Sidebar>
                </div>
                <div className="col-12 col-lg-9">
                    <CardGrid/>
                </div>
            </div>
      </div>
    )
}