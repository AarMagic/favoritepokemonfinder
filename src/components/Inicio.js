import React, { useEffect, useReducer, useState } from 'react'
import { Card } from './Card'
import { animateScroll } from 'react-scroll';
import { PokemonsReducer } from './reducers/PokemonsReducer';

const init = () => {
  return JSON.parse(localStorage.getItem("pokemons")) || []
}

export const Inicio = () => {
  const [urlState, setUrlState] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [pokemonsState, setPokemonsState] = useState([]);
  const [nextState, setNextState] = useState("");
  const [previousState, setPreviousState] = useState("");
  const [allPokemonsState, setAllPokemonsState] = useState([]);
  const [pokemonFilterState, setPokemonFilterState] = useState([]);
  const [pokemonsFav, dispatch] = useReducer(PokemonsReducer, [], init)
  const optionsScroll = {
    duration: 1000,
    smooth: true
  }
  let timeoutId;

  useEffect(() => {
    obtenerAllPokemons();
  }, [])

  useEffect(() => {
    obtenerPokemons();
  }, [urlState])


  useEffect(() => {
    localStorage.setItem("pokemons", JSON.stringify(pokemonsFav))
  }, [pokemonsFav])


  const obtenerAllPokemons = async () => {
    try {
      const allPokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");

      if (!allPokemons.ok) {
        throw new Error(`HTTP error: ${allPokemons.status}`)
      }

      const { results } = await allPokemons.json();
      setAllPokemonsState(results);

    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const obtenerPokemons = async () => {
    try {
      const pokemons = await fetch(urlState);
      if (!pokemons.ok) {
        throw new Error(`HTTP error: ${pokemons.status}`);
      }
      const { results, next, previous } = await pokemons.json();
      setPokemonsState(results);
      if (previous) {
        setPreviousState(previous);
      } else {
        setPreviousState("");
      }
      if (next) {
        setNextState(next);

      } else {
        setNextState("");
      }
    } catch (error) {
      console.error('error fetching pokemon', error);
    }
  }


  const addUrl = (type) => {
    if (type === "previous") {
      setUrlState(previousState)
    } else {
      animateScroll.scrollToTop(optionsScroll);
      setUrlState(nextState)
    }
  }
  const searchPokemon = e => {
    const namePokemon = e.target.value.toLowerCase();

    clearTimeout(timeoutId);


    timeoutId = setTimeout(() => {
      let filterPokemons = [];
      if (namePokemon) {
        filterPokemons = allPokemonsState.filter(pokemon =>
          pokemon.name.toLowerCase().includes(namePokemon)
        );
        if (filterPokemons.length > 0) {
          setPokemonFilterState(filterPokemons);
        } else {
          setPokemonFilterState([]);
        }
      } else {
        setPokemonFilterState([]);
      }
    }, 500); 
  };

  return (
    <main className='content'>
      <div className='controls'>
        <form onSubmit={e => e.preventDefault()}>
          <div className='search-container'>
            <img src='/search.svg' alt='icon-search' />
            <input onKeyUp={searchPokemon} type='search' name='search' placeholder='Write a Pokemon' />
          </div>
        </form>
        {
          (previousState && pokemonFilterState.length <= 0) && <button className='button control' onClick={e => addUrl("previous")}>Previous</button>
        }
      </div>
      <div className='content'>
        {
          pokemonFilterState.length > 0
            ? pokemonFilterState.map(pokemon => (
              <Card key={pokemon.name} url={pokemon.url} pokemonsFav={pokemonsFav} dispatch={dispatch} />
            ))
            : pokemonsState.map(pokemon => (
              <Card key={pokemon.name} url={pokemon.url} pokemonsFav={pokemonsFav} dispatch={dispatch} />
            ))
        }
      </div>
      {
        (nextState && pokemonFilterState.length <= 0) && <button className='button control' onClick={e => addUrl("next")}>Next</button>
      }
    </main>
  )
}
