'use client';

import { useEffect, useState } from 'react';
import ScrollHint from "@/components/ScrollHint";

const FOTOS_SECUNDARIAS = [
	'/images/nosotros/nostro1.png',
	'/images/nosotros/samu.jpeg',
];

interface Prop {
	nombreInv: string;
}

export default function Invitacion({ nombreInv }: Prop) {
	const [index, setIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState<number | null>(null);

	// Rotación automática cada 4 segundos
	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((i) => {
				setPrevIndex(i);
				return (i + 1) % FOTOS_SECUNDARIAS.length;
			});
		}, 4000);

		return () => clearInterval(timer);
	}, []);

	// Limpia prevIndex después de la transición
	useEffect(() => {
		if (prevIndex === null) return;
		const t = setTimeout(() => setPrevIndex(null), 900);
		return () => clearTimeout(t);
	}, [prevIndex, index]);

	return (
		<section className="slide slide-invitacion" id="s2">
			<div className="slide-inner">
				<div className="invitacion-grid">
					<div className="invitacion-texto-wrap">
						<div className="section-eyebrow">Con motivo de celebrar</div>
						<h2 className="section-title">Una fecha de fe, tradición y reconocimiento</h2>

						<div className="nombre-inv">
							<span>Estimado(a)</span>
							<p>
								{nombreInv
									.toLowerCase()
									.split(' ')
									.map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
									.join(' ')}
							</p>
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
							{FOTOS_SECUNDARIAS.map((src, i) => (
								<img
									key={src + i}
									src={src}
									alt="Equipo institucional"
									className={`foto-secundaria__img ${i === index ? 'is-active' : ''}`}
									aria-hidden={i !== index}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<ScrollHint />
		</section>
	);
}