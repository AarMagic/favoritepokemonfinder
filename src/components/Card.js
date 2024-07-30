import React, { useEffect, useState } from 'react'
import '../types.css';
import { type } from '@testing-library/user-event/dist/type';


export const Card = ({ url, pokemonsFav, dispatch }) => {
    const [pokemonState, setPokemonState] = useState({});
    const [favoriteState, setFavoriteState] = useState(false);

    useEffect(() => {
        conseguirDatos();
        if (pokemonsFav > 0) {
            let favorites = pokemonsFav.filter(pokemon => pokemon.name === pokemonState.name)
            if (favorites.length > 0) {
                setFavoriteState(true);
            }
        }
    }, [])

    useEffect(() => {
        if (pokemonsFav > 0) {
            if (pokemonState.name) {
                let favorite = pokemonsFav.some(pokemon => pokemon.name === pokemonState.name);
                setFavoriteState(favorite);
            }
        }
    }, [pokemonState, pokemonsFav]);



    const conseguirDatos = async () => {
        if (typeof url === "string") {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error response: ${response.status}`)
                }
                const data = await response.json();
                const pokemon = {
                    name: data.name,
                    image: data.sprites.other.showdown.front_default,
                    sound: data.cries.latest,
                    height: Math.round(data.height * 10),
                    weight: Math.round(data.weight * 0.1),
                    types: data.types,
                    abilities: data.abilities
                }
                setPokemonState(pokemon)
    
            } catch (error) {
                console.error("Error fetch", error);
            }
        } else{
            setPokemonState(url)
            setFavoriteState(true);
        }
    }

    const playSound = (sound) => {
        const audio = new Audio(sound)
        audio.play();
    }
    const addPokemonToFavorite = () => {
        if (favoriteState) {
            let action = {
                type: "remove",
                payload: pokemonState
            }
            setFavoriteState(false);
            dispatch(action)
        } else {
            let action = {
                type: "add",
                payload: pokemonState
            }
            setFavoriteState(true)
            dispatch(action)
        }
    }
    return (
        <article className='card'>
            <header className='card-header'>
                <div className='principal-measures'>
                    <div className='measure'>
                        <img src='/height.svg' alt='Height icon svg' />
                        <p>{pokemonState.height} cm</p>
                    </div>
                    <div className='measure'>
                        <img src='/weight.svg' alt='Weight icon svg' />
                        <p>{pokemonState.weight} kg</p>
                    </div>
                </div>
                <div className='principal-star'>
                    <svg onClick={addPokemonToFavorite} className={`star ${favoriteState ? "star--active" : ""}`} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
                <img className='card-image' src={pokemonState.image} alt={pokemonState.name} />
            </header>
            <div className='card-principal'>
                <p className='card-title'>{pokemonState.name}</p>
            </div>
            <div className='divisor' />
            <div className='card-types'>
                <p className='card-subtitle'>Types</p>
                <div className='types'>
                    {pokemonState.types && Array.isArray(pokemonState.types) &&
                        pokemonState.types.map((item, index) => (
                            <div key={index} className={`type ${item.type.name}`}>
                                <p>{item.type.name}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className='divisor' />
            <div className='card-abilities'>
                <p className='card-subtitle'>Abilities</p>
                <div className='abilities'>
                    {pokemonState.abilities && Array.isArray(pokemonState.abilities) &&
                        pokemonState.abilities.map((item, index) => (
                            <div key={index} className={`type ${item.is_hidden ? "type-hidden" : ""}`}>
                                <p>{item.is_hidden && <span>Hidden</span>}{item.ability.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='divisor' />
            <div onClick={e => playSound(pokemonState.sound)} className='player'>
                <img src='/start.svg' alt='play icon' />
                <p>Play sound</p>
            </div>
        </article>
    )
}