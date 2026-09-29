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
		nombre: 'ABRILL GAMARRA, Marlene',       
		foto: '/images/SrMilagros.jpg'
	},
	{ 
		nombre: 'AÑANCA ZUNIGA, Jesús Manuel',   
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'BACA MENDOZA, Ruth Marina',     
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'CALLAHUI RIOS, Clorinda',       
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'FARFAN RIMACHI, Fidel Marcos',  
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'FUENTES CARAYHUA, Isabel',      
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'MONGE CASAFRANCA, Ketty Gladys',
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'NAVARRO AMARU, Hermenegilda',   
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'OTAZU PILLCO, Jorge',           
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'PAUCCAR HUAMAN, Antonio',       
		foto: '/images/SrMilagros.jpg',

	},
	{ 
		nombre: 'SALAS PANTIGOZO, Teofilo',      
		foto: '/images/SrMilagros.jpg',

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
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio eius molestiae doloribus quae debitis qui fugiat mollitia quos nostrum, facere in distinctio odio exercitationem officiis non reiciendis rerum aspernatur? Doloremque?
					</span>
					<div className='linea_inf' />
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