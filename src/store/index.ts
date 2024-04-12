import { createSlice, configureStore } from "@reduxjs/toolkit";

/**
 * Redux store configuration and initial state
 * pokemons - typeof array - stores the pokemons list used as a refference
 * filteredPokemons - typeof array - stores the pokemons list filtered by type and name
 * pokemon - typeof object - stores single pokemon object
 * loading - typeof boolean - stores the loading state before page loads
 * */

const initialState = {
	pokemons: [],
	filteredPokemons: [],
	pokemon: undefined,
	loading: false
};

const pokemonSlice = createSlice({
	name: 'pokedex',
	initialState,
	reducers: {
		setPokemons(state, action) {
			const pokemons = action.payload;
			state.pokemons = pokemons;
			state.filteredPokemons = pokemons;
		},
		setFilteredPokemons(state, action) {
			state.filteredPokemons = action.payload;
		},
		setPokemon(state, action) {
			state.pokemon = action.payload;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		}
	}
})

export const pokemonActions = pokemonSlice.actions;

const store = configureStore({
	reducer: pokemonSlice.reducer
});

export default store;
