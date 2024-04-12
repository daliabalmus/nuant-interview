import {useNavigate} from "react-router-dom";

function Custom404() {
	const history = useNavigate();

	return (
		<>
			<h1>404 - Page not found</h1>
			<button className={'bg-neutral-700 mt-6'} onClick={() => {history('/')}}>Go back to homepage</button>
		</>
	)
}

export default Custom404;
