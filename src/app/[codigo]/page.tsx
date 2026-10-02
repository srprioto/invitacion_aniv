import invitados from "@/data/Invitados";
import InvitacionClient from "./InvitacionClient";
import Rrror from "@/components/Rrror";
import Preloader from "@/components/Preloader";
import { ALL_FONTS, ALL_IMAGES, ALL_VIDEOS } from "@/data/assets";

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

	return <Preloader
	    images={ALL_IMAGES}
		videos={ALL_VIDEOS}
		fonts={ALL_FONTS}
		cacheKey="invitacion-cargada"
	>
		<InvitacionClient invitado={invitado} />
	</Preloader>
	
	
	
}