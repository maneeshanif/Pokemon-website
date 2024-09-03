import {useEffect, useState} from "react";
import "./index.css"
import { Pokemoncards } from "./PokemonCards";
export const Pokemon=()=>{
    const [pokemon,setPokemon] = useState([]);
    const[loading,setLoading]= useState(true)
    const[error,setError]= useState(null)

    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    const fetchPokemon =async()=>{
             try {
                 const res = await fetch(API)
                 const data = await res.json()
                //  console.log(data)
                 const detailedPokemonData =data.results.map(async(curPokemon)=>{
                    const res= await fetch(curPokemon.url)
                    const data = await res.json()
                    return data
                 })
                //  console.log(detailedPokemonData)
                 const detailedResponses = await Promise.all(detailedPokemonData)
                 console.log(detailedResponses);
                 setPokemon(detailedResponses)
                 setLoading(false);
                 
             } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error)
             }
    }

    useEffect(() => {
        fetchPokemon();
       
    }, []);

    if(loading){
        return <div>
            <h1>Loading....</h1>
        </div>
    }

    if(error){
        return <div>
            <h1>{error.message}</h1>
        </div>
    }

    return(
        <>
        <section className="container">
            <header>
        <h1>Lets Catch  Pokemon</h1>
        </header>
        <div >
            <ul className="cards">
                {
                    // <li key={curPokemon.id}> {curPokemon.height}</li>
                    pokemon.map((curPokemon) =>{
                      return (
                        <Pokemoncards key={curPokemon.id} pokemonData={curPokemon}/>
                      )
                    })
                }
            </ul>
        </div>
       </section>
        </> 
    )
}