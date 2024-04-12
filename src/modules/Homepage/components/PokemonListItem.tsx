import styles from './PokemonListItem.module.scss';
import { formatName } from "../../../lib/utils";
import ballOpenImg from '../../../assets/ball-open.png';
import {useState} from "react";
import { useNavigate } from "react-router-dom";

function PokemonListItem({ pokemon }) {
	const history = useNavigate();
	if (!pokemon) return <></>;

	const [showOpenBall, setShowOpenBall] = useState(false);

	const handleHoverPokemon = (mouseEntered) => setShowOpenBall(mouseEntered);

	const goToDetails = () => {
		history(`/${pokemon.id}`)
	};

	// Format ability names and types into a readable form
	const abilities = pokemon.abilities.map(a => formatName(a.ability.name));
	const types = pokemon.types.map(a => formatName(a.type.name));

	const pokemonImage = pokemon.sprites.other?.dream_world.front_default || '';
	return (
		<div
			className={styles.pokemon}
			onMouseEnter={() => handleHoverPokemon(true)}
			onMouseLeave={() => handleHoverPokemon(false)}
			onClick={goToDetails}
		>
			<div className="grid grid-cols-3 grid-flow-col gap-4">
				<div className={styles.pokemonImage}>
					<img src={showOpenBall ? ballOpenImg : pokemonImage} alt={`${pokemon.name}-image`} />
				</div>

				<div className={'col-span-2'}>
					<h2 className={styles.name}>{ pokemon.name }</h2>
					<p className={styles.details}>
						<span className={styles.detailsTitle}>Abilities: </span>
						<span className={styles.description}>{ abilities.join(', ') }</span>
					</p>

					<p className={styles.details}>
						<span className={styles.detailsTitle}>Types: </span>
						<span className={styles.description}>{ types.join(', ') }</span>
					</p>

					<p className={styles.details}>
						<span className={styles.detailsTitle}>Base experience: </span>
						<span className={styles.description}>{ pokemon.base_experience }</span>
					</p>
				</div>
			</div>
		</div>
	)
}
export default PokemonListItem;
