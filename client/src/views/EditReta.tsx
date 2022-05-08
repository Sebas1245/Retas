import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import RetaForm from "../components/RetaForm";
import Sidebar from "../components/Sidebar";
import Flush from "../components/Flush";
import { useNavigate, useParams } from "react-router-dom";
import { updateReta, getReta } from "../services/retaCalls";
import { getToken } from "../services/tokenUtilities";
import { getImageByCategory } from "../utils/imageCategory";

type InputState = {
  name: string,
  location: string,
  category: string,
  min_participants: string,
  max_participants: string,
  date: string,
  time: string,
  duration: string,
  is_private: string
}

export default function NewReta() {
  const navigate = useNavigate();
  let { retaId } = useParams();
  const [inputValues, setInputValues] = useState<InputState>({
    name: "",
    location: "",
    category: "",
    min_participants: "2",
    max_participants: "2",
    date: "",
    time: "",
    duration: "0.5",
    is_private: ""
  });
  const [inputFeedback, setInputFeedback] = useState<InputState>({
    name: "Vacío. Escribe un nombre",
    location: "Vacío. Escribe la ubicación",
    category: "Elige una categoría",
    min_participants: "2 o más jugadores",
    max_participants: "Mayor o igual al mínimo",
    date: "Elige una fecha",
    time: "Elige la hora de inicio",
    duration: "0.5 o más horas",
    is_private: "Elige la privacidad"
  });
  const [inputFeedbackClass, setInputFeedbackClass] = useState<InputState>({
    name: "px-3 pt-2 text-danger",
    location: "px-3 pt-2 text-danger",
    category: "px-3 pt-2 text-danger",
    min_participants: "px-3 pt-2 text-success",
    max_participants: "px-3 pt-2 text-success",
    date: "px-3 pt-2 text-danger",
    time: "px-3 pt-2 text-danger",
    duration: "px-3 pt-2 text-success",
    is_private: "px-3 pt-2 text-danger"
  });
  const [serverError, setServerError] = useState("");
  const [retaImage, setRetaImage] = useState('/other_cat.jpg');
  const username: string = sessionStorage.getItem('userName')!;

  const getDateAsYYYY_MM_DD = (date: Date) =>  `${date.getFullYear()}-${date.getMonth() < 10 ? ('0'+(date.getMonth()+1)) : date.getMonth()}-${date.getDate() > 10 ? date.getDate() : "0" + date.getDate()}`

  useEffect(() => {
    const getRetaById = async (id: string) => {
      if (retaId === undefined) {
        return;
      }

      try {
        let reta = await getReta(id);
        reta.date = new Date(reta.date)
        setRetaImage('/'+getImageByCategory(reta.category));
        setInputValues({
          name: reta.name,
          location: reta.location,
          category: reta.category,
          min_participants: reta.min_participants as unknown as string,
          max_participants: reta.max_participants as unknown as string,
          date: getDateAsYYYY_MM_DD(reta.date),
          time: `${reta.hours}:${reta.minutes}`,
          duration: reta.duration as unknown as string,
          is_private: reta.is_private ? "Privado" : "Público"
        });
      } catch (error) {
        console.log(error)
      }
    }
    if (retaId) { 
      getRetaById(retaId)
    }
 }, [retaId])
  
  const checkInput: (inputName: string, inputValue: string) => boolean = (inputName, inputValue) => {
    let isGood = false;
    switch (inputName) {
      case "name":
        if (!inputValue) {
          setInputFeedback({ ...inputFeedback, [inputName]: "Sin nombre, escribe uno para tu reta." });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
        } else {
          isGood = true;
          setInputFeedback({ ...inputFeedback, [inputName]: "¡Buen nombre!" });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-success" });
        }
        break;
      case "location":
        if (!inputValue) {
          setInputFeedback({ ...inputFeedback, [inputName]: "Sin ubicación, escribe una para tu reta." });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
        } else {
          isGood = true;
          setInputFeedback({ ...inputFeedback, [inputName]: "¡Lugar listo!" });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-success" });
        }
        break;
      case "category":
        if (!inputValue) {
          setInputFeedback({ ...inputFeedback, [inputName]: "Elige una categoría." });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
        } else {
          isGood = true;
          setInputFeedback({ ...inputFeedback, [inputName]: "¡Categoría lista!" });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-success" });
        }
        break;
      case "min_participants":
        if (Number(inputValue) >= 2 && Number(inputValue) <= Number(inputValues.max_participants)) {
          isGood = true;
          setInputFeedbackClass({
            ...inputFeedbackClass,
            [inputName]: "px-3 pt-2 text-success", "max_participants": "px-3 pt-2 text-success"
          });
        } else if (Number(inputValue) >= 2) {
          setInputFeedbackClass({
            ...inputFeedbackClass,
            [inputName]: "px-3 pt-2 text-success", "max_participants": "px-3 pt-2 text-danger"
          });
        } else if (Number(inputValue) <= Number(inputValues.max_participants)) {
          setInputFeedbackClass({
            ...inputFeedbackClass,
            [inputName]: "px-3 pt-2 text-danger", "max_participants": "px-3 pt-2 text-success"
          });
        } else {
          setInputFeedbackClass({
            ...inputFeedbackClass,
            [inputName]: "px-3 pt-2 text-danger", "max_participants": "px-3 pt-2 text-danger"
          });
        }
        break;
      case "max_participants":
        if ((Number(inputValue) >= Number(inputValues.min_participants))) {
          isGood = true;
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-success" });
        } else {
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
        }
        break;
      case "date":
        if (!inputValue) {
          setInputFeedback({ ...inputFeedback, [inputName]: "Elige una fecha." });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
          break;
        }

        // Q: Why are we using the replace?
        // A: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
        const inputDate = new Date(inputValue.replace(/-/g, '/'));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (inputDate < today) {
          setInputFeedback({ ...inputFeedback, [inputName]: "La fecha ya ha pasado." });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
        } else {
          isGood = true;
          setInputFeedback({ ...inputFeedback, [inputName]: "¡Fecha lista!" });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-success" });
        }
        break;
      case "time":
        if (!inputValue) {
          setInputFeedback({ ...inputFeedback, [inputName]: "Elige una fecha." });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
          break;
        }

        const hr = Number(inputValue.split(":")[0]);
        const min = Number(inputValue.split(":")[1]);
        if (isNaN(hr) || isNaN(min) || hr < 0 || hr > 23 || min < 0 || min > 59) {
          setInputFeedback({ ...inputFeedback, [inputName]: "Elige una hora." });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
        } else {
          isGood = true;
          setInputFeedback({ ...inputFeedback, [inputName]: "¡Hora lista!" });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-success" });
        }
        break;
      case "duration":
        if ((Number(inputValue) >= 0.5)) {
          isGood = true;
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-success" });
        } else {
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
        }
        break;
      case "is_private":
        if (!inputValue) {
          setInputFeedback({ ...inputFeedback, [inputName]: "Elige la privacidad." });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-danger" });
        } else {
          isGood = true;
          setInputFeedback({ ...inputFeedback, [inputName]: "¡Privacidad lista!" });
          setInputFeedbackClass({ ...inputFeedbackClass, [inputName]: "px-3 pt-2 text-success" });
        }
        break;
      default:
        break;
    }

    return isGood;
  }

  const onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void = (e) => {
    checkInput(e.target.name, e.target.value);

    if (e.target.name === "category") {
      setRetaImage('/'+getImageByCategory(e.target.value));
    }

    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();
    console.log(inputValues)

    let isGood = true;
    for (const key in inputValues) {
      isGood = isGood && checkInput(key, inputValues[key as keyof InputState]);
    }

    if (!isGood) {
      return;
    }

    const newReta: Reta = {
      name: inputValues.name,
      description: "Soy una reta",
      location: inputValues.location,
      category: inputValues.category,
      min_participants: Number(inputValues.min_participants),
      max_participants: Number(inputValues.max_participants),
      date: new Date(inputValues.date),
      hours: Number(inputValues.time.split(":")[0]),
      minutes: Number(inputValues.time.split(":")[1]),
      duration: Number(inputValues.duration),
      is_private: Boolean(inputValues.is_private),
      confirmed_users: getToken(),
      admin: getToken(),
      is_active: true,
    }

    try {
      const updatedReta = await updateReta(newReta);
      navigate("/reta/" + updatedReta._id)
    } catch (error) {
      const err = error as typeof error & ErrorResponse;
      console.error(err.msg)
      setServerError("¡Oops! Algo salió mal, intenta de nuevo.");
    }
  }

  return (
    <div className="container-fluid full-page-with-nav">
      <div className="row h-100">
        <div className="d-none d-md-block col-12 col-lg-3">
          <Sidebar
            title="Editar Reta"
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
            <Form className="row mt-3" onSubmit={onSubmit}>
              <h3 className="text-dark fw-bold" style={{ textAlign: "left", paddingBottom: 5 }}>Edita tu reta<span></span></h3>
              <p className="fw-light lh-1"> * = campo requerido</p>
              <Input type="text" divClass="form-floating mb-3" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                inputId="name" placeholder="Nombre de la reta" labelClass="form-label ps-4 mb-5" value={inputValues.name} onChange={onInputChange}
                feedbackClass={inputFeedbackClass.name} feedbackText={inputFeedback.name}
              />
              <h6 className="text-dark fw-bold" style={{ textAlign: "left", paddingBottom: 5 }}>Datos generales</h6>
              <Input type="text" divClass="form-floating col-12 mb-3" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                inputId="location" placeholder="Ubicación" labelClass="form-label ps-4" value={inputValues.location} onChange={onInputChange}
                feedbackClass={inputFeedbackClass.location} feedbackText={inputFeedback.location}
              />
              <div className="form-floating col-md-6 col-lg-4 mb-3">
                <select value={inputValues.category} className="form-control rounded-pill ps-3 pt-2 border-dark border-2" name="category" id="category" onChange={onInputChange}>
                  <option value="">Categoria*</option>
                  <option value="Futbol">Futbol</option>
                  <option value="Golf">Golf</option>
                  <option value="Voleibol">Voleibol</option>
                  <option value="Baloncesto">Baloncesto</option>
                  <option value="Ajedrez">Ajedrez</option>
                  <option value="Raquetbol">Raquetbol</option>
                  <option value="eSports">eSports</option>
                  <option value="Otro">Otro</option>
                </select>
                {inputFeedback.category
                  ?
                  <div className={inputFeedbackClass.category}>
                    {inputFeedback.category}
                  </div>
                  : <></>}
              </div>
              <div className="form-floating col-md-6 col-lg-4 mb-3">
                <select value={inputValues.is_private} className="form-control rounded-pill ps-3 pt-2 border-dark border-2" name="is_private" id="is_private" onChange={onInputChange}>
                  <option value="">Privacidad*</option>
                  <option value="true">Privado</option>
                  <option value="false">Público</option>
                </select>
                {inputFeedback.is_private
                  ?
                  <div className={inputFeedbackClass.is_private}>
                    {inputFeedback.is_private}
                  </div>
                  : <></>}
              </div>
              <h6 className="text-dark fw-bold" style={{ textAlign: "left", paddingBottom: 5 }}>Fecha y hora</h6>
              <Input type="date" divClass="form-floating col-md-4 mb-3" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                inputId="date" placeholder="Fecha" labelClass="form-label ps-4" value={inputValues.date} onChange={onInputChange}
                feedbackClass={inputFeedbackClass.date} feedbackText={inputFeedback.date}
              />
              <Input type="time" divClass="form-floating col-md-4 mb-3" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                inputId="time" placeholder="Hora de inicio" labelClass="form-label ps-4" value={inputValues.time} onChange={onInputChange}
                feedbackClass={inputFeedbackClass.time} feedbackText={inputFeedback.time}
              />
              <Input type="number" step="0.5" divClass="form-floating col-md-4 mb-3" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                inputId="duration" placeholder="Duración (en horas)" labelClass="form-label ps-4" value={inputValues.duration} onChange={onInputChange}
                feedbackClass={inputFeedbackClass.duration} feedbackText={inputFeedback.duration}
              />
              <h6 className="text-dark fw-bold" style={{ textAlign: "left", paddingBottom: 5 }}>Jugadores</h6>
              <Input type="number" divClass="form-floating col-md-6 col-lg-4 mb-3" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                inputId="min_participants" placeholder="Mínimo de jugadores" labelClass="form-label ps-4" value={inputValues.min_participants} onChange={onInputChange}
                feedbackClass={inputFeedbackClass.min_participants} feedbackText={inputFeedback.min_participants}
              />
              <Input type="number" divClass="form-floating col-md-6 col-lg-4 mb-3" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                inputId="max_participants" placeholder="Máximo de jugadores" labelClass="form-label ps-4" value={inputValues.max_participants} onChange={onInputChange}
                feedbackClass={inputFeedbackClass.max_participants} feedbackText={inputFeedback.max_participants}
              />
              <div className="w-100"></div>
              <div className="d-grid col-lg-4 mb-3">
                <Button
                  className="btn-primary rounded-pill fw-bold"
                  btnType="submit"
                  btnText="Editar Reta"
                  padding="py-3" />
              </div>
              {(serverError)
                ? <div className="d-grid col mb-2">
                  <div className="alert alert-danger rounded-pill mb-0" role="alert">
                    {serverError}
                  </div>
                </div>
                : <></>
              }

            </Form>
          </RetaForm>
        </div>
      </div>
    </div>
  )
}