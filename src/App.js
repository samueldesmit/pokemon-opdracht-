import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Pokemon from "./components /Pokemon";
import pokemonlogo from "./assets/International_Pokémon_logo.svg.png"


function App() {

    const [pokemonNames, setPokemonNames] = useState({});
    const [offset, setOffset] = useState("https://pokeapi.co/api/v2/pokemon/")
    const pagina = offset
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function getPokemons() {
            setLoading(true)
            setError(false)
            try {
                const {data} = await axios.get(offset);
                console.log(data)
                setPokemonNames(data);
            } catch (e) {
                console.log(e);
                setError(true)
            }
            setLoading(false)
        }

        getPokemons()

    },[offset]);

    return (
        <div className="alles">
            <div className="logo">
                <img src={pokemonlogo} alt="pokemon logo"/>
            </div>
            <div className='buttons'>
                <button
                    type='button'
                    disabled={!pokemonNames.previous}
                    onClick={() => setOffset(pokemonNames.previous)}
                >Vorige 20 pokemons
                </button>

                <button
                    type='button'
                    disabled={!pokemonNames.next}
                    onClick={() => setOffset(pokemonNames.next)}
                >Volgende 20 pokemons
                </button>
            </div>

            <div className="pokemons">
            {pokemonNames.results && pokemonNames.results.map( (pokemon) => {
                return<Pokemon key={pokemon.name} endpoint={pokemon.url}/>

            })}
            </div>
            {loading && <p>loading</p>}
            {error && <p>er ging iets mis...</p>}
        </div>
    );
}

export default App;
