import {useDispatch, useSelector} from 'react-redux';
import PokemonListItem from './components/PokemonListItem';
import styles from './Homepage.module.scss';
import logo from '../../assets/logo.png';
import Filters from './components/Filters';
import {pokemonActions} from '../../store';
import {fetchPokemonByName, fetchPokemons} from '../../store/index.unit';
import {useEffect} from 'react';
import Loader from '../../common/Loader';

function Homepage() {
	const filteredPokemons = useSelector(state => state.filteredPokemons);
	const dispatch = useDispatch();
	const loading = useSelector(state => state.loading);

	/**
	 * Running initial setup when the page is loaded
	 * */
	const init = async () => {
		// Start loader
		dispatch(pokemonActions.setLoading(true));

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
		dispatch(pokemonActions.setLoading(false));
	}

	useEffect(() => {
		(async () => {
			if (loading) return;
			await init();
		})()
	}, []);

	if (loading) return <Loader />;
	return (
		<>
			<main className={styles.homepage}>
				<div className={styles.header}>
					<img className={styles.logo} src={logo} alt='Pokemon logo'/>
				</div>

				<Filters />

				<hr className='my-12 h-px border-t-0 bg-neutral-100 dark:bg-white/10'/>

				{ filteredPokemons?.length === 0 && <h3>No Pokemons found with the selected filters</h3> }

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{ filteredPokemons && filteredPokemons.map((pokemon, i) => (
						<PokemonListItem key={i} pokemon={pokemon} />
					))}
				</div>
			</main>

		</>
	)
}

export default Homepage
