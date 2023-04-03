import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Pokemon.css';

function Pokemon({endpoint}) {

    const [pokemonData, setPokemonData] = useState({});
    useEffect(() => {

        async function getPokemons() {
            try {
                const {data} = await axios.get(endpoint);
                console.log(data)
                setPokemonData(data);
            } catch (e) {
                console.log(e);
            }
        }

        getPokemons()

    }, [endpoint])

    return (
        <div className="pokemonTotaal">
            {Object.keys(pokemonData).length > 0 &&
                <>
                    <h1>{pokemonData.name}</h1>
                    <img src={pokemonData.sprites.front_default} alt="photo of pokemon"/>
                    <h2>Moves: {pokemonData.moves.length}</h2>
                    <h2>Weight: {pokemonData.weight} kg</h2>
                    <h3>Abilities</h3>
                    <ul className="pokemon">
                        {pokemonData.abilities.map((ability) => {
                            return (
                                <li key={ability.ability.name}>
                                    {ability.ability.name}
                                </li>)
                        })}
                    </ul>
                </>
            }
        </div>
    );
}

export default Pokemon;
