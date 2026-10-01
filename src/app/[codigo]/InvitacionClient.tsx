// src/app/[codigo]/InvitacionClient.tsx
"use client";

import NavRight from "@/components/NavRight";
import Cierre from "@/sections/Cierre";
import Deportes from "@/sections/Deportes";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import HomenajeLabor from "@/sections/HomenajeLabor";
import HomenajeLaborSlider from "@/sections/HomenajeLaborSlider";
import Invitacion from "@/sections/Invitacion";
import Programa from "@/sections/Programa";
import ProgramaCentral from "@/sections/ProgramaCentral";
import RegistroQr from "@/sections/RegistroQr";
import VideoInv from "@/sections/VideoInv";
import { useRef } from "react";

interface NavSection {
	id: string;
	label: string;
}

type Props = {
	invitado: {
		nombre: string;
		codigo: string;
	};
};

export default function InvitacionClient({ invitado }: Props) {
	const containerRef = useRef<HTMLElement>(null);

	const NAV_SECTIONS: NavSection[] = [
		{ id: "s1", label: "Portada" },
		{ id: "s2", label: "Invitación" },
		{ id: "s2b", label: "VideoInv" },
		{ id: "s3", label: "Programación" },
		{ id: "s4", label: "Programación central" },
		{ id: "s4b", label: "Homenaje institucional" },
		{ id: "s5", label: "Galería" },
		{ id: "s6", label: "Deportes" },
		{ id: "s7", label: "Registro" },
		{ id: "s8", label: "Cierre" },
		{ id: "s9", label: "Footer" },
	];

//   console.log(invitado.codigo);

	return (
		<>
			<NavRight containerRef={containerRef} navSection={NAV_SECTIONS} />

			<main className="snap-container" id="snap" ref={containerRef}>
				<Hero />
				<Invitacion nombreInv={invitado.nombre} />
				<VideoInv />
				<Programa />
				<ProgramaCentral />
				<HomenajeLaborSlider />
				<HomenajeLabor />
				<Deportes />
				<RegistroQr codigo={invitado.codigo} />
				<Cierre />
				<Footer />
			</main>
		</>
	);
}