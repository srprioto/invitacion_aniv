import ScrollHint from "@/components/ScrollHint";

interface AwardGroup {
	anios: number;
	personas: string[];
}

export default function Reconocimiento() {

	const AWARD_GROUPS: AwardGroup[] = [
		{
			anios: 25,
			personas: [
				'M.C. Dario Francisco NAVARRO MENDOZA',
				'M.C. Mauro VARGAS LEÓN',
				'Econ. Manuel Guillermo VIGIL VARGAS',
				'Q.F. Miriam MANYA AQGEHUA',
				'TAP. Wilbert OTANO ROJAS',
				'M.C. Carlos Edwin VEGA CENTENO CRUZADO',
			],
		},
		{
			anios: 30,
			personas: [
				'Lic. Enf. Gloria Dolores OCHOA GUILLÉN',
				'Obstetra Jackeline Patricia VELARDE FLORES',
			],
		},
	];

	return (
		
		<section className="slide slide-reconocimiento" id="s4">
			<div className="slide-inner">
				<div className="section-eyebrow">Homenaje</div>
				<h2 className="section-title section-title--tight">Trayectoria y Compromiso</h2>

				{AWARD_GROUPS.map(({ anios, personas }) => (
					<div key={anios}>
						<div className="grupo-titulo">
							<span>{anios}</span> AÑOS DE SERVICIO
						</div>
						<div className="lista-trabajadores">
							{personas.map((p) => (
								<div className="trabajador-item" key={p}>
									{p}
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<ScrollHint />
		</section>

	)
}
