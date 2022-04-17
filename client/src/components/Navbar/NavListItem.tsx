import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

type ItemProps = {
  faIcon: IconProp,
  faSize: SizeProp,
  spanClass: string,
  spanText: string
}

function NavListItem({ faIcon, faSize, spanClass, spanText }: ItemProps) {
    return (
      <button className="btn" type="button">
        <FontAwesomeIcon icon={faIcon} size={faSize}/>
        <span className={spanClass}>{spanText}</span>
      </button>
    );
}

export { NavListItem };
export type { ItemProps };
