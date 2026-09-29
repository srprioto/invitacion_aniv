export default function Footer() {

	// const DEFAULT_PHOTO = '/images/SrMilagros.jpg';

	return (
		<section className="slide slide-footer" id="s9">
			<div className="slide-inner">
				<div className="footer-logo">GERESA</div>

				<div className="footer-info">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text
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
