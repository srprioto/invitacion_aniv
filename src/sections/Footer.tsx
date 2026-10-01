export default function Footer() {

	// const DEFAULT_PHOTO = '/images/SrMilagros.jpg';

	return (
		<section className="slide slide-footer" id="s9">
			<div className="slide-inner">
				<div className="footer-logo">GERESA</div>

				<div className="footer-info">
					Señor de los Milagros, fuente de consuelo y esperanza, ante ti nos postramos con humildad y devoción. Tú, que conoces nuestros corazones y nuestras luchas, guíanos con tu infinita misericordia por el camino de la fe y la paz. Que tu sagrada imagen nos cubra y proteja, alejando de nosotros todo mal, y que, bajo tu bendición, encontremos siempre el refugio y el amor que solo tú puedes otorgar.
					Amén.
				</div>

				{/* <div className="footer-fotos">
					{[0, 1, 2].map((i) => (
						<div key={i}>
							<img src={DEFAULT_PHOTO} alt="" />
						</div>
					))}
				</div> */}

				<div className="footer-mensaje">"Unidos por la salud y el bienestar de nuestro pueblo"</div>

				<div className="footer-copy">© 2026 GERESA Cusco</div>
			</div>
		</section>
	)
}
