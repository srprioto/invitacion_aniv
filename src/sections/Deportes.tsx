'use client';

import { useState, useEffect, useRef } from 'react';
import ScrollHint from "@/components/ScrollHint";

const copaGeresa = [
	'/images/campeonato/1.jpg',
	'/images/campeonato/2.jpg',
	'/images/campeonato/3.jpg',
	'/images/campeonato/4.jpg',
	'/images/campeonato/5.jpg',
	'/images/campeonato/6.jpg',
	'/images/campeonato/7.jpg',
	'/images/campeonato/8.jpg',
	'/images/campeonato/9.jpg',
	'/images/campeonato/10.jpg',
	'/images/campeonato/11.jpg',
	'/images/campeonato/12.jpg',
];

const srMilagros = [
	'/images/novena/1.jpeg',
	'/images/novena/2.jpeg',
	'/images/novena/3.jpeg',
	'/images/novena/4.jpeg',
	'/images/novena/5.jpeg',
	'/images/novena/6.jpeg',
	'/images/novena/7.jpeg',
	'/images/novena/8.jpeg',
	'/images/novena/9.jpeg',
	'/images/novena/10.jpeg',

];

const concurDanzas = [
	'/images/danza/1.jpeg',
	'/images/danza/2.jpeg',
	'/images/danza/3.jpeg',
	'/images/danza/4.jpeg',
];

const izamBandera = [
	'/images/izam/izam.jpeg',
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

const AUTOPLAY_INTERVAL = 3000;
const RESUME_DELAY = 3000;

export default function Deportes() {
	const [modalAbierto, setModalAbierto] = useState<ModalKey>(null);
	const [imgActual, setImgActual] = useState(0);
	const [paused, setPaused] = useState(false);

	const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const data = modalAbierto ? MODALES[modalAbierto] : null;

	const abrirModal = (key: ModalKey) => {
		setModalAbierto(key);
		setImgActual(0);
		setPaused(false);
	};

	const cerrarModal = () => {
		setModalAbierto(null);
		setImgActual(0);
		setPaused(false);
		if (resumeTimer.current) {
			clearTimeout(resumeTimer.current);
			resumeTimer.current = null;
		}
	};

	// Pausa temporal con auto-reanudación
	const pausarTemporal = () => {
		setPaused(true);
		if (resumeTimer.current) clearTimeout(resumeTimer.current);
		resumeTimer.current = setTimeout(() => setPaused(false), RESUME_DELAY);
	};

	// ============ AUTOPLAY ============
	useEffect(() => {
		if (!modalAbierto || !data) return;
		if (paused) return;

		const timer = setInterval(() => {
			setImgActual((i) => (i + 1) % data.imagenes.length);
		}, AUTOPLAY_INTERVAL);

		return () => clearInterval(timer);
	}, [modalAbierto, data, paused]);

	// ============ ESC + bloquear scroll de fondo ============
	useEffect(() => {
		if (!modalAbierto) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') cerrarModal();
		};

		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [modalAbierto]);

	// ============ SWIPE TÁCTIL ============
	const touchStartX = useRef<number | null>(null);

	const onTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const onTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null || !data) return;

		const delta = e.changedTouches[0].clientX - touchStartX.current;
		const threshold = 40;

		if (Math.abs(delta) > threshold) {
			if (delta < 0) {
				setImgActual((i) => (i + 1) % data.imagenes.length);
			} else {
				setImgActual((i) => (i - 1 + data.imagenes.length) % data.imagenes.length);
			}
			pausarTemporal();
		}

		touchStartX.current = null;
	};

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

						<div
							className="modal-carousel"
							onMouseEnter={pausarTemporal}
							onTouchStart={onTouchStart}
							onTouchEnd={onTouchEnd}
						>
							<div className="modal-image-wrap">
								<img
									key={data.imagenes[imgActual]}
									src={data.imagenes[imgActual]}
									alt={`${data.titulo} - imagen ${imgActual + 1}`}
									className="modal-image"
								/>

								<div className="modal-counter">
									{imgActual + 1} / {data.imagenes.length}
								</div>
							</div>
						</div>

						<div className="modal-dots">
							{data.imagenes.map((_, i) => (
								<button
									key={i}
									type="button"
									className={`modal-dot ${i === imgActual ? 'is-active' : ''}`}
									onClick={() => {
										setImgActual(i);
										pausarTemporal();
									}}
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