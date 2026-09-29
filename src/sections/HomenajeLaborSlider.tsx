'use client';

import { useEffect, useRef } from 'react';
import ScrollHint from '@/components/ScrollHint';

interface Homenajeado {
	nombre: string;
	cargo: string;
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
			{ 
				nombre: 'Dario F. Navarro Mendoza', 
				cargo: 'Médico Cirujano', 
				foto: '/images/SrMilagros.jpg' },
			{ 
				nombre: 'Mauro Vargas León', 
				cargo: 'Médico Cirujano', 
				foto: '/images/SrMilagros.jpg' },
			{ 
				nombre: 'Manuel G. Vigil Vargas', 
				cargo: 'Economista', 
				foto: '/images/SrMilagros.jpg' },
			{ 
				nombre: 'Miriam Manya Aqgehua', 
				cargo: 'Químico Farmacéutico', 
				foto: '/images/SrMilagros.jpg' },
			{ 
				nombre: 'Wilbert Otano Rojas', 
				cargo: 'Técnico Administrativo', 
				foto: '/images/SrMilagros.jpg' },
			{ 
				nombre: 'Carlos E. Vega Centeno Cruzado', 
				cargo: 'Médico Cirujano', 
				foto: '/images/SrMilagros.jpg' },
		],
	},
	{
		anios: 30,
		personas: [
			{ 
				nombre: 'Gloria D. Ochoa Guillén', 
				cargo: 'Licenciada en Enfermería', 
				foto: '/images/SrMilagros.jpg' },
			{ 
				nombre: 'Jackeline P. Velarde Flores', 
				cargo: 'Obstetra', 
				foto: '/images/SrMilagros.jpg' },
		],
	},
];


function useAutoScroll(
	ref: React.RefObject<HTMLDivElement | null>,
	options: { interval?: number; resumeDelay?: number } = {}
) {
	const { interval = 1000, resumeDelay = 2000 } = options;

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let paused = false;
		let resumeTimer: ReturnType<typeof setTimeout> | null = null;

		const pause = () => {
			paused = true;
			if (resumeTimer) clearTimeout(resumeTimer);
			resumeTimer = setTimeout(() => {
				paused = false;
			}, resumeDelay);
		};

		// Pausar cuando el usuario interactúa
		el.addEventListener('touchstart', pause, { passive: true });
		el.addEventListener('wheel', pause, { passive: true });
		el.addEventListener('mousedown', pause);
		el.addEventListener('scroll', () => {
			// Ignoramos scrolls muy pequeños (los que hacemos nosotros)
			if (Math.abs(el.scrollLeft - lastScrollLeft) > 40) pause();
		}, { passive: true });

		let lastScrollLeft = el.scrollLeft;

		const timer = setInterval(() => {
			if (paused) return;

			const card = el.querySelector<HTMLElement>('.card-trabajador');
			if (!card) return;

			// Ancho de una card + gap
			const cardWidth = card.offsetWidth + 14; // 14 = gap del CSS
			const maxScroll = el.scrollWidth - el.clientWidth;

			let next = el.scrollLeft + cardWidth;

			// Si ya no cabe otra card, volvemos al inicio
			if (next >= maxScroll - 4) {
				next = 0;
			}

			el.scrollTo({ left: next, behavior: 'smooth' });
			lastScrollLeft = next;
		}, interval);

		return () => {
			clearInterval(timer);
			if (resumeTimer) clearTimeout(resumeTimer);
		};
	}, [ref, interval, resumeDelay]);
}

export default function HomenajeLaborSlider() {
	// Un ref por grupo (por años) para que cada slider gire independiente
	const sliderRefs = useRef<Array<HTMLDivElement | null>>([]);

	// Hook para cada slider
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
				let next = el.scrollLeft + cardWidth;

				if (next >= maxScroll - 4) next = 0;

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
							{personas.map(({ nombre, cargo, foto }) => (
								<div className="card-trabajador" key={nombre}>
									<div className="card-foto">
										<img src={foto} alt="" />
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
	);
}