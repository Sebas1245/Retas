import React from "react";
import BtnBrand from "./BtnBrand";
import NavCollapse from "./NavCollapse";
import SearchBar from "./SearchBar";
import Button from "../Button";
import NavList from "./NavList";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
    return (
        <nav className="navbar fixed-top navbar-expand-md navbar-light bg-light border-bottom border-3">
          <div className="container-fluid">
            <BtnBrand className="navbar-brand fw-bold fs-1 lh-base"/>
            <NavCollapse id="navbarContent">
              <SearchBar 
                  formClass="ms-auto me-md-2 my-2 my-lg-0"
                  borderClass="border-primary" 
                  searchPlaceholder="Busca una reta"/>
              <div className="d-grid me-lg-4">
                <Button 
                    onClick={() =>  navigate('/create_reta')}
                    className="btn-primary rounded-pill px-lg-5 px-3 fw-bold"
                    btnType="button"
                    btnText="Crea una reta"/>
              </div>
              <NavList />
            </NavCollapse>
          </div>
        </nav>
    )
}