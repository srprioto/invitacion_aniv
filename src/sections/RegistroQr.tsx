import ScrollHint from "@/components/ScrollHint";

interface prop {
	codigo: string
}

export default function RegistroQr({ codigo }:prop) {

	console.log(codigo);

	const QR_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=GERESA-2026-REGISTRO';

	return (
		<section className="slide slide-registro" id="s7">
			<div className="slide-inner">
				<div className="section-eyebrow section-eyebrow--light">Confirma tu asistencia</div>
				<h2 className="section-title">Regístrate y acompáñanos</h2>
				<p>Escanea el código QR para confirmar tu participación en las actividades conmemorativas.</p>

				<div className="qr-container">
					<img src={QR_URL} alt="Código QR de registro" />
				</div>

				<div className="qr-texto">◆ Escanea para ingresar ◆</div>
			</div>

			<ScrollHint />
		</section>
	)
}
