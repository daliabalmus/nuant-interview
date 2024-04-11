import { createSlice, configureStore } from "@reduxjs/toolkit";

/**
 * Redux store configuration and initial state
 * pokemons - typeof array - stores the pokemons list
 * */

const initialState = {
	pokemons: []
};

const pokemonSlice = createSlice({
	name: 'pokedex',
	initialState,
	reducers: {
		setPokemons(state, action) {
			state.pokemons = action.payload;
		}
	}
})

export const pokemonActions = pokemonSlice.actions;

const store = configureStore({
	reducer: pokemonSlice.reducer
});

export default store;
