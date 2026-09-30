'use client';

import { useEffect, useRef } from 'react';
import ScrollHint from '@/components/ScrollHint';

interface Homenajeado {
	nombre: string;
	foto?: string;
}

interface HomenajeadoGroup {
	anios: number;
	personas: Homenajeado[];
}

const HOMENAJEADOS: HomenajeadoGroup[] = [
	{
		anios: 25,
		personas: [
			{ nombre: 'Dario F. Navarro Mendoza', foto: '/images/personas/25/dario_navarro.jpeg' },
			{ nombre: 'Mauro Vargas León', foto: '/images/personas/25/mauro_vargas.jpeg' },
			{ nombre: 'Manuel G. Vigil Vargas', foto: '/images/personas/25/manuel_vigil.jpeg' },
			{ nombre: 'Miriam Manya Aqgehua', foto: '/images/personas/25/miriem_manya.jpeg' },
			{ nombre: 'Wilbert Otano Rojas', foto: '/images/personas/25/wilber_otano.jpg' },
			{ nombre: 'Carlos E. Vega Centeno Cruzado', foto: '/images/personas/25/carlos_vega_centeno.png' },
		],
	},
	{
		anios: 30,
		personas: [
			{ nombre: 'Gloria D. Ochoa Guillén', foto: '/images/personas/30/gloria_ochoa.jpeg' },
			{ nombre: 'Jackeline P. Velarde Flores', foto: '/images/personas/30/jackeline_velarde.jpeg' },
		],
	},
];

export default function HomenajeLaborSlider() {
	const sliderRefs = useRef<Array<HTMLDivElement | null>>([]);

	useEffect(() => {
		const cleanups: Array<() => void> = [];

		sliderRefs.current.forEach((el) => {
			if (!el) return;

			let paused = false;
			let resumeTimer: ReturnType<typeof setTimeout> | null = null;
			let lastScrollLeft = el.scrollLeft;

			const pause = () => {
				paused = true;
				if (resumeTimer) clearTimeout(resumeTimer);
				resumeTimer = setTimeout(() => { paused = false; }, 3000);
			};

			el.addEventListener('touchstart', pause, { passive: true });
			el.addEventListener('wheel', pause, { passive: true });
			el.addEventListener('mousedown', pause);
			el.addEventListener('scroll', () => {
				if (Math.abs(el.scrollLeft - lastScrollLeft) > 40) pause();
			}, { passive: true });

			const timer = setInterval(() => {
				if (paused) return;

				const card = el.querySelector<HTMLElement>('.card-trabajador');
				if (!card) return;

				const cardWidth = card.offsetWidth + 14;
				const maxScroll = el.scrollWidth - el.clientWidth;

				// Si ya estamos al final → volver al inicio
				if (el.scrollLeft >= maxScroll - 4) {
					el.scrollTo({ left: 0, behavior: 'smooth' });
					lastScrollLeft = 0;
					return;
				}

				// Avanzar una card sin pasarnos del final
				const next = Math.min(el.scrollLeft + cardWidth, maxScroll);
				el.scrollTo({ left: next, behavior: 'smooth' });
				lastScrollLeft = next;
			}, 2000);

			cleanups.push(() => {
				clearInterval(timer);
				if (resumeTimer) clearTimeout(resumeTimer);
			});
		});

		return () => cleanups.forEach((c) => c());
	}, []);

	return (
		<section className="slide slide-slider" id="s5">
			<div className="slide-inner">
				<div className="section-eyebrow section-eyebrow--light">Galería de Honor</div>
				<h2 className="section-title section-title--tight">Nuestros Homenajeados</h2>

				{HOMENAJEADOS.map(({ anios, personas }, groupIdx) => (
					<div key={anios}>
						<div className="slider-grupo-titulo">— {anios} AÑOS —</div>
						<div
							className="slider"
							ref={(el) => { sliderRefs.current[groupIdx] = el; }}
						>
							{personas.map(({ nombre, foto }) => (
								<div className="card-trabajador" key={nombre}>
									<div className="card-foto">
										<img src={foto} alt="" />
									</div>
									<div className="card-info">
										<div className="card-nombre">{nombre}</div>
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
	);
}