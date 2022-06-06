import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  formClass?: string,
  borderClass: string,
  searchPlaceholder: string
}

export default function SearchBar({formClass, borderClass, searchPlaceholder}: Props) {
  const navigate = useNavigate();
  const [searchBarQuery, setSearchBarQuery] = useState<string | undefined>(undefined);
  const performSearch = (e : React.FormEvent) => {
    console.log(searchBarQuery);
    e.preventDefault();
    if (searchBarQuery) {
      navigate({
        pathname: '/retas_by_query',
        search: createSearchParams({
          textQuery: searchBarQuery
        }).toString()
      })
    }
  }
  return (
  <form onSubmit={performSearch} className={`d-flex ${formClass}`}>
    <div className="input-group">
      <div className="input-group-prepend">
        <button type="submit" className={`btn search-bar-icon ${borderClass}`} style={{color: "gray"}}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <input 
      onChange={(e) => setSearchBarQuery(e.target.value)}
      className={`form-control search-bar-input fw-bold ${borderClass}`} 
      type="search" 
      placeholder={searchPlaceholder} aria-label="Search"/>
    </div>
  </form>
  )
}