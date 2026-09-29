import ScrollHint from "@/components/ScrollHint";

export default function Cierre() {


	const DEFAULT_PHOTO = '/photo.jpg';

	return (
		<section className="slide slide-cierre" id="s8">
			<div className="slide-inner">
				<div className="cierre-grid">
					<div className="cierre-foto">
						<img src={DEFAULT_PHOTO} alt="Equipo GERESA unido" />
					</div>

					<div>
						<div className="section-eyebrow section-eyebrow--light">Gracias</div>
						<h2 className="section-title">Unidos por la salud y el bienestar</h2>

						<div className="cierre-divider" />

						<p>
							GERESA celebra, reconoce y agradece a cada uno de sus trabajadores por su entrega, vocación de
							servicio y amor por el Cusco.
						</p>
					</div>
				</div>
			</div>

			<ScrollHint />
		</section>
	)
}
