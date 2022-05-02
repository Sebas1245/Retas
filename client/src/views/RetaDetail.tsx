import React, { useEffect, useState } from 'react';
import { faCalendar, faClock, faLocationDot, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeekday, getMonth, formatTime } from '../utils/dateTransforms';
import Button from '../components/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteReta, getReta } from '../services/retaCalls';
import { getImageByCategory } from '../utils/imageCategory';
import { isUserInReta as fetchIsUserInReta, toggleAttendance } from '../services/userCalls';

// add contact info like phone and email later on
// interface AdminUser extends User {
//     avatarImgSrc: string
// }

// type RetaDetailProps = {
//     title: string,
//     imgSrc: string,
//     location: string,
//     hour: number,
//     min: number,
//     date: Date, 
//     admin: AdminUser,
//     price: number | string,
//     confirmedUsers: number,
//     maxUsers: number
// }

export default function RetaDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  let { retaId } = useParams();
  const [reta, setReta] = useState<Reta>()
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState<boolean>();
  const [isCurrentUserConfirmed, setIsCurrentUserConfirmed] = useState<boolean>();
  useEffect(() => {
    const getRetaById = async (id: string) => {
      if (retaId === undefined) {
        return;
      }

      try {
        let reta = await getReta(id);
        reta.date = new Date(reta.date)
        setReta(reta)
        setIsCurrentUserAdmin(reta.admin._id === sessionStorage.getItem('userId'));
      } catch (error) {
        alert(JSON.stringify(error))
      }
    }

    const isUserIn = async (id: string) => {
      if (!retaId) return;
      try {
        const isUserInReta = await fetchIsUserInReta(id);
        setIsCurrentUserConfirmed(!isUserInReta);
      } catch (error : any) {
        if (error.code !== 404) {
          alert(JSON.stringify(error));
        }
      }
    }
    if (retaId !== undefined) {
      isUserIn(retaId);
      getRetaById(retaId);
    }
  }, [retaId]);

  const copyToClipboard: () => void = () => {
    navigator.clipboard.writeText(process.env.REACT_APP_PUBLIC_URL + location.pathname)
  }

  const toggleAttendanceToThisReta = async () => {
    try {
      if (!reta || !reta._id) return;
      const response = await toggleAttendance(reta._id)
      setReta(response.reta);
      setIsCurrentUserConfirmed(!response.pushed);
    } catch (error) {
      alert(error);
    }
  }
  const deleteThisReta = async () => {
    try {
      if (!reta || !reta._id) return
      const response = await deleteReta(reta?._id)
      if (response) {
        alert("Successfully deleted this reta!");
        navigate('/');
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="container-fluid full-page-with-nav">
      <div className="row pt-5">
        <div className="d-none d-md-block col-md-12 col-lg-6 mt-3">
          {/* TODO: Add image according to reta category */}
          <img src={"/" + getImageByCategory(reta?.category)} className="img-fluid" alt="" style={{ objectFit: "cover", borderRadius: '0.4rem' }} />
        </div>
        <div className="d-md-block col-12 col-lg-6 mt-3">
          <div style={{ borderBottom: '0.1rem solid' }} className="d-flex justify-content-between">
            <h2>{reta && reta.name}</h2>
            <button onClick={copyToClipboard} style={{ borderRadius: 200 }} className="btn btn-info mb-1" type="button">
              <FontAwesomeIcon icon={faShare} size={'lg'} /> {/* ADD ONCLICK EVENT TO COPY EVENT LINK TO CLIPBOARD */}
            </button>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="d-flex justify-content-between py-2">
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                  {' '}
                  {reta && reta.location}
                </div>
                <div>
                  <FontAwesomeIcon icon={faClock} />
                  {' '}
                  {reta && formatTime(reta.hours, reta.minutes)}
                </div>
                <div>
                  <FontAwesomeIcon icon={faCalendar} />
                  {' '}
                  {reta && `${getWeekday(reta.date)} ${getMonth(reta.date)} ${reta.date.getDate()}`}
                </div>
              </div>
            </li>
            <li className="list-group-item pt-3">
              <div className="d-flex">
                {/* TODO: Deal with user images later 
                            <div>
                                <img className="img-fluid align-content-right rounded-circle" alt='Admin Avatar' src={reta.admin.avatarImgSrc} style={{height: '5vh'}}/>
                            </div> */}
                <div style={{ marginLeft: '2%' }}>
                  <h6 style={{ textAlign: "left", fontWeight: "700", }}>{reta && reta.admin.name}</h6>
                  <p style={{ textAlign: "left", fontWeight: "200", marginTop: "-7.5px" }}>{'Administrador'}</p>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className='d-flex flex-row justify-content-between'>
                {/* TODO: Deal with costo later
                            <div className='mt-2'>
                                <div>Costo: <strong>{reta.price}</strong></div>
                            </div> */}
                <div className='mt-2'>
                  <div>Cupo: <strong>{reta && reta.confirmed_users.length}/{reta && reta.max_participants}</strong></div>
                </div>
                <div>
                  {/* TODO: Write function to determine if the user viewing the event is admin or not to change text to "Invitar amigos" */}
                  {
                    isCurrentUserAdmin ? (
                      <Button
                        className="btn-danger rounded-pill fw-bold"
                        btnType="button"
                        btnText={"Eliminar reta"}
                        onClick={deleteThisReta} />) :
                      (
                        <Button
                          className="btn-dark rounded-pill fw-bold"
                          btnType="button"
                          onClick={toggleAttendanceToThisReta}
                          btnText={isCurrentUserConfirmed ? "Confirmar asistencia" : "Cancelar asistencia"} />
                      )
                  }
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}