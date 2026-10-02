import BtnQr from "@/components/BtnQr";
import LazyMount from "@/components/LazyMount";
import ScrollHint from "@/components/ScrollHint";

export default function Hero() {

	const DEFAULT_PHOTO = '/images/SrMilagros3.jpeg';
	const logoImg = '/images/logoGeresa.png';

	const handleClick = () => {
		const target = document.getElementById("s7"); // RegistroQr
		if (!target) return;

		target.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<section className="slide slide-hero" id="s1">
			<div className="texture-dots" />

			<div className="hero-top">
				<LazyMount>
					<img src={logoImg} alt="" />
				</LazyMount>
				<div className="logo-geresa">GERESA CUSCO</div>
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
					<LazyMount><img src={DEFAULT_PHOTO} alt="Señor de los Milagros" /></LazyMount>
					<div className="hero-photo-overlay" />
				</div>
			</div>

			<div className="hero-footer">
				Gerencia Regional de Salud Cusco <br /> Dirección Ejecutiva de Inteligencia Sanitaria
			</div>

			<BtnQr onClic={handleClick} />

			<ScrollHint />
		</section>
	)
}
