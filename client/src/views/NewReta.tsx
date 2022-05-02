import React from "react";
import Navbar from '../components/Navbar';
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import RetaForm from "../components/RetaForm";
import Sidebar from "../components/Sidebar";
import Flush from "../components/Flush";

export default function NewReta() {
    return (
        <div>
            <Navbar />
            <div className="row full-page-with-nav">
                <div className="d-none d-md-block col-12 col-lg-3">
                    <Sidebar
                        title="Crear Reta"
                        imgSrc="./avatar.jpg"
                        name="Juan José Beltrán"
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
                        imgSrc="./new_reta.jpg">
                        <Form className="row mt-5">
                            {/* <div className="form-floating mb-5 h3">
                                <input type="text" className="form-control shadow-none form-control-lg rounded-0 border-0 border-bottom border-2 border-dark" id="title" placeholder="Nombre de la Reta"></input>
                                <label htmlFor="title" className="form-label-lg ps-4 mb-5 h4"></label>
                            </div> */}
                            <Input type="text" divClass="form-floating mb-5" inputClass="form-control shadow-none form-control-lg rounded-0 border-0 border-bottom border-2 border-dark"
                                inputId="title" placeholder="Nombre de la Reta" labelClass="form-label ps-4 mb-5 h4"
                            />
                            <div className="row mb-5">
                                <h6 style={{color:"#e5e5e5", fontWeight:"bold",textAlign:"left", paddingBottom:5}}>Datos generales</h6>
                                <Input type="url" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                                    inputId="loc" placeholder="Seleccionar ubicación" labelClass="form-label ps-4" 
                                />
                                <Input type="date" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                                    inputId="date" placeholder="Seleccionar fecha" labelClass="form-label ps-4" 
                                />
                            </div>
                            <div className="row mb-5">
                                <h6 style={{color:"#e5e5e5", fontWeight:"bold",textAlign:"left", paddingBottom:5}}>Jugadores</h6>
                                <div className="form-floating col-lg-4">
                                    <select className="form-control rounded-pill ps-3 pt-2 border-dark border-2">
                                        <option selected hidden>Elegir privacidad</option>
                                        <option value="1">Privado</option>
                                        <option value="2">Público</option>
                                    </select>
                                </div>
                                <Input type="number" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                                    inputId="minimo" placeholder="Mínimo de jugadores" labelClass="form-label ps-4" 
                                />
                                <Input type="number" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                                    inputId="maximo" placeholder="Máximo de jugadores" labelClass="form-label ps-4" 
                                />
                            </div>
                            <div className="row mb-5">
                                <h6 style={{color:"#e5e5e5", fontWeight:"bold",textAlign:"left", paddingBottom:5}}>Adicionales</h6>
                                <Input type="time" divClass="form-floating col-lg-4" inputClass="form-control rounded-pill ps-3 border-dark border-2"
                                    inputId="conf" placeholder="Hora límite de confirmación" labelClass="form-label ps-4" 
                                />
                                <Input type="number" divClass="form-floating col-lg-4" inputClass="form-control ps-3 rounded-pill border-dark border-2"
                                    inputId="costo" placeholder="Costo por admisión" labelClass="form-label ps-4" 
                                />
                            </div>
                            <div className="row mb-5 pt-2 pb-3">
                                <div className="d-grid col-lg-4">
                                    <Button 
                                        className="btn-dark rounded-pill fw-bold"
                                        btnType="button"
                                        btnText="Invitar amigos"
                                        padding="py-3"/>
                                </div>
                                <div className="d-grid col-lg-4">
                                    <Button 
                                        className="btn-primary rounded-pill fw-bold"
                                        btnType="submit"
                                        btnText="Crear Reta"
                                        padding="py-3"/>
                                </div>
                            </div>
                        </Form>
                    </RetaForm>
                </div>
            </div>
      </div>
    )
}