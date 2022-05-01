import React, { useState } from "react";
import HomeGuest from "../components/HomeGuestBase";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/userCalls";

export default function HomeLogin() {

  const navigate = useNavigate()
  const location = useLocation()
  const [usernameFeedback, setUsernameFeedback] = useState("")
  const [passwordFeedback, setPasswordFeedback] = useState("")

  const onSubmit: (e: React.FormEvent) => void = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      usuario: { value: string },
      password: { value: string },
    };

    let errorFound = false;

    if (!target.usuario.value) {
      setUsernameFeedback("Escribe tu nombre de usuario.")
      errorFound = true
    } else {
      setUsernameFeedback("")
    }

    if (!target.password.value) {
      setPasswordFeedback("Escribe tu contraseña.")
      errorFound = true
    } else {
      setPasswordFeedback("")
    }

    if (errorFound) {
      return;
    }

    try {
      await login(target.usuario.value, target.password.value);

      const loc = location as typeof location & {
        state: {from: string}
      }

      if (loc.state && loc.state.from) {
        navigate(loc.state.from);
        return;
      }
      
      navigate("/")
    } catch (error) {
      const err = error as typeof error & ErrorResponse;
      setPasswordFeedback(err.msg)
    }
  }

  return (
    <HomeGuest 
        imgSrc="./portero_retas.jpg" 
        title="La comunidad de retas más fregona de México."
        question="¿No tienes cuenta aún?"
        linkMsg="Crear cuenta"
        navigateTo="/register"
        navigateState={location.state}
        >
      <Form className="row mt-5 pt-4" onSubmit={onSubmit} noValidate={true}>
        <Input type="text" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="usuario" placeholder="Usuario" labelClass="form-label ps-4" 
            feedbackClass="px-3 pt-2 text-danger" feedbackText={usernameFeedback}
        />
        <Input type="password" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="password" placeholder="Contraseña" labelClass="form-label ps-4" 
            feedbackClass="px-3 pt-2 text-danger" feedbackText={passwordFeedback}
        />
        <div className="d-grid col-lg-7 mb-4">
          <Button 
                className="btn-primary rounded-pill fw-bold"
                btnType="submit"
                btnText="Iniciar sesión"
                padding="py-3"/>
        </div>
      </Form>
    </HomeGuest>
  );
}