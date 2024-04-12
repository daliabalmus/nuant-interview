import { PokemonClient } from 'pokenode-ts'; // import the PokemonClient

const api = new PokemonClient();

/**
 * Fetch PokemonClient to get all the first 20 Pokémons
 * */
export const fetchPokemons = async () => {
	try {
		const response = await api.listPokemons(0, 20);
		return response.results;
	} catch (e) {
		throw new Error('Something went wrong. Please try again');
	}
}

/**
 * Fetch PokemonClient to get Pokémon by name
 * */
export const fetchPokemonByName = async (name) => {
	try {
		const response = await api.getPokemonByName(name);
		return response;
	} catch (e) {
		throw new Error('Something went wrong. Please try again');
	}
}

/**
 * Fetch PokemonClient to get Pokémon by id
 * */
export const fetchPokemonById = async (id) => {
	try {
		const response = await api.getPokemonById(id);
		return response;
	} catch (e) {
		throw new Error('Something went wrong. Please try again');
	}
}
