import { useSelector } from "react-redux";
import PokemonListItem from "./components/PokemonListItem";
import styles from './Homepage.module.scss';
import logo from '../../assets/logo.png';
import Filters from "./components/Filters";

function Homepage() {
	const filteredPokemons = useSelector(state => state.filteredPokemons);

	return (
		<>
			<main className={styles.homepage}>
				<div className={styles.header}>
					<img className={styles.logo} src={logo} alt="Pokemon logo"/>
				</div>

				<Filters />

				<hr className="my-12 h-px border-t-0 bg-neutral-100 dark:bg-white/10"/>

				{ filteredPokemons?.length === 0 && <h3>No Pokemons in the list</h3> }

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{ filteredPokemons && filteredPokemons.map((pokemon, i) => (
						<PokemonListItem key={i} pokemon={pokemon} />
					))}
				</div>
			</main>

		</>
	)
}

export default Homepage
