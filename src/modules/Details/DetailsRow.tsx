import style from "./Details.module.scss";

function DetailsRow({title, value}) {
	return (
		<p className={style.details}>
			<span className={style.detailsTitle}>{title}: </span>
			<span className={style.description}>{ value }</span>
		</p>
	)
}

export default DetailsRow;
