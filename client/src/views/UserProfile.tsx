import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import Flush from "../components/Flush";
import CardGrid from "../components/CardGrid/CardGrid";
import { getAllRetasForUser } from "../services/userCalls";

export default function UserProfile() {
  const [retasAsAdmin, setRetasAsAdmin] = useState<Array<Reta>>();
  const [retasAsParticipant, setRetasAsParticipant] = useState<Array<Reta>>();
  const username : string = sessionStorage.getItem('userName')!;

  useEffect(() => {
    const fetchRetas = async () => {
      try {
        const { retasAsAdmin, retasAsParticipant } = await getAllRetasForUser();
        setRetasAsAdmin(retasAsAdmin);
        setRetasAsParticipant(retasAsParticipant)
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
            name={username}
            edit="Editar foto">
            <Flush
              id="One"
              title="Mi información"
              text="Correo electrónico" />
          </Sidebar>
        </div>
        <div className="col-12 col-lg-9">
          <div className="row mt-5">
            <h2>Retas que administras</h2>
            {retasAsAdmin && retasAsAdmin?.length > 0 ? 
              (
                <CardGrid retas={retasAsAdmin} />
              ) :
              (
                <p>¡No has creado retas aún!</p>
              )
            }
          </div>
          <div className="row mt-5">
            <h2>Retas en las que participas</h2>
            {retasAsParticipant && retasAsParticipant?.length > 0 ? 
              (
                <CardGrid retas={retasAsParticipant} />
              ) :
              (
                <p>¡No has confirmado asistencia a alguna reta!</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}