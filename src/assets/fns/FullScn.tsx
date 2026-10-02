export async function toggleFullscreen(elemento?: HTMLElement): Promise<void> {
	if (typeof window === 'undefined') return;

	const doc = document as Document & {
		webkitFullscreenElement?: Element | null;
		mozFullScreenElement?: Element | null;
		msFullscreenElement?: Element | null;
		webkitExitFullscreen?: () => Promise<void> | void;
		mozCancelFullScreen?: () => Promise<void> | void;
		msExitFullscreen?: () => Promise<void> | void;
	};

	const el = (elemento ?? document.documentElement) as HTMLElement & {
		webkitRequestFullscreen?: () => Promise<void> | void;
		mozRequestFullScreen?: () => Promise<void> | void;
		msRequestFullscreen?: () => Promise<void> | void;
	};

	const activo = Boolean(
		doc.fullscreenElement ||
		doc.webkitFullscreenElement ||
		doc.mozFullScreenElement ||
		doc.msFullscreenElement
	);

	try {
		if (activo) {
			if (doc.exitFullscreen) {
				await doc.exitFullscreen();
			} else if (doc.webkitExitFullscreen) {
				await doc.webkitExitFullscreen();
			} else if (doc.mozCancelFullScreen) {
				await doc.mozCancelFullScreen();
			} else if (doc.msExitFullscreen) {
				await doc.msExitFullscreen();
			}
		} else {
			if (el.requestFullscreen) {
				await el.requestFullscreen();
			} else if (el.webkitRequestFullscreen) {
				await el.webkitRequestFullscreen();
			} else if (el.mozRequestFullScreen) {
				await el.mozRequestFullScreen();
			} else if (el.msRequestFullscreen) {
				await el.msRequestFullscreen();
			}
		}
	} catch {
		// ignorar
	}
}