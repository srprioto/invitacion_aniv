'use client';

import { useEffect, useRef } from 'react';
import ScrollHint from '@/components/ScrollHint';

interface Homenajeado {
	nombre: string;
	foto: string;
	cargo?: string;
}

const HOMENAJEADOS: Homenajeado[] = [
	{ 
		nombre: 'Marlene Abrill Gamarra',       
		foto: '/images/personas/70/marlene_abrill.png',
	},
	{ 
		nombre: 'Jesús Manuel Añanca Zuniga',   
		foto: '/images/personas/70/jesus_ananca.jpg',

	},
	{ 
		nombre: 'Ruth Marina Baca Mendoza',     
		foto: '/images/personas/70/ruth_baca.jpg',

	},
	{ 
		nombre: 'Clorinda Callahui Rios',       
		foto: '/images/personas/70/clorinda_callahui.png',

	},
	{ 
		nombre: 'Fidel Marcos Farfan Rimachi',  
		foto: '/images/personas/70/fidel_farfan.jpeg',

	},
	{ 
		nombre: 'Isabel Fuentes Carayhua',      
		foto: '/images/personas/70/isabel_fuentes.jpeg',

	},
	{ 
		nombre: 'Ketty Gladys Monge Casafranca',
		foto: '/images/personas/70/ketty_gladis.png',

	},
	{ 
		nombre: 'Hermenegilda Navarro Amaru',   
		foto: '/images/personas/70/hermene_navarro.png',

	},
	{ 
		nombre: 'Jorge Otazu Pillco',           
		foto: '/images/personas/70/jorge_otazu.png',

	},
	{ 
		nombre: 'Antonio Pauccar Huaman',       
		foto: '/images/personas/70/antonio_paucar.png',

	},
	{ 
		nombre: 'Teofilo Salas Pantigozo',      
		foto: '/images/personas/70/teofilo_salas.jpeg',

	},
];

export default function HomenajeLabor() {
	const sliderRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = sliderRef.current;
		if (!el) return;

		let paused = false;
		let resumeTimer: ReturnType<typeof setTimeout> | null = null;
		let lastScrollLeft = el.scrollLeft;

		const pause = () => {
			paused = true;
			if (resumeTimer) clearTimeout(resumeTimer);
			resumeTimer = setTimeout(() => { paused = false; }, 1500);
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

		return () => {
			clearInterval(timer);
			if (resumeTimer) clearTimeout(resumeTimer);
		};
	}, []);

	return (
		<section className="slide slide-reconocimiento" id="s4b">
			<div className="slide-inner">
				<div className="section-eyebrow">Reconocimiento</div>
				<h2 className="section-title section-title--tight">
					Homenaje a la Labor Institucional Cumplida
				</h2>

				<div className='descrip_homenaje'>
					<span>
						No todos tenemos la dicha de tener un(a) excelente compañero(a) de trabajo como tú y por eso te mereces un excelente reconocimiento por tu labor institucional
					</span>
					<div className="cierre-divider-claro" />
				</div>

				<div className="slider" ref={sliderRef}>
					{HOMENAJEADOS.map(({ nombre, foto, cargo }) => (
						<div className="card-trabajador" key={nombre}>
							<div className="card-foto">
								<img src={foto} alt={nombre} />
							</div>
							<div className="card-info">
								<div className="card-nombre">{nombre}</div>
								<div className="card-cargo">Labor Institucional Cumplida</div>
								<div className="card-years">Homenaje</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<ScrollHint />
		</section>
	);
}