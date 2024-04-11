function PokemonListItem({ pokemon }) {
	if (!pokemon) return <></>;
	return (
		<>
			{ pokemon.name }
		</>
	)
}
export default PokemonListItem;
