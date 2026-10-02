'use client';

import { useEffect, useState } from 'react';

export type PreloadPhase = 'checking' | 'loading' | 'ready';

type Options = {
	images?: string[];
	videos?: string[];
	fonts?: string[];
	minDuration?: number; // ms mínimos de carga visible
	maxDuration?: number; // ms máximos antes de forzar el fin
	cacheKey?: string; // clave de sessionStorage
};

const LABELS = [
	'Preparando tu invitación',
	'Cargando imágenes',
	'Afinando los últimos detalles',
];

function readCache(key: string) {
	try {
		return sessionStorage.getItem(key) === '1';
	} catch {
		return false;
	}
}

function writeCache(key: string) {
	try {
		sessionStorage.setItem(key, '1');
	} catch {
		// ignorar (modo privado, etc.)
	}
}

/**
 * Misma lógica del Preloader (imágenes, fuentes, videos, progreso, tiempos y
 * caché de sesión), pero sin pintar nada: devuelve el estado para que el sobre
 * muestre la carga donde corresponda.
 *
 * phase:
 *  - 'checking': aún no sabemos si hay caché (primer render, igual en servidor y cliente)
 *  - 'loading' : cargando assets
 *  - 'ready'   : todo listo
 */
export function useAssetPreload({
	images = [],
	videos = [],
	fonts = [],
	minDuration = 900,
	maxDuration = 15000,
	cacheKey = 'preloader-done',
}: Options) {
	const [phase, setPhase] = useState<PreloadPhase>('checking');
	const [progress, setProgress] = useState(0);
	const [label, setLabel] = useState(LABELS[0]);

	// Claves estables para no relanzar el efecto si el array cambia de referencia
	const imagesKey = JSON.stringify(images);
	const videosKey = JSON.stringify(videos);
	const fontsKey = JSON.stringify(fonts);

	useEffect(() => {
		// Ya cargó en esta sesión: saltar la carga
		if (readCache(cacheKey)) {
			setProgress(100);
			setPhase('ready');
			return;
		}

		setPhase('loading');

		let cancelado = false;
		let finished = false;
		const start = Date.now();

		const imgs = Array.from(new Set<string>(JSON.parse(imagesKey)));
		const vids = Array.from(new Set<string>(JSON.parse(videosKey)));
		const fnts = Array.from(new Set<string>(JSON.parse(fontsKey)));

		const tasks: Promise<void>[] = [];

		// ---- Imágenes ----
		imgs.forEach((src) => {
			tasks.push(
				new Promise<void>((res) => {
					const img = new Image();
					img.onload = () => res();
					img.onerror = () => res();
					img.src = src;
				})
			);
		});

		// ---- Fuentes ----
		fnts.forEach((src) => {
			tasks.push(
				new Promise<void>((res) => {
					if (document.head.querySelector(`link[rel="preload"][href="${src}"]`)) {
						res();
						return;
					}
					const link = document.createElement('link');
					link.rel = 'preload';
					link.as = 'font';
					link.type = 'font/woff2';
					link.href = src;
					link.crossOrigin = 'anonymous';
					link.onload = () => res();
					link.onerror = () => res();
					document.head.appendChild(link);
				})
			);
		});

		// ---- Videos ----
		vids.forEach((src) => {
			tasks.push(
				fetch(src, { cache: 'force-cache' })
					.then(() => undefined)
					.catch(() => undefined)
			);
		});

		// ---- Etiquetas rotativas ----
		let labelIdx = 0;
		const labelTimer = setInterval(() => {
			labelIdx = (labelIdx + 1) % LABELS.length;
			if (!cancelado) setLabel(LABELS[labelIdx]);
		}, 2200);

		// ---- Progreso ----
		const total = tasks.length || 1;
		let completed = 0;
		tasks.forEach((t) => {
			t.then(() => {
				completed++;
				if (!cancelado) setProgress(Math.round((completed / total) * 100));
			});
		});

		// ---- Cierre ----
		const finish = () => {
			if (cancelado || finished) return;
			finished = true;
			writeCache(cacheKey);
			setProgress(100);
			setPhase('ready');
		};

		let finishTimer: ReturnType<typeof setTimeout> | undefined;
		Promise.all(tasks).then(() => {
			if (cancelado) return;
			const remaining = Math.max(0, minDuration - (Date.now() - start));
			finishTimer = setTimeout(finish, remaining);
		});

		// ---- Seguridad ----
		const safety = setTimeout(finish, maxDuration);

		return () => {
			cancelado = true;
			clearInterval(labelTimer);
			clearTimeout(safety);
			if (finishTimer) clearTimeout(finishTimer);
		};
	}, [imagesKey, videosKey, fontsKey, minDuration, maxDuration, cacheKey]);

	return { phase, progress, label };
}