import style from "./Details.module.scss";

function DetailsStats({ stats }) {
	return (
		<>
			<h6 className={style.stats}>Stats</h6>

			<table className="table-auto">
				<thead>
				<tr>
					<th>Stat name</th>
					<th>Effort</th>
					<th>Base stat</th>
				</tr>
				</thead>
				<tbody>
				{ stats.map((item, i) => (
					<tr key={i}>
						<td>{item.stat.name}</td>
						<td>{item.effort}</td>
						<td>{item.base_stat}</td>
					</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default DetailsStats;
