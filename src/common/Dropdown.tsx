import { useEffect, useRef, useState } from 'react';

function Dropdown({ onChange, placeholder = '', value = '', options = [] }) {
	const dropdownRef = useRef<HTMLInputElement>(null);
	const [isDropdownActive, setDropdownActive] = useState(false);
	const [dropdownValue, setDropdownValue] = useState(value || '');

	const handleOutsideClick = (e) => {
		if (dropdownRef.current && !dropdownRef.current?.contains(e.target)) {
			setDropdownActive(false);
		}
	};

	const handleSelectValue = (e, value) => {
		e.stopPropagation();
		setDropdownValue(value);
		onChange(value);
		setDropdownActive(false);
	}

	console.log(isDropdownActive);
	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	});

	const selectedOption = options.find(itm => itm.value === dropdownValue)?.label || '';

	return (
		<div className='relative inline-block text-left w-full' ref={dropdownRef}>
			<div className='w-full'>
				<button type='button'
								className={`w-full flex justify-between bg-neutral-900 p-3 rounded-lg text-gray-${dropdownValue === '' ? '500' : '200'} border border-transparent focus:border-white/[0.2]`}
								id='menu-button' aria-expanded='true' aria-haspopup='true' onClick={() => setDropdownActive(true)}>
					{dropdownValue === '' ? placeholder : selectedOption}
					<svg className='-mr-1 h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
						<path fillRule='evenodd'
									d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
									clipRule='evenodd'/>
					</svg>
				</button>
			</div>

			{isDropdownActive && (
				<div
					className='w-full absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
					role='menu' aria-orientation='vertical' aria-labelledby='menu-button' tabIndex='-1'>
					<div className='py-1' role='none'>
						{
							options.map(option => (
								<div
									key={option.value}
									onClick={(e) => handleSelectValue(e, option.value)}
									className='text-gray-300 block px-4 py-3 text-sm hover:bg-neutral-950 cursor-pointer' role='menuitem' tabIndex='-1' id='menu-item-0'
								>
									{ option.label }
								</div>
							))
						}
					</div>

				</div>
			)}

		</div>
	)
}

export default Dropdown;
