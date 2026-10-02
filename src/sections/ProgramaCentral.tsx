import ScrollHint from "@/components/ScrollHint";

type Item = {
  titulo: string;
  detalle?: string;
};

const ITEMS: Item[] = [
	{
		titulo: "Palabras de bienvenida",
		detalle:
		"A cargo del Director Ejecutivo de Inteligencia Sanitaria, M.C. Alex Jaramillo Corrales",
	},
	{ 	
		titulo: "Momento musical" 
	},
	{
		titulo: "Reconocimiento a Trabajadores",
		detalle: "Por 25 y 30 años de servicio a la Institución",
	},
	{
		titulo: "Homenaje y Reconocimiento",
		detalle: "A los trabajadores por su labor institucional cumplida",
	},
	{ 	
		titulo: "Momento musical" 
	},
	{
		titulo: "Entrega de Premios",
		detalle: "Concurso de Deportes, Drill y Danzas",
	},
	{
		titulo: "Palabras Centrales",
		detalle:
		"A cargo del Gerente Regional de Salud, M.C. Omar Farfán Ochoa",
	},
	{ 	
		titulo: "Momento musical" 
	},
];

export default function ProgramaCentral() {
	return (
		<section className="slide slide-programa" id="s4">
			<div className="slide-inner">
				<div className="section-eyebrow">Programa</div>
				<h2 className="section-title">Ceremonia Central</h2>

				<ol className="programa-lista">
					{ITEMS.map((item, i) => (
						<li key={i} className="programa-lista__item">
							<div className="programa-lista__num" aria-hidden="true">
								{String(i + 1).padStart(2, "0")}
							</div>

							<div className="programa-lista__body">
								<h3 className="programa-lista__titulo">{item.titulo}</h3>
								{item.detalle && (
									<p className="programa-lista__detalle">{item.detalle}</p>
								)}
							</div>
						</li>
					))}
				</ol>
			</div>

			<ScrollHint />
		</section>
	);
}