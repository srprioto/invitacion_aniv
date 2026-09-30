// src/app/[codigo]/page.tsx
import invitados from "@/data/Invitados";
import InvitacionClient from "./InvitacionClient";
import Rrror from "@/components/Rrror";

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

	return <InvitacionClient invitado={invitado} />;
}