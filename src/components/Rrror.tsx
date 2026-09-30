export default function Rrror() {

	const logoImg = '/images/logoGeresa.png';

	return (
		<div className="codigo-invalido">
			<div className="codigo-invalido__card">
				<div className="codigo-invalido__logo">
					<img src={logoImg} />
				</div>

				<h1 className="codigo-invalido__titulo">
					Verifica tu entrada
				</h1>

				<p className="codigo-invalido__texto">
					Por favor, comunícate con la Dirección Ejecutiva de
					Inteligencia Sanitaria (DEIS) para confirmar tu entrada.
				</p>

				<p className="codigo-invalido__footer">
					Geresa Cusco · 2026
				</p>
			</div>
		</div>
	)
}
