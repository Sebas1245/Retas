import React from "react"
import { ItemProps, NavListItem } from "./NavListItem"
import { faEnvelope, faBell } from "@fortawesome/free-regular-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export default function NavList() {
  const navigate = useNavigate();
  const ListItems: Readonly<ItemProps[]> = [
    // {faIcon: faEnvelope, faSize: "lg", spanClass: "d-inline d-md-none ms-2", spanText: "Invitaciones", action: () => navigate('/')},
    // {faIcon: faBell, faSize: "lg", spanClass: "d-inline d-md-none ms-2", spanText: "Notificaciones", action: () => console.log('')},
    { faIcon: faUserCircle, faSize: "2x", spanClass: "d-inline d-md-none ms-2", spanText: "Usuario", action: '/user_profile' },
  ]
  return (
    <ul className="navbar-nav align-items-start align-items-md-center">
      {ListItems.map((item, idx) => {
        return (
          <li key={idx} className="nav-item">
            <NavListItem faIcon={item.faIcon} faSize={item.faSize}
              spanClass={item.spanClass} spanText={item.spanText} action={item.action} />
          </li>);
      })}
    </ul>
  );
}