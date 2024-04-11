import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPokemonByName, fetchPokemons} from "../store/index.unit";
import {pokemonActions} from "../store";

function App() {
	const pokemons = useSelector(state => state.pokemons);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	/**
	 * Running initial setup when the page is loaded
	 * */
	const init = async () => {
		// Start loader
		setLoading(true);

		// Get the entire pokemon list
		const response = await fetchPokemons();

		// Create an array with all pokemon names and fetch each pokemon
		const pokemonsPromises = response.map(p => fetchPokemonByName(p.name));
		const fetchedPokemonsByName = await Promise.all(pokemonsPromises);
		if (!fetchedPokemonsByName) {
			throw new Error(`An error occurred. Please try again later.`);
		}

		// Save pokemons into the store
		dispatch(pokemonActions.setPokemons(fetchedPokemonsByName));

		// Disable loader
		setLoading(false);
	}

	useEffect(() => {
		(async () => {
			await init();
		})()
	}, []);

	if (loading) return <>Loading ...</>
	return (
		<>
			<h1>This is the homepage</h1>
			{ pokemons && pokemons.map((pokemon, i) => (
				<div key={i}>{pokemon.name}</div>
			))}
		</>
	)
}

export default App
