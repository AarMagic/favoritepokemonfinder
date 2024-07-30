import React from 'react'
import {useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleButtonHeader = () => {
    if (location.pathname === "/inicio") {
      navigate("/favoritos");
    } else {
      navigate("/inicio");
    }
  }

  return (
    <header className='header'>
      <h1>Favorite Pokémon Finder</h1>
      <button className="button" onClick={handleButtonHeader}>
        {location.pathname === "/inicio" ? "Ver Favoritos" : "Ver Pokemons"}
      </button>
    </header>
  )
}