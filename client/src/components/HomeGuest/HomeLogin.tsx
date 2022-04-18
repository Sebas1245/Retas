import React from "react";
import HomeGuest from ".";
import Form from "../Form";
import Input from "../Form/Input";
import Button from "../Navbar/Button";

export default function HomeLogin({linkClick}: {linkClick: () => void}) {
  return (
    <HomeGuest 
        imgSrc="./portero_retas.jpg" 
        title="La comunidad de retas más fregona de México."
        question="¿No tienes cuenta aún?"
        linkMsg="Crear cuenta"
        linkClick={linkClick}>
      <Form className="row mt-5 pt-4">
        <Input type="text" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="usuario" placeholder="Usuario" labelClass="form-label ps-4" 
        />
        <Input type="password" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="password" placeholder="Contraseña" labelClass="form-label ps-4" 
        />
        <div className="d-grid col-lg-7 mb-4">
          <Button 
                className="btn-primary rounded-pill fw-bold"
                btnType="button"
                btnText="Iniciar sesión"
                padding="py-3"/>
        </div>
      </Form>
    </HomeGuest>
  );
}