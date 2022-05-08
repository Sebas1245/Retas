import React from "react";
import HomeGuest from "../components/HomeGuestBase";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { signup } from "../services/userCalls";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomeRegister() {

  const navigate = useNavigate()
  const location = useLocation();
  const [nameFeedback, setNameFeedback] = useState("")
  const [usernameFeedback, setUsernameFeedback] = useState("")
  const [emailFeedback, setEmailFeedback] = useState("")
  const [phoneFeedback, setPhoneFeedback] = useState("")
  const [passwordFeedback, setPasswordFeedback] = useState("")
  const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState("")
  const [password1TextShow, setPassword1TextShow] = useState<boolean>(true)
  const [password2TextShow, setPassword2TextShow] = useState<boolean>(true)

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
    const validateNames : RegExp = /^[a-zA-Z0-9.!#@$%&'*+/=?^_`{|}~-]{1}[a-zA-Z0-9.!#@$%&'*+/=?^_`{|}~-\s]*$/;
    const validateMexicanNames : RegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    if (!target.nombre.value || 
      (!validateNames.test(target.nombre.value) && !validateMexicanNames.test(target.nombre.value))) {
      setNameFeedback("Escribe tu nombre.")
      errorFound = true
    } else {
      setNameFeedback("")
    }

    if (!target.usuario.value || !validateNames.test(target.usuario.value)) {
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
      setPasswordFeedback("Esta contraseña no es válida.")
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
      console.error(err);
      alert(err.msg);
    }
  }

  const toggleShowPassword = (targetId: string) => { 
    const x : HTMLInputElement = document.getElementById(targetId) as HTMLInputElement;
    if (targetId === 'password') {
        setPassword1TextShow(!password1TextShow)
    } else {
        setPassword2TextShow(!password2TextShow)
    }
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
  } 

  return (
    <HomeGuest 
        imgSrc="./basket_retas.jpg" 
        title="Únete a la comunidad de retas más grande del mundo."
        question="¿Ya tienes cuenta?"
        linkMsg="Inicia sesión"
        navigateTo="/login"
        navigateState={location.state}
        >
      <Form className={"row mt-5 pt-2"} onSubmit={onSubmit} noValidate={true}>
        <div className="text-hint mb-1 small"><p><span className="text-light">*</span> = requerido</p></div>
        <Input type="text" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="nombre" placeholder="Nombre" labelClass="form-label ps-4" maxLength={40}
            feedbackClass="px-3 pt-2 text-light" feedbackText={nameFeedback}
        />
        <Input type="text" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="usuario" placeholder="Usuario" labelClass="form-label ps-4" maxLength={40}
            feedbackClass="px-3 pt-2 text-light" feedbackText={usernameFeedback}
        />
        <Input type="email" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="email" placeholder="Correo electrónico" labelClass="form-label ps-4"
            feedbackClass="px-3 pt-2 text-light" feedbackText={emailFeedback}
        />
        <Input type="tel" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="phoneNumber" placeholder="Número de teléfono a 10 dígitos" labelClass="form-label ps-4" maxLength={10}
            feedbackClass="px-3 pt-2 text-light" feedbackText={phoneFeedback}
        />
        <Input type="password" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="password" placeholder="Contraseña" labelClass="form-label ps-4" maxLength={40}
            feedbackClass="px-3 pt-2 text-light" feedbackText={passwordFeedback} extras="Al menos 8 caracteres con: 1 mayúscula, 1 minúscula y 1 número."
        />
        <div className="col-lg-7 mb-4">
          <input onClick={() =>toggleShowPassword('password')} type="checkbox" className="btn-check me-2" id="customCheck1" />
          <label className="btn btn-outline-light rounded-pill" htmlFor="customCheck1">
              {password1TextShow ? 'Mostrar contraseña' : 'Ocultar contraseña'}
          </label>
        </div>
        <Input type="password" divClass="form-floating col-lg-7 mb-4" inputClass="form-control rounded-pill"
            inputId="passwordCheck" placeholder="Contraseña de nuevo" labelClass="form-label ps-4" maxLength={40}
            feedbackClass="px-3 pt-2 text-light" feedbackText={confirmPasswordFeedback}
        />
        <div className="col-md-6 mb-4">
            <input onClick={() => toggleShowPassword('passwordCheck')} type="checkbox" className="btn-check me-2" id="customCheck2" />
            <label className="btn btn-outline-light rounded-pill" htmlFor="customCheck2">
                {password2TextShow ? 'Mostrar confirmación de contraseña' : 'Ocultar confirmación de contraseña'}
            </label>
        </div>
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