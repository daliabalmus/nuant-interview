import Input from '../../../common/Input';
import { useEffect, useState } from 'react';
import Dropdown from '../../../common/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { pokemonActions } from "../../../store";
import { capitalizeFirstLetter } from "../../../lib/utils";

function Filters() {
	const dispatch = useDispatch();
	const pokemons = useSelector(state => state.pokemons);

	const [filters, setFilters] = useState({
		search: '',
		type: ''
	});
	const [typeFilterOptions, setTypeFilterOptions] = useState([]);

	useEffect(() => {
		if (!pokemons) return;

		// Store all types from all pokemons in an array
		const allTypes = [];
		pokemons.forEach((pokemon) => {
			pokemon.types.forEach(type => {
				allTypes.push(type.type.name);
			});
		});

		// allTypes might contain duplicated values. we need to get only the unique ones and assign them to filter options
		const uniqueTypes = [... new Set(allTypes)];
		const typeOptions = uniqueTypes.map(type => {
			return { value: type, label: capitalizeFirstLetter(type) }
		})

		setTypeFilterOptions(typeOptions);
	}, [pokemons]);

	const handleFilterPokemons = () => {
		const pokemonMatchesName = name => name.toLowerCase().includes(filters.search.toLowerCase());
		const pokemonMatchesType = types => {
			// by returning true we don't alter filter results in case pokemon doesn't have any type
			if (!types) return true;
			if (filters.type === '') return true;

			// if filter.type does not match any pokemon type the filter method should return false
			const matchingTypes = types.find(itm => itm.type.name === filters.type);
			if (!matchingTypes) return false;
			
			return true;
		}

		const filteredPokemons = pokemons.filter(itm => pokemonMatchesName(itm.name) && pokemonMatchesType(itm.types));

		// Save Pokémons into the store
		dispatch(pokemonActions.setFilteredPokemons(filteredPokemons));
	}

	useEffect(() => {
		// Calling handleSearch after 400ms after user stops typing in search input
		const submitSearch = setTimeout( () => handleFilterPokemons(), 400);

		// Clear timeout
		return () => clearTimeout(submitSearch);
	}, [filters.search]);

	useEffect(() => {
		handleFilterPokemons();
	}, [filters.type]);

	const handleChangeSearch = e => {
		setFilters(prevFilter => {
			return { ...prevFilter, search: e.target.value }
		});
	};

	const handleChangeType = value => {
		setFilters(prevFilter => {
			return { ...prevFilter, type: value }
		});
	};

	return (
		<>
			<div className='flex mb-6 justify-between'>
				<div className='w-80'>
					<Input placeholder='Search by name' onChange={handleChangeSearch} value={filters.search} />
				</div>

				<div className='w-80'>
					<Dropdown value={filters.type} placeholder={'Select type'} onChange={handleChangeType} options={typeFilterOptions} />
				</div>
			</div>
		</>
	)
}
export default Filters;
