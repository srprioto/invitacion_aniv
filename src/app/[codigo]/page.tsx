import invitados from "@/data/Invitados";

import Rrror from "@/components/Rrror";
import { ALL_FONTS, ALL_IMAGES, ALL_VIDEOS } from "@/data/assets";
import InvitacionSobre from "./InvitacionSobre";

export async function generateStaticParams() {
	return invitados.map((invitado) => ({
		codigo: invitado.codigo,
	}));
}

type Props = {
	params: Promise<{ codigo: string }>;
};

export default async function Page({ params }: Props) {
	const { codigo } = await params;
	const invitado = invitados.find((i) => i.codigo === codigo);

	if (!invitado) {
		return <Rrror />;
	}

	// El sobre es el "nivel 1": se muestra siempre y hace la precarga por dentro.
	// InvitacionClient (nivel 2) se monta solo cuando el sobre se abre.
	return (
		<InvitacionSobre
			invitado={invitado}
			images={ALL_IMAGES}
			videos={ALL_VIDEOS}
			fonts={ALL_FONTS}
			cacheKey="invitacion-cargada"
		/>
	);
}