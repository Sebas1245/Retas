import React from 'react';
import { faCalendar, faClock, faLocationDot, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeekday, getMonth } from '../utils/dateTransforms';
import Button from '../components/Button';

export default function RetaDetail() {
    return (
        <div className="container-fluid full-page-with-nav">
            <div className="row h-100 pt-5">
                <div className="d-none d-md-block col-6 mt-3">
                    <img src={'./golf_retas.jpeg'} className="img-fluid h-80" alt='Reta detail' style={{objectFit: "cover", borderRadius: '0.4rem'}}/>
                </div>
                <div className="d-none d-md-block col-6 mt-3">
                    <div style={{borderBottom: '0.1rem solid'}} className="d-flex justify-content-between">
                        <h2>Title</h2>
                        <button style={{borderRadius: 200}} className="btn btn-info mb-1" type="button">
                            <FontAwesomeIcon icon={faShare} size={'lg'}/>
                        </button>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                        <div className="d-flex justify-content-between py-2">
                            <div>
                                <FontAwesomeIcon icon={faLocationDot} />
                                {' '}
                                {'Location'}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faClock} />
                                {' '}
                                {'12:00 PM'}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCalendar} />
                                {' '}
                                {`${getWeekday(new Date())} ${getMonth(new Date())} ${new Date().getDate()}`}
                            </div>
                        </div>
                        </li>
                        <li className="list-group-item pt-3">
                            <div className="d-flex">
                                <div>
                                    <img className="img-fluid align-content-right rounded-circle" alt='Admin Avatar' src={'./avatar.jpg'} style={{height: '5vh'}}/>
                                </div>
                                <div style={{marginLeft: '2%'}}>
                                    <h6 style={{textAlign:"left", fontWeight:"700",}}>{'Rodrigo Salinas'}</h6>{/*  name */}
                                    <p style={{textAlign:"left", fontWeight:"200", marginTop:"-7.5px"}}>{'Administrador'}</p>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className='d-flex flex-row justify-content-between'>
                                <div className='mt-2'>
                                    <div>Costo: <strong>{'Gratuito'}</strong></div>
                                </div>
                                <div className='mt-2'>
                                    <div>Cupo: <strong>{'11/14'}</strong></div> {/* add a function to display this data */}
                                </div>
                                <div>
                                    <Button 
                                        className="btn-dark rounded-pill fw-bold"
                                        btnType="button"
                                        btnText={"Confirmar asistencia"}/> {/* Dependent on whether user is admin or not */}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}