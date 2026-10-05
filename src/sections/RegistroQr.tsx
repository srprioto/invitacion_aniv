import ScrollHint from "@/components/ScrollHint";
import { QRCodeSVG } from 'qrcode.react';
import Barcode from "react-barcode";

interface prop {
	codigo: string
}

export default function RegistroQr({ codigo }:prop) {

	// const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${codigo}`;

	return (
		<section className="slide slide-registro" id="s7">
			<div className="slide-inner">
				{/* <div className="section-eyebrow section-eyebrow--light">Confirma tu asistencia</div> */}
				<h2 className="section-title">Control de registro</h2>

				<div className="qr-container">
					<QRCodeSVG 
						value={codigo} 
						size={256}
						level="M" // Nivel de corrección de errores (L, M, Q, H)
					/>
					<Barcode 
						value={codigo}
						format="CODE128" 
						width={2} 
						height={50} 
						displayValue={false} 
					/>
					{/* <img src={QR_URL} alt="Código QR de registro" /> */}
				</div>

				<div className="qr-texto">◆ Escanea para ingresar ◆</div>
			</div>

			<ScrollHint />
		</section>
	)
}
