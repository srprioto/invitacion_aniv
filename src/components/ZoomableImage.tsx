'use client';

import { useState, useRef, ReactNode } from 'react';

interface ZoomableImageProps {
	children: ReactNode;
	src: string;
	alt?: string;
}

export default function ZoomableImage({ children, src, alt = '' }: ZoomableImageProps) {
	const [open, setOpen] = useState(false);
	const [zoom, setZoom] = useState(1);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

	const reset = () => {
		setZoom(1);
		setOffset({ x: 0, y: 0 });
	};

	const close = () => {
		setOpen(false);
		reset();
	};

	const onWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		const next = Math.min(5, Math.max(1, zoom + (e.deltaY < 0 ? 0.2 : -0.2)));
		setZoom(next);
		if (next === 1) setOffset({ x: 0, y: 0 });
	};

	const onMouseDown = (e: React.MouseEvent) => {
		if (zoom <= 1) return;
		dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (!dragStart.current) return;
		setOffset({
			x: dragStart.current.ox + (e.clientX - dragStart.current.x),
			y: dragStart.current.oy + (e.clientY - dragStart.current.y),
		});
	};

	const onMouseUp = () => {
		dragStart.current = null;
	};

	// touch: pinch + drag
	const touchStart = useRef<{ x: number; y: number; ox: number; oy: number; dist: number; zoom: number } | null>(null);

	const getDist = (t: React.TouchList) => {
		const a = t[0], b = t[1];
		return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
	};

	const onTouchStart = (e: React.TouchEvent) => {
		if (e.touches.length === 2) {
			touchStart.current = {
				x: 0, y: 0, ox: offset.x, oy: offset.y,
				dist: getDist(e.touches), zoom,
			};
		} else if (e.touches.length === 1 && zoom > 1) {
			touchStart.current = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
				ox: offset.x, oy: offset.y,
				dist: 0, zoom,
			};
		}
	};

	const onTouchMove = (e: React.TouchEvent) => {
		if (!touchStart.current) return;
		const s = touchStart.current;

		if (e.touches.length === 2 && s.dist > 0) {
			const ratio = getDist(e.touches) / s.dist;
			const next = Math.min(5, Math.max(1, s.zoom * ratio));
			setZoom(next);
		} else if (e.touches.length === 1 && zoom > 1) {
			setOffset({
				x: s.ox + (e.touches[0].clientX - s.x),
				y: s.oy + (e.touches[0].clientY - s.y),
			});
		}
	};

	const onTouchEnd = () => {
		touchStart.current = null;
	};

	return (
		<>
			<div onClick={() => setOpen(true)} style={{ cursor: 'zoom-in' }}>
				{children}
			</div>

			{open && (
				<div
					onClick={close}
					style={{
						position: 'fixed',
						inset: 0,
						zIndex: 999,
						background: 'rgba(0,0,0,0.92)',
						display: 'grid',
						placeItems: 'center',
						overflow: 'hidden',
						cursor: zoom > 1 ? 'grab' : 'zoom-out',
						touchAction: 'none',
					}}
					onWheel={onWheel}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onMouseLeave={onMouseUp}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							close();
						}}
						aria-label="Cerrar"
						style={{
							position: 'fixed',
							top: '16px',
							right: '16px',
							zIndex: 1000,
							width: '40px',
							height: '40px',
							borderRadius: '50%',
							border: '1px solid rgba(201, 169, 97, 0.55)',
							background: 'rgba(0,0,0,0.6)',
							color: '#faf8f3',
							fontSize: '1.4rem',
							lineHeight: 1,
							display: 'grid',
							placeItems: 'center',
							cursor: 'pointer',
							backdropFilter: 'blur(6px)',
						}}
					>
						×
					</button>
					<img
						src={src}
						alt={alt}
						draggable={false}
						onClick={(e) => e.stopPropagation()}
						style={{
							maxWidth: 'none',
							transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
							transition: dragStart.current || touchStart.current ? 'none' : 'transform 0.2s ease',
							border: '3px solid rgba(201, 169, 97, 0.85)',
							borderRadius: '12px',
							boxShadow: '0 0 60px rgba(201, 169, 97, 0.35), 0 20px 60px rgba(0,0,0,0.6)',
							userSelect: 'none',
						}}
					/>
				</div>
			)}
		</>
	);
}