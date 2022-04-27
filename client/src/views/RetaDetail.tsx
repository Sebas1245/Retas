import React from 'react';
import { faCalendar, faClock, faLocationDot, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeekday, getMonth } from '../utils/dateTransforms';
import Button from '../components/Button';

// add contact info like phone and email later on
type AdminUser = {
    name: string,
    avatarImgSrc: string
}

type RetaDetailProps = {
    title: string,
    imgSrc: string,
    location: string,
    hour: number,
    min: number,
    date: Date, 
    admin: AdminUser,
    price: number | string,
    confirmedUsers: number,
    maxUsers: number
}

export default function RetaDetail(props: RetaDetailProps) {
    const formatTime : (hour : number, minutes: number) => string = (hour, minutes) => `${hour-12}:${minutes} ${hour > 12 ? 'PM' : 'AM'}` 
    return (
        <div className="container-fluid full-page-with-nav">
            <div className="row h-100 pt-5">
                <div className="d-none d-md-block col-6 mt-3">
                    <img src={props.imgSrc} className="img-fluid h-80" alt='Reta detail' style={{objectFit: "cover", borderRadius: '0.4rem'}}/>
                </div>
                <div className="d-none d-md-block col-6 mt-3">
                    <div style={{borderBottom: '0.1rem solid'}} className="d-flex justify-content-between">
                        <h2>{props.title}</h2>
                        <button style={{borderRadius: 200}} className="btn btn-info mb-1" type="button">
                            <FontAwesomeIcon icon={faShare} size={'lg'}/> {/* ADD ONCLICK EVENT TO COPY EVENT LINK TO CLIPBOARD */}
                        </button>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                        <div className="d-flex justify-content-between py-2">
                            <div>
                                <FontAwesomeIcon icon={faLocationDot} />
                                {' '}
                                {props.location}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faClock} />
                                {' '}
                                {formatTime(props.hour, props.min)}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCalendar} />
                                {' '}
                                {`${getWeekday(props.date)} ${getMonth(props.date)} ${props.date.getDate()}`}
                            </div>
                        </div>
                        </li>
                        <li className="list-group-item pt-3">
                            <div className="d-flex">
                                <div>
                                    <img className="img-fluid align-content-right rounded-circle" alt='Admin Avatar' src={props.admin.avatarImgSrc} style={{height: '5vh'}}/>
                                </div>
                                <div style={{marginLeft: '2%'}}>
                                    <h6 style={{textAlign:"left", fontWeight:"700",}}>{props.admin.name}</h6>
                                    <p style={{textAlign:"left", fontWeight:"200", marginTop:"-7.5px"}}>{'Administrador'}</p>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className='d-flex flex-row justify-content-between'>
                                <div className='mt-2'>
                                    <div>Costo: <strong>{props.price}</strong></div>
                                </div>
                                <div className='mt-2'>
                                    <div>Cupo: <strong>{props.confirmedUsers}/{props.maxUsers}</strong></div> {/* add a function to display this data */}
                                </div>
                                <div>
                                    {/* TODO: Write function to determine if the user viewing the event is admin or not to change text to "Invitar amigos" */}
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