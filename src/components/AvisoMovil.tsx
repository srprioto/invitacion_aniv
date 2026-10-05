'use client';

import styles from './AvisoMovil.module.scss';

interface AvisoMovilProps {
	onClose?: () => void;
}

export default function AvisoMovil({ onClose }: AvisoMovilProps) {
	return (
		<div className={styles.aviso}>
			<button
				type="button"
				className={styles.aviso__cerrar}
				onClick={onClose}
				aria-label="Cerrar aviso"
			>
				×
			</button>

			<div className={styles.aviso__icono}>
				{/* SVG de celular */}
				<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect
						x="6"
						y="2"
						width="12"
						height="20"
						rx="2.5"
						stroke="currentColor"
						strokeWidth="1.6"
					/>
					<line
						x1="10.5"
						y1="5"
						x2="13.5"
						y2="5"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<circle cx="12" cy="18.5" r="1" fill="currentColor" />
				</svg>

				<span className={styles.aviso__pulso} />
			</div>

			<h2 className={styles.aviso__titulo}>
				Revisa tu invitación en tu celular
			</h2>

			<p className={styles.aviso__texto}>
				Para vivir la experiencia completa del{' '}
				<span>LXIX Aniversario Institucional</span>, abre este
				enlace desde tu teléfono.
			</p>

			<div className={styles.aviso__divider} aria-hidden="true" />

			<p className={styles.aviso__footer}>
				Geresa Cusco · 2026
			</p>
		</div>
	);
}