import React from "react";
import HomeGuest from "../components/HomeGuestBase";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { signup } from "../services/userCalls";
import { useNavigate } from "react-router-dom";

export default function HomeRegister() {

  const navigate = useNavigate()
  const [nameFeedback, setNameFeedback] = useState("")
  const [usernameFeedback, setUsernameFeedback] = useState("")
  const [emailFeedback, setEmailFeedback] = useState("")
  const [phoneFeedback, setPhoneFeedback] = useState("")
  const [passwordFeedback, setPasswordFeedback] = useState("")
  const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState("")

  const onSubmit: (e: React.FormEvent) => void = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      nombre: { value: string },
      usuario: { value: string },
      email: { value: string },
      password: { value: string },
      passwordCheck: { value: string },
      phoneNumber: { value: string }
    };

    let errorFound = false;
    if (!target.nombre.value) {
      setNameFeedback("Escribe tu nombre.")
      errorFound = true
    } else {
      setNameFeedback("")
    }

    if (!target.usuario.value) {
      setUsernameFeedback("Escribe un nombre de usuario.")
      errorFound = true
    } else {
      setUsernameFeedback("")
    }

    // HTML5 Specification
    const emailPattern : RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!target.email.value || !emailPattern.test(target.email.value)) {
      setEmailFeedback("Escribe un correo electrónico válido.")
      errorFound = true
    } else {
      setEmailFeedback("")
    }

    const phonePattern : RegExp = /^[0-9]{10}$/;
    if (!target.phoneNumber.value || !phonePattern.test(target.phoneNumber.value)) {
      setPhoneFeedback("Deben ser 10 dígitos solamente.")
      errorFound = true
    } else {
      setPhoneFeedback("")
    }

    const passwordPattern : RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!target.password.value || !passwordPattern.test(target.password.value)) {
      setPasswordFeedback("Debe contener 8 o más caracteres. Al menos 1 mayúscula, al menos 1 minúscula y al menos 1 número.")
      errorFound = true
    } else {
      setPasswordFeedback("")
    }

    if (!target.passwordCheck.value) {
      setConfirmPasswordFeedback("Escribe la contraseña de nuevo.")
      errorFound = true
    } else if (target.password.value !== target.passwordCheck.value) {
      setConfirmPasswordFeedback("Las contraseñas no coinciden.")
      errorFound = true;
    } else {
      setConfirmPasswordFeedback("")
    }

    if (errorFound) {
      return;
    }

    try {
      await signup(target.usuario.value, target.email.value, target.password.value, target.passwordCheck.value, target.nombre.value, target.phoneNumber.value)
      navigate("/")
    } catch (error) {
      const err = error as typeof error & ErrorResponse;
      console.error(err);
      alert(err.msg);
    }
  }

  return (
    <HomeGuest 
        imgSrc="./basket_retas.jpg" 
        title="Únete a la comunidad de retas más grande del mundo."
        question="¿Ya tienes cuenta?"
        linkMsg="Inicia sesión"
        navigateTo="/login">
      <Form className={"row mt-5 pt-4"} onSubmit={onSubmit} noValidate={true}>
        <Input type="text" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="nombre" placeholder="Nombre" labelClass="form-label ps-4"
            feedbackClass="px-3 pt-2 text-danger" feedbackText={nameFeedback}
        />
        <Input type="text" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="usuario" placeholder="Usuario" labelClass="form-label ps-4"
            feedbackClass="px-3 pt-2 text-danger" feedbackText={usernameFeedback}
        />
        <Input type="email" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="email" placeholder="Correo electrónico" labelClass="form-label ps-4"
            feedbackClass="px-3 pt-2 text-danger" feedbackText={emailFeedback}
        />
        <Input type="tel" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="phoneNumber" placeholder="Número de teléfono" labelClass="form-label ps-4"
            feedbackClass="px-3 pt-2 text-danger" feedbackText={phoneFeedback}
        />
        <Input type="password" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="password" placeholder="Contraseña" labelClass="form-label ps-4"
            feedbackClass="px-3 pt-2 text-danger" feedbackText={passwordFeedback}
        />
        <Input type="password" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="passwordCheck" placeholder="Contraseña de nuevo" labelClass="form-label ps-4"
            feedbackClass="px-3 pt-2 text-danger" feedbackText={confirmPasswordFeedback}
        />

        <div className="d-grid col-lg-7 mb-4">
          <Button 
                className="btn-primary rounded-pill fw-bold"
                btnType="submit"
                btnText="Registrarme"
                padding="py-3"/>
        </div>
      </Form>
    </HomeGuest>
  );
}