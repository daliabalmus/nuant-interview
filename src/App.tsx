import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { pokemonActions } from "./store";
import {fetchPokemons} from "./store/index.unit";

function App() {
	const pokemons = useSelector(state => state.pokemons);
  const dispatch = useDispatch();

	/**
	 * Running initial setup when the page is loaded
	 * */
	const init = async () => {
		const response = await fetchPokemons();
		dispatch(pokemonActions.setPokemons(response));
	}

	useEffect(() => {
		(async () => {
			await init();
		})()
	}, []);

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
