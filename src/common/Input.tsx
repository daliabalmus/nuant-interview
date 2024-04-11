function Input({ placeholder, ...props }) {
	return (
		<>
			<input
				{...props}
				type="text"
				className='bg-neutral-900 w-full p-3 rounded-lg text-gray-200 border border-transparent focus:border-white/[0.2] placeholder-gray-500'
				placeholder={placeholder}/>
		</>
	)
}
export default Input;
