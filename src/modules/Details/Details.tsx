import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Custom404 from '../404';
import { pokemonActions } from '../../store';
import { fetchPokemonById } from '../../store/index.unit';
import style from './Details.module.scss';
import {formatName} from '../../lib/utils';
import DetailsRow from './DetailsRow';
import DetailsStats from './DetailsStats';
import Loader from '../../common/Loader';

function Details() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const pokemon = useSelector(state => state.pokemon);
	const loading = useSelector(state => state.loading);
	const { id } = useParams();

	const init = async () => {
		if (!id || loading) return;
		// shows page loader
		dispatch(pokemonActions.setLoading(true));
		//
		// Get the pokemon whose name matches the id param from url
		const response = await fetchPokemonById(id);
		dispatch(pokemonActions.setPokemon(response));

		// disables page loader
		dispatch(pokemonActions.setLoading(false));
	}

	useEffect(() => {
		(async () => {
			await init();
		})()
	}, []);

	const pokemonImage = pokemon?.sprites?.other?.dream_world.front_default || '';
	const abilities = pokemon?.abilities?.map(a => formatName(a.ability.name)) || [];
	const types = pokemon?.types?.map(t => formatName(t.type.name)) || [];
	const moves = pokemon?.moves?.map(a => formatName(a.move.name)) || [];

	if (loading) return <Loader />;
	if (!pokemon || !id) return <Custom404 />;

	return (
		<>
			<button className={'bg-neutral-700 mt-6'} onClick={() => history('/')}>Back to listing</button>

			<div className={style.pokemonWrapper}>
				<div className={style.header}>
					<div>
						<h1 className={style.title}>{ pokemon.name }</h1>

						<DetailsRow title={'Abilities'} value={abilities.join(', ')} />
						<DetailsRow title={'Types'} value={types.join(', ')} />
						<DetailsRow title={'Base experience'} value={pokemon.base_experience} />
					</div>

					<div className={style.imgWrapper}>
						<img src={pokemonImage} alt={`${pokemon.name}-image`} />
					</div>
				</div>

				<DetailsRow title={'Moves'} value={moves.join(', ')} />
				<DetailsStats stats={pokemon.stats} />
			</div>
		</>
	)
}

export default Details
