import './App.css'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { pokemonActions } from "./store";
import { fetchPokemonByName, fetchPokemons } from "./store/index.unit";
import { Outlet } from "react-router-dom";

function App() {
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
			<Outlet />
		</>
  )
}

export default App
