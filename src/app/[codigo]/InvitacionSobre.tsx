'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentProps } from 'react';
import { Cinzel, Dancing_Script, Montserrat } from 'next/font/google';
import InvitacionClient from './InvitacionClient';


import { useAssetPreload } from '@/components/Preloader';
import LazyMount from '@/components/LazyMount';

// ---------- Textos editables ----------
const TEXTOS = {
	eyebrow: 'Invitación Especial',
	titulo: 'LXIX Aniversario Institucional',
	cartaCabecera: 'BIENVENIDO',
	cartaTitulo: 'Estás invitado',
	cartaFrase: 'Un mensaje especial te espera…',
	cartaDestinoLabel: 'Destino',
	cartaDestino: 'Tu invitación',
	cargando: 'Cargando',
	hint: 'Toca el sello',
};

// ---------- Fuentes del sobre (puedes cambiarlas por las que ya uses) ----------
const cinzel = Cinzel({
	subsets: ['latin'],
	weight: ['500', '700'],
	variable: '--font-sobre-title',
	display: 'swap',
});
const dancing = Dancing_Script({
	subsets: ['latin'],
	weight: ['600', '700'],
	variable: '--font-sobre-script',
	display: 'swap',
});
const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
	variable: '--font-sobre-body',
	display: 'swap',
});

type Props = {
	invitado: ComponentProps<typeof InvitacionClient>['invitado'];
	images?: string[];
	videos?: string[];
	fonts?: string[];
	cacheKey?: string;
};

/**
 * closed    → sobre cerrado (cargando o esperando el toque)
 * opening   → solapa abriéndose y carta saliendo
 * expanding → carta creciendo a pantalla completa
 * revealed  → la app ya está montada debajo; el sobre se desvanece
 * done      → el sobre se desmonta
 */
type Stage = 'closed' | 'opening' | 'expanding' | 'revealed' | 'done';

