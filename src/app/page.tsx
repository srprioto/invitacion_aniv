'use client';

import ScrollHint from '@/components/ScrollHint';
import Hero from '@/sections/Hero';
import HomenajeLabor from '@/sections/HomenajeLabor';
import Invitacion from '@/sections/Invitacion';
import Programa from '@/sections/Programa';
import Reconocimiento from '@/sections/Reconocimiento';
import HomenajeLaborSlider from '@/sections/HomenajeLaborSlider';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from 'react';
import Deportes from '@/sections/Deportes';
import RegistroQr from '@/sections/RegistroQr';
import Cierre from '@/sections/Cierre';
import Footer from '@/sections/Footer';


interface NavSection {
	id: string;
	label: string;
}


export default function Home() {

		
	const NAV_SECTIONS: NavSection[] = [
		{ id: 's1', label: 'Portada' },
		{ id: 's2', label: 'Invitación' },
		{ id: 's3', label: 'Programación' },
		{ id: 's4', label: 'Reconocimiento' },
		{ id: 's4b', label: 'Homenaje institucional' },
		{ id: 's5', label: 'Galería' },
		{ id: 's6', label: 'Deportes' },
		{ id: 's7', label: 'Registro' },
		{ id: 's8', label: 'Cierre' },
		{ id: 's9', label: 'Footer' },
	];

	const containerRef = useRef<HTMLElement>(null);
	const [activeId, setActiveId] = useState<string>('s1');

	const scrollToId = useCallback((id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const slides = Array.from(container.querySelectorAll<HTMLElement>('.slide'));

		// Marca el dot activo según el slide visible
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveId(entry.target.id);
				});
			},
			{ root: container, threshold: 0.6 },
		);
		slides.forEach((s) => observer.observe(s));

		// Soporte con teclado (desktop)
		const onKeyDown = (e: KeyboardEvent) => {
			const current = slides.findIndex((s) => Math.abs(s.getBoundingClientRect().top) < window.innerHeight / 2);

			if (e.key === 'ArrowDown' || e.key === 'PageDown') {
				e.preventDefault();
				slides[Math.min(current + 1, slides.length - 1)]?.scrollIntoView({ behavior: 'smooth' });
			}
			if (e.key === 'ArrowUp' || e.key === 'PageUp') {
				e.preventDefault();
				slides[Math.max(current - 1, 0)]?.scrollIntoView({ behavior: 'smooth' });
			}
		};
		document.addEventListener('keydown', onKeyDown);

		return () => {
			observer.disconnect();
			document.removeEventListener('keydown', onKeyDown);
		};
	}, []);


	return (
		<>
			{/* Navegación lateral con dots */}
			<nav className="nav-dots">
				{NAV_SECTIONS.map(({ id, label }) => (
					<a
						key={id}
						href={`#${id}`}
						className={activeId === id ? 'active' : undefined}
						aria-label={label}
						onClick={(e) => {
							e.preventDefault();
							scrollToId(id);
						}}
					/>
				))}
			</nav>

			<main className="snap-container" id="snap" ref={containerRef}>

				<Hero/>
				<Invitacion />
				<Programa />
				<Reconocimiento />
				<HomenajeLabor />
				<HomenajeLaborSlider />
				<Deportes />
				<RegistroQr />
				<Cierre />
				<Footer />

			</main>
		</>
	);
}