import React from "react";
import Navbar from '../components/Navbar';
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import RetaForm from "../components/RetaForm";
import Sidebar from "../components/Sidebar";
import Flush from "../components/Flush";

export default function UserProfile() {
    return (
        <div>
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
                    
                </div>
            </div>
      </div>
    )
}