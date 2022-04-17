import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Props = {
  formClass?: string,
  borderClass: string,
  searchPlaceholder: string
}

export default function SearchBar({formClass, borderClass, searchPlaceholder}: Props) {
    return (
    <form className={`d-flex ${formClass}`}>
      <div className="input-group">
        <div className="input-group-prepend">
          <button className={`btn search-bar-icon ${borderClass}`} style={{color: "gray"}}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <input className={`form-control search-bar-input fw-bold ${borderClass}`} type="search" placeholder={searchPlaceholder} aria-label="Search"/>
      </div>
    </form>
    )
}