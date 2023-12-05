//import React, { useState } from 'react'
import { useEffect, useState } from 'react'
import"./PokemonList.css"
import Pokemonss from '../Pokemons/Pokemonss'
import axios from 'axios'
export default function PokemonList() {
    /*const[x,setx]=useState(0);
    const[y,sety]=useState(0);

    useEffect(()=>{
        console.log("effect called")
    },[x])// this  ,[] is the dependency array and if is not passed then the entire logic of useeffect get rerender
    //as son we as we starrt the server but we write something in dependency array[] then logic get executed at first render only 
// here initiallly dependency arrray null so it is not changing withrespect to any state change 
// simple word useeffect ke andar likhe cheez jo state variable dependecy array ke andar dala jaega only uske change hote hi effects dekhega
   

  return (
    <>
    <div>
        x:{x} <button onClick={()=>setx(x+1)}>INCREAMENT</button>
    </div>
    <div>
    y:{y} <button onClick={()=>sety(y+1)}>INCREAMENT</button>
    </div>
    </>
  )
}

// for downloading the data we can use fetchapi or axios here we are  using axios
// axios give promise based syntax
*/
// below method2
const [pokemonlist,setpokemonlist]=useState([])
const[isloading,setloading]=useState(true)
async function download(){
    const response=await axios.get('https://pokeapi.co/api/v2/pokemon');// this download list of 20 pokemon
    const pokemonresult=response.data.results; // we get array of pokemon
  //// jaise download ho jaise turant likh do nhi horha load
    // iterating over the array of pokemon and using their url to create array of promises that will download these url\
    const pokemonresultpromise=pokemonresult.map((pokemon)=>axios.get(pokemon.url));
    // passing that promise array to axios all
    const pokemondata=await axios.all(pokemonresultpromise);// array of pokemon detailed data
    console.log(pokemondata);

// now iterate on the data of each pokemon
    const res=pokemondata.map((pokedata)=>{
        const pokemon=pokedata.data;
        return{
            id:pokemon.id,
            name:pokemon.name,
            image:pokemon.sprites.other.dream_world.front_default,
            type:pokemon.types,
        }
    })
    console.log(res);
    setpokemonlist(res)
    setloading(false)// jaise data load hojae setloading ko false krdena
}
useEffect(()=>{
    download();
},[])

return(
    <>
    <div className='Pokelist-wrapper'>
        <div>pokemon list</div>
        {(isloading)?'isloading': 
        pokemonlist.map((p) =><Pokemonss name={p.name} image={p.image} key={p.id}/>)
            
        }
    
    
        
    </div>
    </>
)


}
