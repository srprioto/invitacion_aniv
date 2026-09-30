import ScrollHint from "@/components/ScrollHint";

interface TimelineEvent {
	hora: string;
	titulo: string;
	detalle: string;
}

export default function Programa() {

	const TIMELINE_COLUMNS: TimelineEvent[][] = [
		[
			{ 
				hora: '08:00', 
				titulo: 'Cántico de Aniversario', 
				detalle: 'Inicio de actividades conmemorativas' },
			{ 
				hora: '08:30', 
				titulo: 'Ceremonia Cívico Patriótica', 
				detalle: 'Acto protocolar de izamiento' },
			{ 
				hora: '09:00', 
				titulo: 'Ceremonia Litúrgica', 
				detalle: 'Rvdo. Mons. Manuel Bravo Álvarez' },
			{ 
				hora: '10:00', 
				titulo: 'Procesión de la Sagrada Imagen', 
				detalle: 'Señor de los Milagros' },
			{ 
				hora: '11:00', 
				titulo: 'Compartir Institucional', 
				detalle: 'Ceremonia protocolar y reconocimientos' },
			{
				hora: '13:30',
				titulo: 'Almuerzo de Confraternidad',
				detalle: 'Crystal Palace · Av. Tomasa Tito Condemayta 1875',
			},
		],
	];

	return (
		<section className="slide slide-programa" id="s3">
			<div className="slide-inner">
				<div className="section-eyebrow">Día Central · 7 de Octubre</div>
				<h2 className="section-title">Programa Oficial</h2>

				<div className="programa-grid">
					{TIMELINE_COLUMNS.map((column, i) => (
						<div className="timeline" key={i}>
							{column.map(({ hora, titulo, detalle }) => (
								<div className="timeline-item" key={hora}>
									<div className="timeline-dot" />
									<div className="timeline-hora">{hora}</div>
									<div className="timeline-body">
										<h4>{titulo}</h4>
										<p>{detalle}</p>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			<ScrollHint />
		</section>
	)
}
