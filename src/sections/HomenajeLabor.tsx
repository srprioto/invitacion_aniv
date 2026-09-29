import ScrollHint from "@/components/ScrollHint";

export default function HomenajeLabor() {

	const LABOR_CUMPLIDA: string[] = [
		'ABRILL GAMARRA, Marlene',
		'AÑANCA ZUNIGA, Jesús Manuel',
		'BACA MENDOZA, Ruth Marina',
		'CALLAHUI RIOS, Clorinda',
		'FARFAN RIMACHI, Fidel Marcos',
		'FUENTES CARAYHUA, Isabel',
		'MONGE CASAFRANCA, Ketty Gladys',
		'NAVARRO AMARU, Hermenegilda',
		'OTAZU PILLCO, Jorge',
		'PAUCCAR HUAMAN, Antonio',
		'SALAS PANTIGOZO, Teofilo',
	];

	return (
		<section className="slide slide-reconocimiento" id="s4b">
			<div className="slide-inner">
				<div className="section-eyebrow">Reconocimiento</div>
				<h2 className="section-title">Homenaje a la Labor Institucional Cumplida</h2>

				<div className="lista-trabajadores">
					{LABOR_CUMPLIDA.map((nombre) => (
						<div className="trabajador-item" key={nombre}>
							{nombre}
						</div>
					))}
				</div>
			</div>

			<ScrollHint />
		</section>
	)
}
