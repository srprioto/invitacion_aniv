'use client';

import { useState, useEffect } from 'react';
import ScrollHint from "@/components/ScrollHint";

const DEFAULT_PHOTO = '/images/SrMilagros.jpg';

const copaGeresa = [
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
];

const srMilagros = [
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
];

const concurDanzas = [
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
];

const izamBandera = [
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
	'/images/SrMilagros.jpg',
];

type ModalKey = 'copa' | 'milagros' | 'danzas' | 'bandera' | null;

interface ModalData {
	key: ModalKey;
	titulo: string;
	subtitulo: string;
	imagenes: string[];
}

const MODALES: Record<string, ModalData> = {
	copa: {
		key: 'copa',
		titulo: 'Campeonato "Copa GERESA 2026"',
		subtitulo: 'Confraternidad institucional',
		imagenes: copaGeresa,
	},
	milagros: {
		key: 'milagros',
		titulo: 'Novena del Señor de los Milagros',
		subtitulo: 'Celebración comunitaria',
		imagenes: srMilagros,
	},
	danzas: {
		key: 'danzas',
		titulo: 'Concurso de Danzas',
		subtitulo: 'Participación institucional',
		imagenes: concurDanzas,
	},
	bandera: {
		key: 'bandera',
		titulo: 'Izamiento del Pabellón',
		subtitulo: 'Plaza de Armas del Cusco',
		imagenes: izamBandera,
	},
};

export default function Deportes() {
	const [modalAbierto, setModalAbierto] = useState<ModalKey>(null);
	const [imgActual, setImgActual] = useState(0);

	const abrirModal = (key: ModalKey) => {
		setModalAbierto(key);
		setImgActual(0);
	};

	const cerrarModal = () => {
		setModalAbierto(null);
		setImgActual(0);
	};

	const data = modalAbierto ? MODALES[modalAbierto] : null;

	// Navegación del carrusel
	const siguiente = () => {
		if (!data) return;
		setImgActual((i) => (i + 1) % data.imagenes.length);
	};

	const anterior = () => {
		if (!data) return;
		setImgActual((i) => (i - 1 + data.imagenes.length) % data.imagenes.length);
	};

	// Cerrar con Escape + bloquear scroll de fondo
	useEffect(() => {
		if (!modalAbierto) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') cerrarModal();
			if (e.key === 'ArrowRight') siguiente();
			if (e.key === 'ArrowLeft') anterior();
		};

		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [modalAbierto, data]);

	return (
		<section className="slide slide-deportes" id="s6">
			<div className="slide-inner">
				<div className="section-eyebrow">Actividades por el Aniversario</div>
				<h2 className="section-title">Juegos Deportivos y Actividades</h2>

				<div className="deportes-grid">

					<article className="deporte-card" onClick={() => abrirModal('copa')} role="button" tabIndex={0}>
						<div className="deporte-card__header">
							<span className="deporte-icon" aria-hidden="true">⚽</span>
							<span className="deporte-fecha">21 Ago – 02 Oct</span>
						</div>
						<h4 className="deporte-titulo">Campeonato "Copa GERESA 2026"</h4>
						<p className="deporte-detalle">Confraternidad institucional</p>
						<span className="deporte-card__line" aria-hidden="true" />
					</article>

					<article className="deporte-card" onClick={() => abrirModal('milagros')} role="button" tabIndex={0}>
						<div className="deporte-card__header">
							<span className="deporte-icon" aria-hidden="true">🙏</span>
							<span className="deporte-fecha">24 Sep – 06 Oct</span>
						</div>
						<h4 className="deporte-titulo">Novena del Señor de los Milagros</h4>
						<p className="deporte-detalle">Celebración comunitaria</p>
						<span className="deporte-card__line" aria-hidden="true" />
					</article>

					<article className="deporte-card" onClick={() => abrirModal('danzas')} role="button" tabIndex={0}>
						<div className="deporte-card__header">
							<span className="deporte-icon" aria-hidden="true">💃</span>
							<span className="deporte-fecha">06 Oct · 13:00</span>
						</div>
						<h4 className="deporte-titulo">Concurso de Danzas</h4>
						<p className="deporte-detalle">Participación institucional</p>
						<span className="deporte-card__line" aria-hidden="true" />
					</article>

					<article className="deporte-card" onClick={() => abrirModal('bandera')} role="button" tabIndex={0}>
						<div className="deporte-card__header">
							<span className="deporte-icon" aria-hidden="true">🇵🇪</span>
							<span className="deporte-fecha">11 Oct · 08:30</span>
						</div>
						<h4 className="deporte-titulo">Izamiento del Pabellón</h4>
						<p className="deporte-detalle">Plaza de Armas del Cusco</p>
						<span className="deporte-card__line" aria-hidden="true" />
					</article>

				</div>

				<div className="foto-deportiva">
					<img src={DEFAULT_PHOTO} alt="Equipo deportivo GERESA" />
					<div className="foto-deportiva__overlay" aria-hidden="true" />
					<div className="foto-deportiva__caption">
						<span className="foto-deportiva__eyebrow">Confraternidad</span>
						<span className="foto-deportiva__title">Copa GERESA 2026</span>
					</div>
				</div>
			</div>

			{/* ============ MODAL ============ */}
			{data && (
				<div
					className="modal-overlay"
					onClick={cerrarModal}
					role="dialog"
					aria-modal="true"
					aria-label={data.titulo}
				>
					<div className="modal-card" onClick={(e) => e.stopPropagation()}>
						<button
							type="button"
							className="modal-close"
							onClick={cerrarModal}
							aria-label="Cerrar"
						>
							×
						</button>

						<div className="modal-header">
							<div className="modal-eyebrow">{data.subtitulo}</div>
							<h3 className="modal-title">{data.titulo}</h3>
							<div className="modal-divider" aria-hidden="true">
								<i /><b>◆</b><i />
							</div>
						</div>

						<div className="modal-carousel">
							<button
								type="button"
								className="modal-nav modal-nav--prev"
								onClick={anterior}
								aria-label="Imagen anterior"
							>
								‹
							</button>

							<div className="modal-image-wrap">
								<img
									src={data.imagenes[imgActual]}
									alt={`${data.titulo} - imagen ${imgActual + 1}`}
									className="modal-image"
								/>
							</div>

							<button
								type="button"
								className="modal-nav modal-nav--next"
								onClick={siguiente}
								aria-label="Imagen siguiente"
							>
								›
							</button>

							<div className="modal-counter">
								{imgActual + 1} / {data.imagenes.length}
							</div>
						</div>

						<div className="modal-dots">
							{data.imagenes.map((_, i) => (
								<button
									key={i}
									type="button"
									className={`modal-dot ${i === imgActual ? 'is-active' : ''}`}
									onClick={() => setImgActual(i)}
									aria-label={`Ir a imagen ${i + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			)}

			<ScrollHint />
		</section>
	);
}