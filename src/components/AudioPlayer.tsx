'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
	src: string;
	volume?: number;   // 1 a 100
	loop?: boolean;
};

export default function AudioPlayer({ src, volume = 60, loop = true }: Props) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [playing, setPlaying] = useState(false);

	// Normaliza el volumen: 1-100 -> 0.0-1.0
	const volumenNormalizado = Math.min(100, Math.max(1, volume)) / 100;

	// Autoplay al montar
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.volume = volumenNormalizado;
		audio.loop = loop;

		const tryPlay = async () => {
			try {
				await audio.play();
				setPlaying(true);
			} catch {
				// Autoplay bloqueado por el navegador
				setPlaying(false);
			}
		};

		tryPlay();
	}, [volumenNormalizado, loop]);

	const handlePlay = async () => {
		const audio = audioRef.current;
		if (!audio) return;
		try {
			await audio.play();
			setPlaying(true);
		} catch {
			setPlaying(false);
		}
	};

	const handleStop = () => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.pause();
		audio.currentTime = 0;
		setPlaying(false);
	};

	return (
		<div className="audio-player">
			<audio ref={audioRef} src={src} preload="auto" />

			{!playing ? (
				<button
					type="button"
					className="audio-player__btn"
					onClick={handlePlay}
					aria-label="Reproducir audio"
				>
					▶
				</button>
			) : (
				<button
					type="button"
					className="audio-player__btn"
					onClick={handleStop}
					aria-label="Detener audio"
				>
					■
				</button>
			)}
		</div>
	);
}