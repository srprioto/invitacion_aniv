'use client';

import { useEffect, useState } from 'react';
import ScrollHint from "@/components/ScrollHint";

const FOTOS_CIERRE = [
	'/images/nosotros/samu.png',
	'/images/nosotros/nostro1.png',
	
];

export default function Cierre() {
	const [index, setIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState<number | null>(null);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((i) => {
				setPrevIndex(i);
				return (i + 1) % FOTOS_CIERRE.length;
			});
		}, 4000);

		return () => clearInterval(timer);
	}, []);

	// Limpia el prevIndex después de la transición
	useEffect(() => {
		if (prevIndex === null) return;
		const t = setTimeout(() => setPrevIndex(null), 900);
		return () => clearTimeout(t);
	}, [prevIndex, index]);

	return (
		<section className="slide slide-cierre" id="s8">
			<div className="slide-inner">
				<div className="cierre-grid">
					<div className="cierre-foto">
						{FOTOS_CIERRE.map((src, i) => (
							<img
								key={src + i}
								src={src}
								alt="Equipo GERESA unido"
								className={`cierre-foto__img ${i === index ? 'is-active' : ''}`}
								aria-hidden={i !== index}
							/>
						))}
						<div className="cierre-foto__overlay" aria-hidden="true" />
						<div className="cierre-foto__frame" aria-hidden="true" />
					</div>

					<div>
						<div className="section-eyebrow section-eyebrow--light">Gracias</div>
						<h2 className="section-title">Unidos por la salud y el bienestar</h2>

						<div className="cierre-divider" />

						<p>
							La GERESA CUSCO celebra, reconoce y agradece a cada uno de sus trabajadores por su entrega, vocación de
							servicio y amor por el Cusco.
						</p>
					</div>
				</div>
			</div>

			<ScrollHint />
		</section>
	);
}