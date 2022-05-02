import React from "react"
import {ItemProps, NavListItem} from "./NavListItem"
import { faEnvelope, faBell } from "@fortawesome/free-regular-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ListItems: Readonly<ItemProps[]> = [
  {faIcon: faEnvelope, faSize: "lg", spanClass: "d-inline d-md-none ms-2", spanText: "Invitaciones", action: "/"},
  {faIcon: faBell, faSize: "lg", spanClass: "d-inline d-md-none ms-2", spanText: "Notificaciones", action: "/"},
  {faIcon: faUserCircle, faSize: "2x", spanClass: "d-inline d-md-none ms-2", spanText: "Usuario", action: "user_profile"},
]

export default function NavList() {
    return (
      <ul className="navbar-nav mb-2 mb-lg-0 align-items-start align-items-md-center">
        {ListItems.map((item, idx) => {
          return (
            <li key={idx} className="nav-item">
              <NavListItem faIcon={item.faIcon} faSize={item.faSize} 
              spanClass={item.spanClass} spanText={item.spanText} action={item.action}/>
            </li>);
        })}
      </ul>
    );
}