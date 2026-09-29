export default function Footer() {

	const FOOTER_MENSAJE = '"Unidos por la salud y el bienestar de nuestro pueblo"';
	const DEFAULT_PHOTO = '/photo.jpg';

	return (
		<section className="slide slide-footer" id="s9">
			<div className="slide-inner">
				<div className="footer-logo">GERESA</div>

				<div className="footer-info">
					Gerencia Regional de Salud Cusco
					<br />
					Dirección Ejecutiva de Inteligencia Sanitaria
					<br />
					Cusco, Octubre de 2026
				</div>

				<div className="footer-fotos">
					{[0, 1, 2].map((i) => (
						<div key={i}>
							<img src={DEFAULT_PHOTO} alt="" />
						</div>
					))}
				</div>

				<div className="footer-mensaje">{FOOTER_MENSAJE}</div>

				<div className="footer-copy">© 2026 GERESA Cusco</div>
			</div>
		</section>
	)
}
