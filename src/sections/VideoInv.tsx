'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollHint from '@/components/ScrollHint';

const YOUTUBE_VIDEO_ID = 'ehlHPiAx12Y';

declare global {
	interface Window {
		YT?: any;
		onYouTubeIframeAPIReady?: () => void;
	}
}

export default function VideoInv() {
	const sectionRef = useRef<HTMLElement>(null);
	const hostRef = useRef<HTMLDivElement>(null); // contenedor vacío controlado por React
	const playerRef = useRef<any>(null);
	const playerReadyRef = useRef(false);
	const isVisibleRef = useRef(false);

	const [apiReady, setApiReady] = useState(false);
	const [playing, setPlaying] = useState(false);

	// ---- 1) Cargar la API de YouTube una sola vez ----
	useEffect(() => {
		// Si ya está cargada, listo
		if (window.YT && window.YT.Player) {
			setApiReady(true);
			return;
		}

		// Callback global que YouTube invoca al terminar de cargar
		const prev = window.onYouTubeIframeAPIReady;
		window.onYouTubeIframeAPIReady = () => {
			prev?.();
			setApiReady(true);
		};

		// Inyectar el script solo si no existe
		if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
			const tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			tag.async = true;
			document.head.appendChild(tag);
		}
	}, []);

	// ---- 2) Crear el player cuando la API esté lista ----
	useEffect(() => {
		if (!apiReady) return;
		const host = hostRef.current;
		if (!host) return;

		// Div que YouTube reemplazará por el iframe (React no lo conoce)
		const mount = document.createElement('div');
		host.appendChild(mount);

		const player = new window.YT.Player(mount, {
			width: '100%',
			height: '100%',
			videoId: YOUTUBE_VIDEO_ID,
			playerVars: {
				autoplay: 0,
				controls: 0,
				modestbranding: 1,
				rel: 0,
				playsinline: 1,
				loop: 1,
				playlist: YOUTUBE_VIDEO_ID,
				iv_load_policy: 3,
				disablekb: 1,
				fs: 0,
			},
			events: {
				onReady: () => {
					playerReadyRef.current = true;
					// El iframe recupera la clase original para mantener el diseño
					try {
						player.getIframe()?.classList.add('video-iframe');
					} catch {
						// ignorar
					}
					// Si la sección ya está visible, reproducir
					if (isVisibleRef.current) {
						try {
							player.playVideo();
						} catch {
							// ignorar
						}
					}
				},
				onStateChange: (e: any) => {
					// 1 = playing, 2 = paused, 0 = ended
					if (e.data === 1) setPlaying(true);
					if (e.data === 2 || e.data === 0) setPlaying(false);
				},
			},
		});
		playerRef.current = player;

		return () => {
			playerReadyRef.current = false;
			playerRef.current = null;
			try {
				player.destroy();
			} catch {
				// ignorar
			}
			// Limpiar lo que YouTube haya dejado dentro del host
			host.innerHTML = '';
		};
	}, [apiReady]);

	// ---- 3) IntersectionObserver: play/pause según visibilidad ----
	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
				isVisibleRef.current = visible;

				const player = playerRef.current;
				if (!player || !playerReadyRef.current) return;

				try {
					if (visible) {
						player.playVideo();
					} else {
						player.pauseVideo();
					}
				} catch {
					// Evita errores si el iframe aún no está montado del todo
				}
			},
			{ threshold: [0, 0.5, 1] }
		);

		observer.observe(section);
		return () => observer.disconnect();
	}, []);

	// ---- 4) Fallback: click manual sobre el overlay ----
	const handleManualPlay = () => {
		const player = playerRef.current;
		if (!player || !playerReadyRef.current) return;
		try {
			player.playVideo();
		} catch {
			// ignorar
		}
	};

	return (
		<section ref={sectionRef} className="slide slide-video" id="s2b">
			<div className="video-halo" aria-hidden="true" />
			<div className="texture-dots" aria-hidden="true" />

			<div className="slide-inner video-inner">
				<div className="section-eyebrow titulo_vid">Invitacion</div>
				<h2 className="section-title">Director Ejecutivo de Inteligencia Sanitaria</h2>

				<div className="scroll-frame">
					<div className="scroll-frame__cap scroll-frame__cap--top" aria-hidden="true" />
					<div className="scroll-frame__cap scroll-frame__cap--bottom" aria-hidden="true" />

					<div className="scroll-frame__body">
						<span className="scroll-corner scroll-corner--tl" aria-hidden="true" />
						<span className="scroll-corner scroll-corner--tr" aria-hidden="true" />
						<span className="scroll-corner scroll-corner--bl" aria-hidden="true" />
						<span className="scroll-corner scroll-corner--br" aria-hidden="true" />

						<div className="video-wrap">
							<div className="video-vignette" aria-hidden="true" />
							<div className="video-grain" aria-hidden="true" />

							{/* Siempre montado: solo se oculta, nunca se desmonta */}
							<button
								type="button"
								className="video-play"
								onClick={handleManualPlay}
								aria-label="Reproducir mensaje del Gerente Regional"
								aria-hidden={playing}
								tabIndex={playing ? -1 : 0}
								style={playing ? { display: 'none' } : undefined}
							>
								<span className="video-play__ring" />
								<span className="video-play__icon">▶</span>
							</button>

							{/* React solo ve este div vacío; YouTube trabaja dentro */}
							<div ref={hostRef} style={{ display: 'contents' }} />
						</div>
					</div>
				</div>

				<p className="video-caption">
					<span className="destacado">LXIX Aniversario Institucional</span>.
				</p>
			</div>

			<ScrollHint />
		</section>
	);
}