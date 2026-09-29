'use client';

import { useRef, useState } from 'react';
import ScrollHint from '@/components/ScrollHint';

// ID del video de YouTube (shorts ZnmQ_At33Cw)
const YOUTUBE_VIDEO_ID = 'ZnmQ_At33Cw';

// Parámetros de YouTube para quitar controles y personalizar
const YT_PARAMS = new URLSearchParams({
	autoplay: '1',
	mute: '1',
	controls: '0',          // sin controles
	modestbranding: '1',    // sin logo de YouTube
	rel: '0',               // sin videos relacionados
	playsinline: '1',       // reproducir inline en iOS
	loop: '1',              // loop
	playlist: YOUTUBE_VIDEO_ID, // necesario para loop
	iv_load_policy: '3',    // sin anotaciones
	disablekb: '1',         // sin teclado
	fs: '0',                // sin botón pantalla completa
	showinfo: '0',          // sin info del video
}).toString();

export default function VideoInv() {
	const [playing, setPlaying] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handlePlay = () => setPlaying(true);

	return (
		<section className="slide slide-video" id="s2b">
			<div className="video-halo" aria-hidden="true" />
			<div className="texture-dots" aria-hidden="true" />

			<div className="slide-inner video-inner">
				<div className="section-eyebrow">Mensaje del Gerente Regional</div>
				<h2 className="section-title">Palabras de Aniversario</h2>

				<div className="scroll-frame">
					<div className="scroll-frame__cap scroll-frame__cap--top" aria-hidden="true" />
					<div className="scroll-frame__cap scroll-frame__cap--bottom" aria-hidden="true" />

					<div className="scroll-frame__body">
						{/* Marco decorativo de esquinas */}
						<span className="scroll-corner scroll-corner--tl" aria-hidden="true" />
						<span className="scroll-corner scroll-corner--tr" aria-hidden="true" />
						<span className="scroll-corner scroll-corner--bl" aria-hidden="true" />
						<span className="scroll-corner scroll-corner--br" aria-hidden="true" />

						<div className="video-wrap">
							{/* Velo decorativo sobre el video */}
							<div className="video-vignette" aria-hidden="true" />
							<div className="video-grain" aria-hidden="true" />

							{/* Overlay de play — desaparece al hacer click */}
							{!playing && (
								<button
									type="button"
									className="video-play"
									onClick={handlePlay}
									aria-label="Reproducir mensaje del Gerente Regional"
								>
									<span className="video-play__ring" />
									<span className="video-play__icon">▶</span>
								</button>
							)}

							<iframe
								ref={iframeRef}
								className="video-iframe"
								src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?${YT_PARAMS}`}
								title="Mensaje del Gerente Regional - LXIX Aniversario GERESA"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen={false}
								frameBorder="0"
								loading="lazy"
							/>
						</div>
					</div>
				</div>

				<p className="video-caption">
					Un mensaje especial de nuestro Gerente Regional con motivo del{' '}
					<span className="destacado">LXIX Aniversario Institucional</span>.
				</p>
			</div>

			<ScrollHint />
		</section>
	);
}