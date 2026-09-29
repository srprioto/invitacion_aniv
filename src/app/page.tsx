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
import NavRight from '@/components/NavRight';
import VideoInv from '@/sections/VideoInv';


interface NavSection {
	id: string;
	label: string;
}

export default function Home() {

		
	const containerRef = useRef<HTMLElement>(null);

	const NAV_SECTIONS: NavSection[] = [
		{ id: 's1', label: 'Portada' },
		{ id: 's2', label: 'Invitación' },
		{ id: 's2b', label: 'VideoInv' },
		{ id: 's3', label: 'Programación' },
		{ id: 's4', label: 'Reconocimiento' },
		{ id: 's4b', label: 'Homenaje institucional' },
		{ id: 's5', label: 'Galería' },
		{ id: 's6', label: 'Deportes' },
		{ id: 's7', label: 'Registro' },
		{ id: 's8', label: 'Cierre' },
		{ id: 's9', label: 'Footer' },
	];


	return (
		<>
			
			<NavRight containerRef={containerRef} navSection={NAV_SECTIONS} />

			<main className="snap-container" id="snap" ref={containerRef}>

				<Hero/>
				<Invitacion />
				<VideoInv />
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