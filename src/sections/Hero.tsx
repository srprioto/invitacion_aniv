import ScrollHint from "@/components/ScrollHint";

export default function Hero() {

	const DEFAULT_PHOTO = '/images/SrMilagros.jpg';
	const logoImg = '/images/logoGeresa.png';

	return (
		<section className="slide slide-hero" id="s1">
			<div className="texture-dots" />

			<div className="hero-top">
				<img src={logoImg} alt="" />
				<div className="logo-geresa">GERESA Cusco</div>
				<div className="hero-year">2026</div>
			</div>

			<div className="hero-grid">
				<div className="hero-center">
					<div className="section-eyebrow">Invitación Institucional</div>
					<h1 className="hero-title">
						LXIX Aniversario
						<br />
						Institucional
					</h1>
					<div className="hero-divider" />
					<p className="hero-subtitle">y Homenaje al Señor de los Milagros</p>
				</div>

				<div className="hero-photo">
					<img src={DEFAULT_PHOTO} alt="Señor de los Milagros" />
					<div className="hero-photo-overlay" />
				</div>
			</div>

			<div className="hero-footer">
				Gerencia Regional de Salud Cusco · Dirección Ejecutiva de Inteligencia Sanitaria
			</div>

<div className="goQR">
  <button className="goQR__btn" type="button" aria-label="Escanear código QR">
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

			<ScrollHint />
		</section>
	)
}
