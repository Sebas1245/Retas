import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Flush from "../components/Flush";
import CardGrid from "../components/CardGrid/CardGrid";
import { getAllRetasForUserAsAdmin, getAllRetasForUserAsParticipant, getLoggedInUser } from "../services/userCalls";
import Button from "../components/Button";
import { deleteToken } from "../services/tokenUtilities";
import { useNavigate } from "react-router-dom";
import ButtonNav, { NavItem } from "../components/ButtonNav";

export default function UserProfile() {
  const [retas, setRetas] = useState<Array<Reta>>();
  const [isSearchingForAdminRetas, setIsSearchingForAdminRetas] = useState<boolean>(true);
  const [activeNavItem, setActiveNavItem] = useState<number>(0)
  const [user, setUser] = useState<User>();
  const username : string = sessionStorage.getItem('userName')!;
  const navigate = useNavigate();
  let navItems : Array<NavItem> = [
    {title: 'Retas administradas', action: () => fetchAdminRetas()},
    {title: 'Retas como participante', action: () => fetchParticipantRetas()},  
  ]
  const fetchAdminRetas = async () => {
    try {
      const { retasAsAdmin } = await getAllRetasForUserAsAdmin();
      setActiveNavItem(0);
      setIsSearchingForAdminRetas(true);
      setRetas(retasAsAdmin);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchParticipantRetas = async () => {
    try {
      const { retasAsParticipant } = await getAllRetasForUserAsParticipant();
      setActiveNavItem(1);
      setIsSearchingForAdminRetas(false);
      setRetas(retasAsParticipant);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchInitialRetas = async () => {
      try {
        const { retasAsAdmin } = await getAllRetasForUserAsAdmin();
        setIsSearchingForAdminRetas(true);
        setRetas(retasAsAdmin);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchUserData = async () => {
      try {
        const loggedInUser : User = await getLoggedInUser();
        setUser(loggedInUser);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
    fetchInitialRetas();
  }, []);

  return (
    <div className="full-page-with-nav container-fluid">
      <div className="row h-100">
        <div className="d-none d-md-block col-12 col-lg-3">
          <Sidebar
            title="Mi Perfil"
            name={username}
            edit="Editar foto">
              <Flush
                id="One"
                title="Mi información"
                userData={user ?? user} />
              <div className="row my-5 px-3">

                <Button 
                    onClick={() => {
                      deleteToken();
                      navigate('/');
                    }}
                    className="btn-outline-dark btn-sm rounded-pill fw-bold ms-lg-2"
                    padding={''}
                    btnType="button"
                    btnText="Cerrar sesión"/>
              </div>
          </Sidebar>
        </div>
        <div className="col-12 col-lg-9 py-3 py-lg-5">
          <div className="row me-md-2">
            <ButtonNav navItems={navItems} activeNavItem={activeNavItem} />
          </div>
          <div className="row me-md-2 pt-3">
            {retas && retas?.length > 0 ?
              (
                <CardGrid retas={retas} />
              ) :
              isSearchingForAdminRetas ?
                (
                  <p className="mt-3">¡No has creado retas aún!</p>
                ) : (
                  <p className="mt-3">¡No has confirmado asistencia ninguna reta!</p>
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}