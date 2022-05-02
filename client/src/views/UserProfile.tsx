import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import Flush from "../components/Flush";
import CardGrid from "../components/CardGrid/CardGrid";
import { getAllRetasForUser } from "../services/userCalls";

export default function UserProfile() {
  const [retas, setRetas] = useState<Array<Reta>>();

  useEffect(() => {
    const fetchRetas = async () => {
      try {
        const { retas } = await getAllRetasForUser();
        setRetas(retas);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    }
    fetchRetas();
  }, []);
  return (
    <div className="full-page-with-nav">
      <div className="row" style={{ height: '100%' }}>
        <div className="d-none d-md-block col-12 col-lg-3">
          <Sidebar
            title="Mi Perfil"
            imgSrc="./avatar.jpg"
            name="Juan José Beltrán"
            edit="Editar foto" >
            <Flush
              id="One"
              title="Mi información"
              text="Correo electrónico" />
          </Sidebar>
        </div>
        <div className="col-12 col-lg-9">
          <CardGrid retas={retas} />
        </div>
      </div>
    </div>
  )
}