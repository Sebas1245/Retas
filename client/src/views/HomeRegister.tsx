import React from "react";
import HomeGuest from "../components/HomeGuestBase";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";

export default function HomeRegister({linkClick}: {linkClick: () => void}) {
  return (
    <HomeGuest 
        imgSrc="./basket_retas.jpg" 
        title="Únete a la comunidad de retas más grande del mundo."
        question="¿Ya tienes cuenta?"
        linkMsg="Inicia sesión"
        linkClick={linkClick}>
      <Form className="row mt-5 pt-4">
        <Input type="text" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="nombre" placeholder="Nombre" labelClass="form-label ps-4" 
        />
        <Input type="text" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="usuario" placeholder="Usuario" labelClass="form-label ps-4" 
        />
        <Input type="email" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="email" placeholder="Correo electrónico" labelClass="form-label ps-4" 
        />
        <Input type="password" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="password" placeholder="Contraseña" labelClass="form-label ps-4" 
        />
        <Input type="password" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="passwordCheck" placeholder="Contraseña de nuevo" labelClass="form-label ps-4" 
        />
        <div className="d-grid col-lg-7 mb-4">
          <Button 
                className="btn-primary rounded-pill fw-bold"
                btnType="button"
                btnText="Registrarme"
                padding="py-3"/>
        </div>
      </Form>
    </HomeGuest>
  );
}