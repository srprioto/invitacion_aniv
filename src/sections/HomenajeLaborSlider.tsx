import ScrollHint from "@/components/ScrollHint";

interface Homenajeado {
	nombre: string;
	cargo: string;
	foto?: string;
}

interface HomenajeadoGroup {
	anios: number;
	personas: Homenajeado[];
}

export default function HomenajeLaborSlider() {

	const HOMENAJEADOS: HomenajeadoGroup[] = [
		{
			anios: 25,
			personas: [
				{ nombre: 'Dario F. Navarro Mendoza', cargo: 'Médico Cirujano' },
				{ nombre: 'Mauro Vargas León', cargo: 'Médico Cirujano' },
				{ nombre: 'Manuel G. Vigil Vargas', cargo: 'Economista' },
				{ nombre: 'Miriam Manya Aqgehua', cargo: 'Químico Farmacéutico' },
				{ nombre: 'Wilbert Otano Rojas', cargo: 'Técnico Administrativo' },
				{ nombre: 'Carlos E. Vega Centeno Cruzado', cargo: 'Médico Cirujano' },
			],
		},
		{
			anios: 30,
			personas: [
				{ nombre: 'Gloria D. Ochoa Guillén', cargo: 'Licenciada en Enfermería' },
				{ nombre: 'Jackeline P. Velarde Flores', cargo: 'Obstetra' },
			],
		},
	];

	const DEFAULT_PHOTO = '/photo.jpg';
	

	return (
		<section className="slide slide-slider" id="s5">
			<div className="slide-inner">
				<div className="section-eyebrow section-eyebrow--light">Galería de Honor</div>
				<h2 className="section-title section-title--tight">Nuestros Homenajeados</h2>

				{HOMENAJEADOS.map(({ anios, personas }) => (
					<div key={anios}>
						<div className="slider-grupo-titulo">— {anios} AÑOS —</div>
						<div className="slider">
							{personas.map(({ nombre, cargo, foto }) => (
								<div className="card-trabajador" key={nombre}>
									<div className="card-foto">
										<img src={foto ?? DEFAULT_PHOTO} alt="" />
									</div>
									<div className="card-info">
										<div className="card-nombre">{nombre}</div>
										<div className="card-cargo">{cargo}</div>
										<div className="card-years">{anios} Años</div>
									</div>
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
