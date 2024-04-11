import Input from '../../../common/Input';
import { useState } from 'react';
import Dropdown from '../../../common/Dropdown';

function Filters() {
	const [filters, setFilters] = useState({
		search: '',
		type: ''
	});

	const handleChangeSearch = e => {
		setFilters(prevFilter => {
			return {
				...prevFilter,
				search: e.target.value
			}
		});
	};

	const handleChangeType = value => {
		setFilters(prevFilter => {
			return {
				...prevFilter,
				type: value
			}
		});
	};

	const options = [
		{ label: 'test1', value: 'text1'},
		{ label: 'test2', value: 'text2'},
		{ label: 'test3', value: 'text3'},
		{ label: 'test4', value: 'text4'},
	];

	return (
		<>
			<div className='flex mb-6 justify-between'>
				<div className='w-80'>
					<Input placeholder='Search by name' onChange={handleChangeSearch} value={filters.search} />
				</div>

				<div className='w-80'>
					<Dropdown value={filters.type} placeholder={'Select type'} onChange={handleChangeType} options={options} />
				</div>
			</div>
		</>
	)
}
export default Filters;
