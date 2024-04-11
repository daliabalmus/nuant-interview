import { useSelector } from "react-redux";
import PokemonListItem from "./components/PokemonListItem";

function Homepage() {
	const pokemons = useSelector(state => state.pokemons);

	return (
		<>
			{ pokemons && pokemons.map((pokemon, i) => (
				<PokemonListItem key={i} pokemon={pokemon} />
			))}
		</>
	)
}

export default Homepage
