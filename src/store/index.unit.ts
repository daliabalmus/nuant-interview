import { PokemonClient } from 'pokenode-ts'; // import the PokemonClient

const api = new PokemonClient();

/**
 * Fetch PokemonClient to get all the first 20 pokemons
 * */
export const fetchPokemons = async () => {
	try {
		const response = await api.listPokemons(0, 20);
		return response.results;
	} catch (e) {
		throw new Error('Something went wrong. Please try again');
	}
}
