import React from "react";
import HomeGuest from "../components/HomeGuestBase";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";

export default function HomeLogin() {
  return (
    <HomeGuest 
        imgSrc="./portero_retas.jpg" 
        title="La comunidad de retas más fregona de México."
        question="¿No tienes cuenta aún?"
        linkMsg="Crear cuenta"
        navigateTo="/register"
        >
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