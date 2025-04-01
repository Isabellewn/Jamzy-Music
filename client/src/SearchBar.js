import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchInput, handleInputChange, search })=> {

  return (
    <div className="search-bar-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        value={searchInput}
        onChange={e=>{handleInputChange(e, e.target.value)}}
        onKeyDown={e=>{
          if(e.key == 'Enter'){
            search()
          }
        }}
        placeholder="Search for a music track like 'enchanted'"
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
