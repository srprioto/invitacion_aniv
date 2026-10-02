import ScrollHint from "@/components/ScrollHint";

interface TimelineEvent {
	hora: string;
	titulo: string;
	detalle: string;
}

export default function Programa() {

	const TIMELINE_COLUMNS1: TimelineEvent[][] = [
		[
			{ 
				hora: '08:30', 
				titulo: 'Cántico de Aniversario', 
				detalle: 'Inicio de actividades conmemorativas' 
			},
		],
	];


	const TIMELINE_COLUMNS2: TimelineEvent[][] = [
		[
			{ 
				hora: '08:00', 
				titulo: 'Acto Cívico Patriótica', 
				detalle: 'Izamiento de la bandera' 
			},
			{ 
				hora: '08:30', 
				titulo: 'Ceremonia Litúrgica', 
				detalle: 'Rvdo. Mons. Manuel Bravo Álvarez' 
			},
			{ 
				hora: '09:30', 
				titulo: 'Procesión de la Sagrada Imagen', 
				detalle: 'Señor de los Milagros' 
			},

			{ 
				hora: '10:00', 
				titulo: 'Compartir institucional', 
				detalle: 'Desayuno de confraternidad' 
			},
			{ 
				hora: '10:30', 
				titulo: 'Ceremonia Central', 
				detalle: '-' 
			},
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
				<div className="section-eyebrow">6 de octubre</div>
				<h2 className="section-title">Dia de Aniversario</h2>

				<div className="programa-grid">
					{TIMELINE_COLUMNS1.map((column, i) => (
						<div className="timeline" key={i}>
							{column.map(({ hora, titulo, detalle }) => (
								<div className="timeline-item" key={hora}>
									<div className="timeline-dot" />
									<div className="timeline-hora">{hora}</div>
									<div className="timeline-body">
										<h4>{titulo}</h4>
										<p className="detalles">{detalle}</p>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			<div className="pt15 mb10"></div>

			<div className="slide-inner">
				<div className="section-eyebrow">7 de octubre</div>
				<h2 className="section-title">Desarrollo de la Ceremonia Central</h2>

				<div className="programa-grid">
					{TIMELINE_COLUMNS2.map((column, i) => (
						<div className="timeline" key={i}>
							{column.map(({ hora, titulo, detalle }) => (
								<div className="timeline-item" key={hora}>
									<div className="timeline-dot" />
									<div className="timeline-hora">{hora}</div>
									<div className="timeline-body">
										<h4>{titulo}</h4>
										<p className="detalles">{detalle}</p>
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
