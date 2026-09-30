export default function BtnQr() {
	return (
		<div className="goQR">
			<button 
				className="goQR__btn" 
				type="button" 
				aria-label="Escanear código QR"
				onClick={() => {  }}
			>
				<svg
					className="goQR__icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{/* Esquinas del escáner */}
					<path d="M4 8V5a1 1 0 0 1 1-1h3" />
					<path d="M16 4h3a1 1 0 0 1 1 1v3" />
					<path d="M20 16v3a1 1 0 0 1-1 1h-3" />
					<path d="M8 20H5a1 1 0 0 1-1-1v-3" />
					{/* Línea de escaneo */}
					<line x1="4" y1="12" x2="20" y2="12" />
				</svg>
			</button>
		</div>
	)
}
