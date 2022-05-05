import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import RetaForm from "../components/RetaForm";
import Sidebar from "../components/Sidebar";
import Flush from "../components/Flush";
import { useNavigate } from "react-router-dom";
import { createReta } from "../services/retaCalls";
import { getToken } from "../services/tokenUtilities";
import { getImageByCategory } from "../utils/imageCategory";

export default function NewReta() {
  const navigate = useNavigate();
  const [retaImage, setRetaImage] = useState('/other_cat.jpg');
  const username: string = sessionStorage.getItem('userName')!;

  const onSubmit: (e: React.FormEvent) => void = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string },
      location: { value: string },
      category: { value: string },
      min_participants: { value: number },
      max_participants: { value: number }
      time: { value: string }
      date: { value: Date }
      is_private: { value: boolean }
    };

    let errorFound = false;

    if (errorFound) {
      return;
    }

    console.log(target.date.value);


    const newReta: Reta = {
      name: target.name.value,
      description: "Soy una reta generica",
      date: target.date.value,
      hours: Number(target.time.value.substring(0, 2)),
      minutes: Number(target.time.value.substring(3)),
      duration: 1,
      location: target.location.value,
      is_private: target.is_private.value,
      min_participants: target.min_participants.value,
      max_participants: target.max_participants.value,
      category: target.category.value,
      confirmed_users: getToken(),
      admin: getToken(),
      is_active: true,
    }

    try {
      const createdReta = await createReta(newReta);
      navigate("/reta/" + createdReta._id)
    } catch (error) {
      const err = error as typeof error & ErrorResponse;
      console.error(err)
    }
  }

  const changeRetaImage: (e: React.ChangeEvent<HTMLSelectElement>) => void = async (e) => {
    setRetaImage(getImageByCategory(e.target.value))
  }

  return (
    <div>
      <Navbar />
      <div className="row full-page-with-nav">
        <div className="d-none d-md-block col-12 col-lg-3">
          <Sidebar
            title="Crear Reta"
            imgSrc="./avatar.jpg"
            name={username}
            role="Administrador" >
            <Flush
              id="One"
              title="Retas Previas"
              text="Basquet con los panas" />
            <Flush
              id="Two"
              title="Retas Recurrentes"
              text="Fucho" />
          </Sidebar>
        </div>
        <div className="col-12 col-lg-9">
          <RetaForm
            imgSrc={retaImage}>
            <Form className="row mt-5" onSubmit={onSubmit}>
              <Input type="text" divClass="form-floating mb-5" inputClass="form-control shadow-none form-control-lg rounded-0 border-0 border-bottom border-2 border-dark"
                inputId="name" placeholder="Nombre de la Reta" labelClass="form-label ps-4 mb-5 h4"
              />
              <div className="row mb-5">
                <h6 className="text-dark fw-bold" style={{ textAlign: "left", paddingBottom: 5 }}>Datos generales</h6>
                <Input type="text" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                  inputId="location" placeholder="Seleccionar ubicación" labelClass="form-label ps-4"
                />
                <Input type="date" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                  inputId="date" placeholder="Seleccionar fecha" labelClass="form-label ps-4"
                />
                <div className="form-floating col-lg-4">
                  <select className="form-control rounded-pill ps-3 pt-2 border-dark border-2" id="category" onChange={changeRetaImage}>
                    <option selected hidden>Elegir categoria</option>
                    <option value="Futbol">Futbol</option>
                    <option value="Golf">Golf</option>
                    <option value="Voleibol">Voleibol</option>
                    <option value="Baloncesto">Baloncesto</option>
                    <option value="Ajedrez">Ajedrez</option>
                    <option value="Raquetbol">Raquetbol</option>
                    <option value="eSports">eSports</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="row mb-5">
                <h6 className="text-dark fw-bold" style={{ textAlign: "left", paddingBottom: 5 }}>Jugadores</h6>
                <div className="form-floating col-lg-4">
                  <select className="form-control rounded-pill ps-3 pt-2 border-dark border-2" id="is_private">
                    <option selected hidden>Elegir privacidad</option>
                    <option value="true">Privado</option>
                    <option value="false">Público</option>
                  </select>
                </div>
                <Input type="number" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                  inputId="min_participants" placeholder="Mínimo de jugadores" labelClass="form-label ps-4"
                />
                <Input type="number" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                  inputId="max_participants" placeholder="Máximo de jugadores" labelClass="form-label ps-4"
                />
              </div>
              <div className="row mb-5">
                <h6 className="text-dark fw-bold" style={{ textAlign: "left", paddingBottom: 5 }}>Adicionales</h6>
                <Input type="time" divClass="form-floating col-lg-4" inputClass="form-control rounded-pill ps-3 border-dark border-2"
                  inputId="time" placeholder="Hora límite de confirmación" labelClass="form-label ps-4"
                />
              </div>
              <div className="row mb-5 pt-2 pb-3">
                <div className="d-grid col-lg-4">
                  <Button
                    className="btn-dark rounded-pill fw-bold"
                    btnType="button"
                    btnText="Invitar amigos"
                    padding="py-3" />
                </div>
                <div className="d-grid col-lg-4">
                  <Button
                    className="btn-primary rounded-pill fw-bold"
                    btnType="submit"
                    btnText="Crear Reta"
                    padding="py-3" />
                </div>
              </div>
            </Form>
          </RetaForm>
        </div>
      </div>
    </div>
  )
}