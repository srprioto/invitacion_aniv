import ScrollHint from "@/components/ScrollHint";

interface prop {
	nombreInv: string
}

export default function Invitacion({ nombreInv }:prop) {

	const DEFAULT_PHOTO = '/images/nosotros/nostro1.png';

	return (
		<section className="slide slide-invitacion" id="s2">
			<div className="slide-inner">
				<div className="invitacion-grid">
					<div className="invitacion-texto-wrap">
						<div className="section-eyebrow">Con motivo de celebrar</div>
						<h2 className="section-title">Una fecha de fe, tradición y reconocimiento</h2>

						<div className="nombre-inv">
							<span>Estimado(A)</span>
							<p>{ nombreInv }</p>
						</div>

						<p>
							El <span className="destacado">Gerente Regional de Salud Cusco</span> y la{' '}
							<span className="destacado">Dirección Ejecutiva de Inteligencia Sanitaria</span> tienen el agrado
							de invitarle a las actividades conmemorativas por el <strong>LXIX Aniversario Institucional</strong>{' '}
							y homenaje al <strong>Señor de los Milagros</strong>.
						</p>

						<p>Agradecemos su gentil asistencia.</p>
					</div>

					<div className="box_foto_secundaria">
						<div className="section-eyebrow">Mayordomos 2026</div>
						<div className="foto-secundaria">
							<img src={DEFAULT_PHOTO} alt="Equipo institucional" />
						</div>
					</div>
				</div>
			</div>

			<ScrollHint />
		</section>
	)
}
