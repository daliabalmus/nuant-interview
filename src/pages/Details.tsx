import { useSelector } from "react-redux";

function Homepage() {
	const pokemons = useSelector(state => state.pokemons);

	return (
		<>
			{ pokemons && pokemons.map((pokemon, i) => (
				<div key={i}>{pokemon.name}</div>
			))}
		</>
	)
}

export default Homepage
