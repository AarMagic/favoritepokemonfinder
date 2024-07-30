import React, { useEffect, useReducer, useState } from 'react'
import { PokemonsReducer } from './reducers/PokemonsReducer'
import { Card } from './Card'

const init = () => {
  return JSON.parse(localStorage.getItem("pokemons")) || []
}

export const ShowFavorites = () => {
  const [pokemonsFav, dispatch] = useReducer(PokemonsReducer, [], init)
   
  return (
    <div className='content'>
      {
        pokemonsFav.length > 0 ? pokemonsFav.map(pokemon => {
          return <Card key={pokemon.name} url={pokemon} pokemonsFav={pokemonsFav} dispatch={dispatch} />
        })
        :
        <p>No hay Pokemons favoritos</p>
      }
    </div>
  )
}