export default function InvitacionSobre({
	invitado,
	images,
	videos,
	fonts,
	cacheKey,
}: Props) {
	const { phase, progress, label } = useAssetPreload({
		images,
		videos,
		fonts,
		cacheKey,
	});

	const [stage, setStage] = useState<Stage>('closed');
	const [fecha, setFecha] = useState('');

	const isReady = phase === 'ready';
	const isOpen = stage !== 'closed';
	const isFullscreen = stage === 'expanding' || stage === 'revealed';
	const appMounted = stage === 'revealed' || stage === 'done';

	// Fecha en cliente (evita diferencias de hidratación)
	useEffect(() => {
		setFecha(
			new Date()
				.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
				.toUpperCase()
		);
	}, []);

	// Avance de la secuencia
	useEffect(() => {
		if (stage === 'opening') {
			const t = setTimeout(() => setStage('expanding'), 850);
			return () => clearTimeout(t);
		}
		if (stage === 'expanding') {
			// Respaldo por si animationend no se dispara (p. ej. reduced motion)
			const t = setTimeout(() => setStage('revealed'), 1500);
			return () => clearTimeout(t);
		}
		if (stage === 'revealed') {
			const t = setTimeout(() => setStage('done'), 1000);
			return () => clearTimeout(t);
		}
	}, [stage]);

	const handleOpen = () => {
		if (!isReady || stage !== 'closed') return;
		setStage('opening');
	};

	const handleLetterAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
		if (e.target !== e.currentTarget || e.animationName !== 'sobre-zoom') return;
		setStage((s) => (s === 'expanding' ? 'revealed' : s));
	};

	const logoImg = '/images/logoGeresa.png';

	return (
		<>
			{/* Nivel 2: la app. Se monta solo cuando el sobre ya la cubre por completo */}
			{appMounted && <InvitacionClient invitado={invitado} />}

			{/* Nivel 1: el sobre */}
			{stage !== 'done' && (
				<div
					className={[
						'sobre-screen',
						cinzel.variable,
						dancing.variable,
						montserrat.variable,
						stage === 'revealed' ? 'is-leaving' : '',
					].join(' ')}
				>
					<Particles />

					<header className={`sobre-header ${isOpen ? 'is-hidden' : ''}`}>
						<span className="sobre-header__eyebrow">{TEXTOS.eyebrow}</span>
						<h1 className="sobre-header__title">{TEXTOS.titulo}</h1>
					</header>

					<div
						className={[
							'sobre-envelope',
							isOpen ? 'is-open' : '',
							isReady && !isOpen ? 'is-clickable' : '',
						].join(' ')}
						onClick={handleOpen}
					>
						<div className="sobre-back" />

						{/* Carta */}
						<div
							className={`sobre-letter ${isFullscreen ? 'is-fullscreen' : ''}`}
							onAnimationEnd={handleLetterAnimationEnd}
						>

							
							<div className="hero-top mt30">
								<LazyMount>
									<img src={logoImg} alt="" />
								</LazyMount>
								<div className="logo-geresa">GERESA CUSCO</div>
								<div className="hero-year">2026</div>
							</div>

							{/* <div className="sobre-letter__frame">
								<div className="sobre-letter__top">
									<span className="sobre-letter__top-title">
										<span className="sobre-letter__spark">✦</span> {TEXTOS.cartaCabecera}
									</span>
									<span className="sobre-letter__date">{fecha}</span>
								</div>

								<div className="sobre-letter__body">
									<h2 className="sobre-letter__title">{TEXTOS.cartaTitulo}</h2>
									<p className="sobre-letter__quote">{TEXTOS.cartaFrase}</p>
								</div>

								<div className="sobre-letter__bottom">
									<div>
										<span className="sobre-letter__dest-label">{TEXTOS.cartaDestinoLabel}</span>
										<span className="sobre-letter__dest">{TEXTOS.cartaDestino}</span>
									</div>
									<span className="sobre-letter__arrow">→</span>
								</div>
							</div> */}
						</div>

						{/* Solapas */}
						<div className="sobre-flap sobre-flap--left" />
						<div className="sobre-flap sobre-flap--right" />
						<div className="sobre-flap sobre-flap--bottom" />
						<div className="sobre-flap sobre-flap--top" />

						{/* Sello (botón): oculto mientras carga */}
						<button
							type="button"
							className={`sobre-seal ${isReady && !isOpen ? 'is-visible' : ''}`}
							disabled={!isReady || isOpen}
							aria-label="Abrir invitación"
							title="Toca el sello para abrir"
						>
							<span className="sobre-seal__inner">
								<img src={logoImg} alt="" />
							</span>
						</button>

						{/* Zona de estado: carga → "Toca el sello" */}
						<div className={`sobre-status ${isOpen ? 'is-hidden' : ''}`} aria-live="polite">
							<div
								className={`sobre-status__loading ${phase === 'loading' ? 'is-active' : ''}`}
							>
								<div className="sobre-status__label">{label}</div>
								<div
									className="sobre-status__bar"
									role="progressbar"
									aria-label={TEXTOS.cargando}
									aria-valuemin={0}
									aria-valuemax={100}
									aria-valuenow={progress}
								>
									<div className="sobre-status__bar-fill" style={{ width: `${progress}%` }} />
								</div>
								<div className="sobre-status__pct">{progress}%</div>
							</div>

							<div className={`sobre-status__hint ${isReady ? 'is-active' : ''}`}>
								{TEXTOS.hint}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

/* ---------- Partículas de fondo ---------- */
function Particles() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		const make = (startAnywhere: boolean) => ({
			x: Math.random() * canvas.width,
			y: startAnywhere
				? Math.random() * canvas.height
				: canvas.height + 10,
			size: Math.random() * 2.5 + 1,
			speedY: Math.random() * 0.7 + 0.2,
			speedX: Math.random() * 0.4 - 0.2,
			opacity: Math.random() * 0.6 + 0.2,
			color: Math.random() > 0.5 ? '#fcd34d' : '#a855f7',
		});

		const particles = Array.from({ length: 35 }, () => make(true));
		let raf = 0;

		const tick = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			particles.forEach((p, i) => {
				p.y -= p.speedY;
				p.x += p.speedX;
				if (p.y < -10) particles[i] = make(false);

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = p.color;
				ctx.globalAlpha = p.opacity;
				ctx.shadowBlur = 6;
				ctx.shadowColor = p.color;
				ctx.fill();
				ctx.globalAlpha = 1;
				ctx.shadowBlur = 0;
			});
			raf = requestAnimationFrame(tick);
		};
		tick();

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
		};
	}, []);

	return <canvas ref={canvasRef} className="sobre-particles" aria-hidden="true" />;
}