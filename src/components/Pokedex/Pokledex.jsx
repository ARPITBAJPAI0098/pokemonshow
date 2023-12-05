import React from 'react'
import Search from '../Search/Search'
import './pokeledex.css'
import PokemonList from '../PokemonLists/PokemonList'
export default function Pokledex() {
  return (
    <>
    
    <div className='pokedex-wrapper'>
      <h1 id='pokedex-heading'>POKEDEX</h1>
      <Search/>
      <PokemonList/>
    </div>
    </>
  )
}

