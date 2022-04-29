import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";

type ItemProps = {
  faIcon: IconProp,
  faSize: SizeProp,
  spanClass: string,
  spanText: string,
  action: string
}

function NavListItem({ faIcon, faSize, spanClass, spanText, action}: ItemProps) {
  const navigate = useNavigate()
    return (
      <button className="btn" type="button" onClick={() => navigate(action)}>
        <FontAwesomeIcon icon={faIcon} size={faSize}/>
        <span className={spanClass}>{spanText}</span>
      </button>
    );
}

export { NavListItem };
export type { ItemProps };
