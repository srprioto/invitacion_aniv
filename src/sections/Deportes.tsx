import ScrollHint from "@/components/ScrollHint";

interface Deporte {
	icono: string;
	titulo: string;
	detalle: string;
	fecha: string;
}


export default function Deportes() {

	const DEPORTES: Deporte[] = [
		{ icono: '⚽', titulo: 'Campeonato "Copa GERESA 2026"', detalle: 'Confraternidad institucional', fecha: '21 Ago – 02 Oct' },
		{ icono: '🙏', titulo: 'Novena del Señor de los Milagros', detalle: 'Celebración comunitaria', fecha: '24 Sep – 06 Oct' },
		{ icono: '💃', titulo: 'Concurso de Danzas', detalle: 'Participación institucional', fecha: '06 Oct · 13:00' },
		{ icono: '🇵🇪', titulo: 'Izamiento del Pabellón', detalle: 'Plaza de Armas del Cusco', fecha: '11 Oct · 08:30' },
	];

	const DEFAULT_PHOTO = '/photo.jpg';

	return (
		<section className="slide slide-deportes" id="s6">
			<div className="slide-inner">
				<div className="section-eyebrow">Actividades por el Aniversario</div>
				<h2 className="section-title">Juegos Deportivos y Actividades</h2>

				<div className="deportes-grid">
					{DEPORTES.map(({ icono, titulo, detalle, fecha }) => (
						<div className="deporte-card" key={titulo}>
							<span className="deporte-icon">{icono}</span>
							<h4>{titulo}</h4>
							<p>{detalle}</p>
							<span className="fecha">{fecha}</span>
						</div>
					))}
				</div>

				<div className="foto-deportiva">
					<img src={DEFAULT_PHOTO} alt="Equipo deportivo GERESA" />
				</div>
			</div>

			<ScrollHint />
		</section>
	)
}
